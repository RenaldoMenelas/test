import { User } from '@prisma/client'

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVertified"
    > & {
    createdAt: string;
    updatedAt: string;
    emailVertified: string | null;
}