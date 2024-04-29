"use server";

import { db } from "@/drizzle/db";
import { getUserByEmail } from "@/data/user";
import { users, verificationTokens } from "@/drizzle/schema";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { sql } from "drizzle-orm";

export type VerificationResponse = {
    success?: boolean;
    error?: string;
};

export const newVerification = async (token: string) => { 
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken || !existingToken[0]) {
        return { error: "Token is not found in database!" };
    }

    const hasExpired = new Date(existingToken[0].expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
      }

    const existingUser = await getUserByEmail(existingToken[0].email);

    if (!existingUser) {
    return { error: "User with email does not exist!" };
    }

    await db.update(users).set({
        emailVerified: new Date(),
        email: existingToken[0].email,
      }).where(sql`id = ${existingUser.id}`);

    await db.delete(verificationTokens).where(sql`id = ${existingToken[0].id}`);
}