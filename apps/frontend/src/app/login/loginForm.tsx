"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";
// import { useActionState } from "react";
import { toast } from "sonner";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import MagneticEffect from "@/components/effects/magnetic-effect";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <div>
      {/* The outer form element */}
      <form className="space-y-6" action={formAction}>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Log in to Your Account</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your information to get started
          </p>
        </div>
        <Card className="mx-auto max-w-sm">
          {/* <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader> */}
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                {/* Label and input for username */}
                <Label htmlFor="username">User Name</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              {/* <div className="grid gap-2">
                {/* Label and input for company ID */}
              {/* <Label htmlFor="companyid">Company ID</Label>
                <Input
                  id="companyid"
                  name="companyid"
                  type="text"
                  placeholder="Company ID"
                  required
                />
              </div> */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  {/* Label and input for password */}
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******"
                  required
                />
              </div>
              {/* Login button */}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <MagneticEffect>
                <Button variant="outline" type="button" className="w-full">
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </MagneticEffect>
              <MagneticEffect>
                {" "}
                <Button variant="outline" type="button" className="w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="mr-2 h-4 w-4"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.15 0 5.65 1.05 7.55 2.8l5.6-5.6C33.15 3.5 28.85 1.5 24 1.5 14.85 1.5 7.4 7.85 4.7 16.35l6.9 5.35C13.15 15.1 18.05 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.5 24c0-1.5-.15-3-.45-4.5H24v9h12.75c-.6 3-2.4 5.55-4.95 7.2l6.9 5.35C42.6 37.15 46.5 31.05 46.5 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.65 28.5c-1.05-3-1.05-6.3 0-9.3L3.75 13.85C.75 19.35.75 26.65 3.75 32.15l6.9-5.35z"
                    />
                    <path
                      fill="#4285F4"
                      d="M24 46.5c6.15 0 11.4-2.05 15.2-5.55l-6.9-5.35c-2.1 1.35-4.8 2.1-8.3 2.1-5.95 0-10.85-5.6-12.35-12.5l-6.9 5.35C7.4 40.15 14.85 46.5 24 46.5z"
                    />
                  </svg>
                  Google
                </Button>
              </MagneticEffect>
            </div>
          </CardContent>
        </Card>
        {/* Display state if available */}

        <div className="hidden">{state && toast.error(state)}</div>
        <div className="mt-4 text-center text-sm">
          {/* Link to sign up page */}
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
