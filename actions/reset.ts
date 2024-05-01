"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas/formSchema";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const parsedFields = ResetSchema.safeParse(values);

  if (!parsedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = parsedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  const obfuscateEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    const obscuredLocalPart = localPart.substring(0, 1) + '••••••••';
    return `${obscuredLocalPart}@${domain}`;
  };
  
  return {
    success: `An email with a verification code was just sent to ${obfuscateEmail(existingUser.email)}`
  };
};