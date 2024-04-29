import { db } from "@/drizzle/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { verificationTokens } from "@/drizzle/schema";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm/expressions";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
  
    const existingToken = await getVerificationTokenByEmail(email);
  
    if (existingToken) {
      await db.delete(verificationTokens).where(eq(verificationTokens.email, email));
    }
  
    await db.insert(verificationTokens).values({
      email: email,
      token: token,
      expires: expires,
    });
  
    return { email, token }; // Return the generated token and expires date
  };