import { Drizzle } from "@drizzle-orm/core";
import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "./drizzle/schema"; // assuming you have a drizzle schema file

// Update the ExtendedUser type definition to include the UserRole type
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
};

// Update the Session interface in the NextAuth module augmentation
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}