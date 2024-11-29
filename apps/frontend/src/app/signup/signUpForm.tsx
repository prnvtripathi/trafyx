"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useFormState } from "react-dom";
import { signup } from "@/lib/actions";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export default function SignInForm() {
  const [state, formAction] = useFormState(signup, undefined);
  const [date, setDate] = React.useState<Date>();
  return (
    <form action={formAction}>
      {/* Sign Up Card */}
      <Card className="mx-auto max-w-fit">
        <CardHeader>
          {/* Card Title */}
          <CardTitle className="text-xl">Sign Up</CardTitle>
          {/* Card Description */}
          <CardDescription>
            Enter your information to create an account. All fields are required
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                {/* Username Input */}
                <Label htmlFor="username">Name</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-2">
                {/* Password Input */}
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******"
                />
              </div>
              <div className="grid gap-2">
                {/* Email Input */}
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  {" "}
                  {/* Phone Input */}
                  <Label htmlFor="phone">Contact</Label>
                  <Input
                    id="phone"
                    type="number"
                    name="phone"
                    placeholder="1234567890"
                    required
                  />
                </div>
                <div>
                  {" "}
                  {/* Phone Input */}
                  <Label htmlFor="phone">Alternate contact</Label>
                  <Input
                    id="phone"
                    type="number"
                    name="phone"
                    placeholder="1234567890"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Address Line 1 Input */}
              <div>
                {" "}
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  placeholder="123 Main St"
                  required
                />
              </div>

              <div>
                {/* Address Line 2 Input */}
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  type="text"
                  placeholder="Apt 4B"
                />
              </div>
              <div className="flex flex-col ">
                <Label htmlFor="addressLine2">Date of Birth </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground mt-1"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      required
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="hidden items-center space-x-2">
                {/* Is Admin Select */}
                <label
                  htmlFor="isAdmin"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Is Admin
                </label>
                <Select name="isAdmin" defaultValue="true">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* Is Admin Select Options */}
                      <SelectItem value="true">Yes</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  {" "}
                  {/* City Input */}
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="New York"
                    required
                  />
                </div>

                <div>
                  {/* Zip Code Input */}
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    placeholder="10001"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Create Account Button */}
          <Button type="submit" className="flex max-w-md mx-auto justify-center my-4">
            Create an account
          </Button>

          <div className="mt-4 text-center text-sm">
            {/* Already have an account? */}
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
      {/* Display form state */}
      {state && state}
    </form>
  );
}
