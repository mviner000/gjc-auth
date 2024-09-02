"use client";

import { useState, useTransition } from "react";
import Link from "next/link";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
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
import { FidgetSpinner } from "react-loader-spinner";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Sign in or register with another email provider"
    : "";


  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
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
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const inputClass = "text-black bg-neutral-100 border-slate-300 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300";

  return (
    <CardWrapper
      headerTitle="Signin"
      headerLabel="This page is restricted"
      headerLabelColor="text-rose-400"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[-10px">
          <div className="space-y-3 mb-3">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter 2FA Code"
                        disabled={isPending}
                        className="text-black dark:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className={inputClass}
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
                          className={inputClass}
                          placeholder="Password"
                          disabled={isPending}
                          type={showPassword ? "text" : "password"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          {!showTwoFactor && (
            <div className="flex items-center justify-between">
              <Button
                variant="link"
                size="sm"
                className="h-4 px-0 font-normal text-sm"
                asChild
              >
                <Link href="/auth/reset">Forgot password?</Link>
              </Button>

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
            </div>
          )}

          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          {isPending ? (
            <div className="mb-2 flex justify-center text-center">
              <FidgetSpinner />
            </div>
          ) : (
            <Button disabled={isPending} type="submit" className="w-full">
              {showTwoFactor ? "Confirm" : "Log in"}
            </Button>
          )}

        </form>
      </Form>
    </CardWrapper>
  );
};
