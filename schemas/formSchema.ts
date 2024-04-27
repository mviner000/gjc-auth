import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const RegisterSchema = z
  .object({
    first_name: z.string().min(1, {
      message: "First name is required",
    }),
    last_name: z.string().min(1, {
      message: "Last name is required",
    }),
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
