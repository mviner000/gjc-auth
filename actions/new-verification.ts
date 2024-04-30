"use server";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; // Import the relativeTime plugin

import { db } from "@/drizzle/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken, getAllUsersWithTokenUsedForVerification } from "@/data/verification-token";
import { users, verificationTokens } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  
  if (!existingToken) {
    // Check if the token has already been used for verification
    const usersWithTokenUsed = await getAllUsersWithTokenUsedForVerification();
    const tokenAlreadyUsed = usersWithTokenUsed.some(user => user.tokenUsedForVerification === token);
    if (tokenAlreadyUsed) {
      const userWithUsedToken = usersWithTokenUsed.find(user => user.tokenUsedForVerification === token);
      if (userWithUsedToken) {
        // Assuming userWithUsedToken.dateOfVerification is a valid date string
        const dateOfVerification = dayjs(userWithUsedToken.dateOfVerification);
        // Calculate the time elapsed from the verification date to now
        const timeElapsed = dateOfVerification.fromNow();
        // console.log(userWithUsedToken.email, `Email was verified ${timeElapsed}`);
        return { success: `${userWithUsedToken.email} was verified ${timeElapsed}`};
      }
    }
    return { error: "Token does not exist in our database!" };
  }

  const hasExpired = new Date(existingToken.expires!) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email!);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db
    .update(users)
    .set({ emailVerified: new Date(), email: existingToken.email!, tokenUsedForVerification: existingToken.token })
    .where(eq(users.id, existingUser.id));

  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.id, existingToken.id));

    return {success: "Email verified!"}
};