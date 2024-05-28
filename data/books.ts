import { db } from "@/drizzle/db";
import { books } from "@/drizzle/schema";

export const getAllBooks = async () => {
  try {
    const allBooks = await db.select().from(books);

    return allBooks;
  } catch (error) {
    console.error("Error in getAllBooks: ", error);
    return [];
  }
};
