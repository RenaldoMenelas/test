<<<<<<< HEAD
import { User } from '@prisma/client'

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVertified"
    > & {
    createdAt: string;
    updatedAt: string;
    emailVertified: string | null;
}
=======
import { User } from "@prisma/client";

export type SafeUser = Omit<
 User,
 "createdAt" | "updatedAt" | "emailVerified"
 > & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
 };
>>>>>>> c55ff121aaa144fbde07635f87a975c80a95c148
