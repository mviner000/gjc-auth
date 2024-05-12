"use client";

import { useState, useTransition } from "react";

import * as z from "zod";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas/formSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { CardWrapper } from "./card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newPassword } from "@/actions/new-password";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });

    form.reset();
  };
  
  const inputClass = "bg-neutral-100 border-slate-300 dark:bg-slate-800 dark:border-slate-600 text-black dark:text-white";

  return (
    <CardWrapper
      headerTitle="Choose a new password"
      headerLabel=""
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className={inputClass}
                      {...field}
                      placeholder="Password"
                      disabled={isPending}
                      type={showPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className={inputClass}
                      {...field}
                      placeholder="Confirm Password"
                      disabled={isPending}
                      type={showPassword ? "text" : "password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className="flex items-center space-x-2 mt-4 mb-2">
              <Checkbox
                className="w-3.5 h-3.5 border-gray-400"
                id="togglepwd"
                onCheckedChange={() => {
                  setShowPassword(!showPassword);
                }}
              />
              <label
                htmlFor="togglepwd"
                className="text-gray-400 ml-1 text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show password
              </label>
            </div>

          <FormError message={error}/>
          <FormSuccess message={success} link={{ href: "/auth/login"}} />

          <Button disabled={isPending} type="submit" className="w-full">
            Reset password
          </Button>
        </form>

        <p className="mt-3 text-sm font-normal dark:text-slate-300">
          Create a new, strong password that you don&apos;t use for other websites
        </p>
      </Form>
    </CardWrapper>
  );
};