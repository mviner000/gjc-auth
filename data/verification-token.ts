import { db } from "@/drizzle/db";
import { verificationTokens } from "@/drizzle/schema";
import { eq } from "drizzle-orm/expressions";

export const getVerificationTokenByToken  = async (
    token: string
    ) => { try {
    const verificationToken = await db.select().from(verificationTokens).where(
        eq(verificationTokens.token, token)
    ).limit(1);
    return verificationToken[0];
    } catch {
    return null;
    }
};

export const getVerificationTokenByEmail = async (email: string) => {
    try {
      const verificationToken = await db.select().from(verificationTokens).where(
        eq(verificationTokens.identifier, email)
      );
      return verificationToken[0];
    } catch {
      return null;
    }
  };