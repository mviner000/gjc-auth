import { db } from "@/drizzle/db";
import { verificationTokens, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getAllUsersWithTokenUsedForVerification = async () => {
  try {
    const usersWithTokenUsedForVerification = await db
      .select()
      .from(users);

    const usersArray = usersWithTokenUsedForVerification.map(user => {
      return {
        id: user.id,
        tokenUsedForVerification: user.tokenUsedForVerification,
        dateOfVerification: user.emailVerified,
        email: user.email,
      };
    });

    return usersArray;
  } catch (error) {
    console.error("Error in getAllUsersWithTokenUsedForVerification: ", error);
    return [];
  }
};

export const getVerificationTokenByToken = async (token: string) => {
    try {
      const [verificationToken] = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, token))
        .limit(1);
      return verificationToken;
    } catch (error) {
      console.error("Error in getVerificationTokenByToken: ", error);
    }
  };

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const [verificationToken] = await db
      .select()
      .from(verificationTokens)
      .where(eq(verificationTokens.email, email))
      .limit(1);
    return verificationToken;
  } catch {
    return null;
  }
};

