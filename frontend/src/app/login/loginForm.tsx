"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { GithubIcon } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";

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
        <Card className="mx-auto max-w-sm bg-black/20 border-none">
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

            <div className="mt-4 text-center">
            <div className="flex items-center justify-center">
                <div className="border-t border-gray-300/20 flex-grow mr-3"></div>
                <p className="text-gray-500 dark:text-gray-400">Or sign up using</p>
                <div className="border-t border-gray-300/20 flex-grow ml-3"></div>
                </div>
          <div className="flex justify-center space-x-4 mt-2">
            {/* Github sign up button */}
            <Button variant="outline" className="w-full bg-transparent">
             <GithubIcon/> Github
            </Button>
            {/* Google sign up button */}
            <Button variant="outline" className="w-full bg-transparent">
            <FaGoogle className=""/> Google
            </Button>
          </div>
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
