import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  code: z.optional(z.string())
});

export const TokenSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  token: z.string(),
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
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


  export const ResetSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    })
  });

  export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "Minimum of 6 characters is required",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
  