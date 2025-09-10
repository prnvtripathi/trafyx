"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type CredentialsFormProps = {
  variant: "login" | "register";
};

export default function CredentialsForm({ variant }: CredentialsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    imageSrc: "",
    email: "",
    password: ""
  });
  const router = useRouter();

  const totalSteps = variant === "register" ? 2 : 1;
  const progressValue = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (variant === "register" && currentStep === 1) {
      // Validate required fields for step 1
      if (!formData.name.trim()) {
        toast.error("Name is required");
        return;
      }
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (variant === "register" && currentStep === 1) {
      handleNextStep(event);
      return;
    }

    setIsLoading(true);

    try {
      if (variant === "login") {
        const formDataObj = new FormData(event.currentTarget);
        const { data, error } = await authClient.signIn.email({
          email: formDataObj.get("email") as string,
          password: formDataObj.get("password") as string,
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
        // For register, use the state data
        const { data, error } = await authClient.signUp.email({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          image: formData.imageSrc || undefined,
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

  const renderLoginForm = () => (
    <>
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
    </>
  );

  const renderRegisterStep1 = () => (
    <>
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
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>
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
          value={formData.imageSrc}
          onChange={(e) => handleInputChange("imageSrc", e.target.value)}
        />
      </div>
    </>
  );

  const renderRegisterStep2 = () => (
    <>
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
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
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
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
      </div>
    </>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        {/* Progress indicator for register variant */}
        {variant === "register" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-neutral-400">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{currentStep === 1 ? "Personal Info" : "Account Details"}</span>
            </div>
            <Progress value={progressValue} className="h-2 bg-accent" />
          </div>
        )}

        {/* Form fields based on variant and step */}
        {variant === "login" && renderLoginForm()}
        {variant === "register" && currentStep === 1 && renderRegisterStep1()}
        {variant === "register" && currentStep === 2 && renderRegisterStep2()}

        {/* Buttons */}
        <div className="flex gap-2">
          {variant === "register" && currentStep === 2 && (
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handlePreviousStep}
              disabled={isLoading}
            >
              Previous
            </Button>
          )}
          <Button
            type="submit"
            className={variant === "register" && currentStep === 2 ? "flex-1" : "w-full"}
            disabled={isLoading}
          >
            {isLoading
              ? "Please wait..."
              : variant === "login"
                ? "Login"
                : currentStep === 1
                  ? "Next"
                  : "Create account"}
          </Button>
        </div>
      </div>
    </form>
  );
}