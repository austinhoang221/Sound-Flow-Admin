import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthenticationService } from "@/api/services/authenticate.service";
import { ILoginModel } from "@/utils/models/authenticate/ILoginModel";
import { useNavigate } from "react-router";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusCode } from "@/utils/enums/statusCode";
import { useToast } from "@/components/ui/use-toast";
import "./login.scss";
import { useState } from "react";
import { ForgotPassword } from "../forgot-password/forgotPassword";
import { ReloadIcon } from "@radix-ui/react-icons";

const Logo = require("@/assets/images/logo.gif");
const formSchema = z.object({
  username: z.string(),
  password: z.string().min(5, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean().default(false).optional(),
});

export function Login() {
  const navigate = useNavigate();
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await AuthenticationService.logIn(values as ILoginModel).then((res) => {
      if (res?.code === StatusCode.OK) {
        localStorage.setItem("user", JSON.stringify(res?.data));
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Some thing went wrong",
          description: "Incorrect username or password",
        });
      }
      setIsLoading(false);
    });
  };

  const onForgotPassword = () => {
    setIsForgotPassword(true);
  };

  return (
    <div className="h-screen flex items-center login">
      <div className="w-[350px] mx-auto ">
        <img alt="logo" src={Logo} className="size-24 mr-auto ml-auto mb-4" />
        {!isForgotPassword ? (
          <>
            <h3 className="text-center scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
              Login
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="rememberMe"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <label
                              htmlFor="rememberMe"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Remember me
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <span
                    onClick={() => onForgotPassword()}
                    className="text-sm text-primary underline cursor-pointer"
                  >
                    Forgot password?
                  </span>
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <ForgotPassword onLogin={() => setIsForgotPassword(false)} />
        )}
      </div>
      <div className="svg-background1"></div>
      <div className="svg-background2"></div>
    </div>
  );
}
