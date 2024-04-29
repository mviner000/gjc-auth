"use server";

import { db } from "@/drizzle/db";
import { users, verificationTokens  } from "@/drizzle/schema";
import { getUserByEmail } from "@/data/user";
import { eq } from "drizzle-orm";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export type VerificationResponse = {
    success?: boolean;
    error?: string;
};

export const newVerification = async (token: string) => { 
    const existingToken = await getVerificationTokenByEmail(token);

    // if (!existingToken) {
    //     return { error: "Token does not exist!" };
    // }

    // const hasExpired = new Date(existingToken.expires) < new Date();

    // if (hasExpired) {
    //     return { error: "Token has expired!" };
    // }

}