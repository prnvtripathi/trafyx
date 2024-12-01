'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Icons } from "@/components/ui/icons"
import Link from 'next/link'
import { GitlabIcon, Loader2Icon } from 'lucide-react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Card, CardContent } from '@/components/ui/card'
import { useFormState } from "react-dom";
import { signup } from "@/lib/actions";
import MagneticEffect from '@/components/effects/magnetic-effect'


// Define the schema for form validation
const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export function SignUpForm() {
  // const [isLoading, setIsLoading] = useState(false)
  // const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
  //   resolver: zodResolver(signUpSchema),
  // })

  // async function onSubmit(data: SignUpFormValues) {
  //   setIsLoading(true)
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 2000))
  //   console.log(data)
  //   setIsLoading(false)
  // }

  const [state, formAction] = useFormState(signup, undefined);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    await formAction(data);
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to get started
        </p>
      </div>
      <Card className="">
        <CardContent className="space-y-4">
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  className="w-full"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  className="w-full"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up
            </Button>

            {state && state}
          </form>
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
              <Button variant="outline" type="button" className='w-full' disabled={isSubmitting}>
                <GitHubLogoIcon className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </MagneticEffect>
            <MagneticEffect>
              {" "}
              <Button variant="outline" type="button" className='w-full' disabled={isSubmitting}>
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
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}

