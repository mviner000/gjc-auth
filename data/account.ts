import { db } from "@/drizzle/db";
import { accounts } from "@/drizzle/schema";
import { eq } from "drizzle-orm";


export const getAccountByUserId = async (userId: string) => {
    try {
      const [account] = await db
        .select()
        .from(accounts)
        .where(eq(accounts.userId, userId)) // corrected column name
        .limit(1);
      return account;
    } catch (error) {
        return null;
    }
  };