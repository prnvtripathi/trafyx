"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type CredentialsFormProps = {
  variant: "login" | "register";
};

export default function CredentialsForm({ variant }: CredentialsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      if (variant === "login") {
        const { data, error } = await authClient.signIn.email({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          callbackURL: "/dashboard",
          rememberMe: true
        }, {
          onRequest: () => {
          },
          onSuccess: () => {
            toast.success("Logged in successfully");
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error(ctx.error.message || "Invalid credentials");
          }
        });

        // Handle error if callbacks don't fire
        if (error) {
          setIsLoading(false);
          toast.error(error.message || "Invalid credentials");
        }
      } else {
        const { data, error } = await authClient.signUp.email({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          image: formData.get("imageSrc") as string || undefined,
          callbackURL: "/dashboard"
        }, {
          onRequest: () => {
          },
          onSuccess: () => {
            toast.success("Account created successfully");
            router.push("/dashboard");
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error(ctx.error.message || "An error occurred during signup");
          }
        });

        // Handle error if callbacks don't fire
        if (error) {
          setIsLoading(false);
          toast.error(error.message || "An error occurred during signup");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setIsLoading(false);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        {variant === "register" && (
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              className="border-neutral-800 bg-neutral-950 text-white placeholder:text-neutral-400"
              required
              disabled={isLoading}
            />
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            className="border-neutral-800 bg-neutral-950 text-white placeholder:text-neutral-400"
            required
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            className="border-neutral-800 bg-neutral-950 text-white placeholder:text-neutral-400"
            required
            disabled={isLoading}
          />
        </div>
        {variant === "register" && (
          <div className="grid gap-2">
            <Label htmlFor="imageSrc" className="text-white">
              Profile Image URL
            </Label>
            <Input
              id="imageSrc"
              name="imageSrc"
              type="url"
              placeholder="https://example.com/image.jpg"
              className="border-neutral-800 bg-neutral-950 text-white placeholder:text-neutral-400"
              disabled={isLoading}
            />
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? "Please wait..."
            : variant === "login"
              ? "Login"
              : "Create account"}
        </Button>
      </div>
    </form>
  );
}