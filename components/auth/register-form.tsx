"use client";

import { useState, useTransition } from "react";
import { FidgetSpinner } from "react-loader-spinner";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/formSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CardWrapper } from "./card-wrapper"; import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import LibraryTerms from "@/components/library-terms";


export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });

    form.reset();
  };

  const inputClass = "bg-neutral-100 border-slate-300 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300";

  return (
    <CardWrapper
      headerTitle="Register"
      headerLabel="It's quick and easy."
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-[-10px]">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className={inputClass}
                        {...field}
                        placeholder="First name"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className={inputClass}
                        {...field}
                        placeholder="Last name"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className={inputClass}
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

          <div className="flex items-center opacity-80 justify-end mt-3">
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

          <FormError message={error} />
          <FormSuccess message={success} link={{ href: "/auth/login" }} />

          {isPending ? (
            <div className="mb-2 flex justify-center text-center">
              <FidgetSpinner />
            </div>
          ) : (
            <Button type="submit" className="w-full mt-3" disabled={isPending}>
              Create an account
            </Button>
          )}

          <div className="space-y-1 mt-2 mb-[-10px]">
            <p className="text-xs font-normal">
              People who use our service may have uploaded your contact information to GJC. <a className="text-blue-700 cursor-pointer no-underline hover:underline">Learn more</a>
            </p>

            <LibraryTerms />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
