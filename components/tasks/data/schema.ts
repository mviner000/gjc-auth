import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  books: z.array(z.number()),
  status: z.string(),
  label: z.string(),
  email: z.string(),
  is_borrowed_verified: z.boolean(),
  is_returned_verified: z.boolean(),
  set_to_return: z.boolean(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  // returned_date: z.date().optional(),
});

export type Task = z.infer<typeof taskSchema>;

// IRL, you will have a schema for your data models.
export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  email: z.string(),
});

export type Book = z.infer<typeof bookSchema>;
