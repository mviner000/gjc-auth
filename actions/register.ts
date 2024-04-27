"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { RegisterSchema } from "@/schemas/formSchema";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, first_name, last_name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.insert(users).values({ first_name, last_name, email, password: hashedPassword });

  // TODO: Send verification token email

  return { success: "User registered!" };
};
