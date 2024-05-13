"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { currentUser } from "@/lib/auth";
import { SettingSchema } from "@/schemas/formSchema";
import { getUserByEmail, getUserById } from "@/data/user";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (
    values: z.infer<typeof SettingSchema>
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id);
   
    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.student_id = undefined;
        values.first_name = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);

        if (existingUser && existingUser.id !== user.id ) {
            return { error: "Email already in used!" }
        }
        
        const verificationToken = await generateVerificationToken(
            values.email
        );
        
        await sendVerificationEmail(verificationToken.email!, verificationToken.token!);
        
        return { success: "Verification Email Sent!"}
    
    }

    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(
            values.password,
            dbUser.password,
        );

        if(!passwordsMatch) {
            return { error: "Incorrect password!"};
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        
        values.password = hashedPassword;
        values.newPassword = undefined;
    
    }

    await db
    .update(users)
    .set({ ...values })
    .where(eq(users.id, dbUser.id));

    return { success: "Settings Updated!"}
}