"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/formSchema";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { db } from "@/drizzle/db";
import { twoFactorConfirmations, twoFactorTokens } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!"}
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await db
        .delete(twoFactorTokens)
        .where(eq(twoFactorTokens.id, twoFactorToken.id));

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db
          .delete(twoFactorConfirmations)
          .where(eq(twoFactorConfirmations.id, existingConfirmation.id));
      }

      await db.insert(twoFactorConfirmations).values({
        userId: existingUser.id,
      })
      
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email!, verificationToken.token!);

    return { success: "Confirmation email sent!" };
  };


  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials! Password does not match" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
  // return { success: "Login Successful!" };
};
