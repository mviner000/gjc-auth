"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SettingSchema, UserRoleEnum } from "@/schemas/formSchema";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { settings } from "@/actions/settings";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Separator } from "@/components/ui/separator";


const SettingsPage = () => {

  const user = useCurrentUser();
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

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



  const onSubmit = (values: z.infer<typeof SettingSchema>) => {

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
    <div>
      <div className="space-y-6 mb-5">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        {/* <ProfileForm /> */}
      </div>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">

          <FormField
            control={form.control}
            name="student_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student ID No.</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="student id"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {user?.isOAuth === false && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="johnDoe@gmail.com"
                        disabled={isPending}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            </>
          )}

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder={user?.isTwoFactorEnabled ? "ON" : "OFF"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    <SelectItem value={UserRoleEnum.ADMIN}>Admin</SelectItem>
                    <SelectItem value={UserRoleEnum.USER}>User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsPage;
