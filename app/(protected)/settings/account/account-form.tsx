"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SettingSchema, UserRoleEnum } from "@/schemas/formSchema";

import { useCurrentUser } from "@/hooks/use-current-user";
import { settings } from "@/actions/settings";
import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
type SecurityFormValues = z.infer<typeof SettingSchema>


export function AccountForm() {
  const user = useCurrentUser();
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");


  const defaultRole: UserRoleEnum = user?.role as UserRoleEnum || UserRoleEnum.USER;

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      student_id: user?.studentId || undefined,
      first_name: user?.first_name || undefined,
      last_name: user?.last_name || undefined,
      role: defaultRole,
    }
  })


  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, success]);


  const onSubmit = (values: z.z.infer<typeof SettingSchema>) => {
    if (values.newPassword !== confirmNewPassword) {
      setError("New password and confirm new password do not match");
      return;
    }
    setError("");
    setSuccess("");

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"))
    });
  }


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">

          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="First Name"
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
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Last Name"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </>
  )
}