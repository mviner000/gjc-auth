"use client";

import { useState, useTransition } from "react";
import Link from "next/link";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/formSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "./card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  // const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    // setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        if (data) {
        setError(data.error);
        }
        // setSuccess(data.success);
      });
    });

    form.reset();
  };

  return (
    <CardWrapper
      headerTitle="Signin"
      headerLabel="It's quick and easy."
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[-10px">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      disabled={isPending}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
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
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="link"
              size="sm"
              className="h-4 px-0 font-normal text-sm"
              asChild
            >
              <Link href="/auth/reset">Forgot password?</Link>
            </Button>

            <div className="flex items-center space-x-2 my-4">
              <Checkbox
                id="togglepwd"
                onCheckedChange={() => {
                  setShowPassword(!showPassword);
                }}
              />
              <label
                htmlFor="togglepwd"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show password
              </label>
            </div>
          </div>

          <FormError message={error} />
          {/* <FormSuccess message={success} /> */}

          <Button disabled={isPending} type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
