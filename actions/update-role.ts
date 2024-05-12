// update-role.ts

import * as z from "zod";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const updateRoleSchema = z.object({
  userId: z.string().uuid(),
  newRole: z.enum(["USER", "ADMIN"]),
});

interface UpdateRoleResponse {
  success: boolean;
  message: string;
  error?: {
    message: string;
  };
}

export const updateRole = async (userId: string, newRole: "USER" | "ADMIN"): Promise<UpdateRoleResponse> => {
  try {
    const updatedUser = await db.transaction(async (tx) => {
      return tx.update(users).set({ role: newRole }).where(eq(users.id, userId));
    });

    if (!updatedUser) {
      throw new Error(`User not found with ID ${userId}`);
    }

    return { success: true, message: `Role updated successfully to ${newRole}` };
  } catch (error) {
    return { success: false, message: "An error occurred", error: { message: (error as Error).message } };
  }
};