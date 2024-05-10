import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm/expressions";

import { db } from "@/drizzle/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

import {
  passwordResetTokens,
  twoFactorTokens,
  verificationTokens,
} from "@/drizzle/schema";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";


export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
  
    const existingToken = await getVerificationTokenByEmail(email);
  
    if (existingToken) {
      await db.delete(verificationTokens).where(eq(verificationTokens.email, email));
    }
  
    const [verificationToken] = await db
    .insert(verificationTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return verificationToken; // Return the generated token and expires date
  };

  export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
  
    const existingToken = await getPasswordResetTokenByEmail(email);
  
    if (existingToken) {
      await db
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, existingToken.id));
    }
  
    const [passwordResetToken] = await db.insert(passwordResetTokens).values({
      email,
      token,
      expires
    }).returning();

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  // TODO: Later change to 15 minutes
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(twoFactorTokens)
      .where(eq(twoFactorTokens.id, existingToken.id));
  }

  const [twoFactorToken] = await db.insert(twoFactorTokens).values({
    email,
    token,
    expires
  }).returning();

  return twoFactorToken;
};