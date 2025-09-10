import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInButton from "./signin-button";
import CredentialsForm from "./credentials-form";

type AuthFormProps = {
  variant: "login" | "register";
};

export default function AuthForm({ variant }: AuthFormProps) {
  return (
    <Card className="mx-auto max-w-sm sm:w-96 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {variant === "login" ? "Login" : "Create new account"}
        </CardTitle>
        <CardDescription className="text-neutral-400">
          {variant === "login"
            ? "Welcome back! Please login to your account."
            : "Enter your email below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-row justify-between gap-2">
            <SignInButton method="github" />
            <SignInButton method="google" />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-800" />
            </div>
            <div className="flex justify-center w-full border-t border-1" />
          </div>
          <CredentialsForm variant={variant} />
        </div>
      </CardContent>
    </Card>
  );
}
