import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface IForgotPassword {
  onLogin: () => void;
}
export const ForgotPassword = (props: IForgotPassword) => {
  const formSchema = z.object({
    email: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = () => {};
  return (
    <>
      <h3 className="text-center scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
        Forgot Password
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Restore password
          </Button>
        </form>
      </Form>
      <span
        onClick={() => props.onLogin()}
        className="text-sm text-center text-primary underline cursor-pointer space-y-1"
      >
        Back to login
      </span>
    </>
  );
};
