"use client";

import { LuGithub } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

interface SignInButtonProps {
  method: "github" | "google";
}

const SignInButton = ({ method }: SignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialSignIn = async () => {
    setIsLoading(true);

    try {
      await authClient.signIn.social({
        provider: method,
        callbackURL: "/dashboard",
        errorCallbackURL: "/login?error=social_auth_failed",
        newUserCallbackURL: "/dashboard" // Redirect new users to dashboard too
      });

      // If we reach here and no redirect happened, there might be an issue
      toast.success(`Signing in with ${method === "github" ? "GitHub" : "Google"}...`);
    } catch (error) {
      console.error("Social sign-in error:", error);
      toast.error(`Failed to sign in with ${method === "github" ? "GitHub" : "Google"}`);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="border-neutral-800 w-32 sm:w-40"
      onClick={handleSocialSignIn}
      disabled={isLoading}
    >
      {method === "github" ? (
        <LuGithub className="mr-2 h-4 w-4" />
      ) : (
        <FcGoogle className="mr-2 h-4 w-4" />
      )}
      {isLoading
        ? "Please wait..."
        : method === "github"
          ? "GitHub"
          : "Google"
      }
    </Button>
  );
};

export default SignInButton;