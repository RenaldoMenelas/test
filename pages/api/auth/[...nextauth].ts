import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions, User, Profile, Account, Session, TokenSet } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/app/libs/prismadb';
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

interface ExtendedProfile extends Profile {
  picture?: string;
  avatar_url?: string;
  image?: string;
}

interface ExtendedUser extends User {
  id: string;
  email: string;
  name: string;
  image?: string;
}

interface ExtendedToken {
  user?: ExtendedUser;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prismaClient.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user?.hashPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV !== 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      const extendedProfile = profile as ExtendedProfile;

      if (account?.providerAccountId) {
        const provider = account.provider;
        const providerAccountId = account.providerAccountId;

        // Get the avatar URL from the provider
        const avatarUrl = extendedProfile?.picture || extendedProfile?.avatar_url || extendedProfile?.image;

        // Check if the email exists in the database
        const existingUser = await prismaClient.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          // Check if the existing user signed up with the same provider
          const existingAccount = await prismaClient.account.findFirst({
            where: {
              userId: existingUser.id,
              provider,
            },
          });

          if (!existingAccount) {
            // Return an error message if the email exists with a different provider
            throw new Error('A user with this email already exists with a different provider.');
          }

          // Update the user's profile picture in your database
          if (avatarUrl) {
            await prismaClient.user.update({
              where: { id: existingUser.id },
              data: { image: avatarUrl },
            });
          }
        } else {
          // If trying to log in without signing up, throw an error
          if (account.type === 'credentials') {
            throw new Error('You must sign up first.');
          }

          // Create a new user with the profile picture and provider info
          await prismaClient.user.create({
            data: {
              email: user.email!,
              image: avatarUrl,
              name: user.name!,
              accounts: {
                create: {
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  expires_at: account.expires_at,
                },
              },
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      console.log('JWT callback', {token, user});
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.user = {
          id: extendedUser.id,
          email: extendedUser.email,
          name: extendedUser.name,
          image: extendedUser.image,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback:', {session, token})
      const extendedToken = token as ExtendedToken;
      if (extendedToken.user) {
        session.user = extendedToken.user;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
