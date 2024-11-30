import { ModeToggle } from "@/components/theme-button";
// import SignInForm from "@/app/signup/signUpForm";
import { SignUpForm } from "./signUpForm";
// import { GlowingOrb, WavyBackground } from "@/components/ui/visual-effects";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { SunIcon, MoonIcon } from "lucide-react";
import Image from "next/image";
import { BackgroundStyle } from "@/components/ui/background-style";
import SpinningLogo from "@/components/spinningLogo";
import { GearIcon } from "@radix-ui/react-icons";
import  Footer  from "@/components/ui/footer";

export const metadata = {
  title: "Sign Up | Apilux",
  description: "Sign up to create an account on Apilux",
};

// This is the main component for the sign-in page
export default function Signin() {
  return (
    <>
      {" "}
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <BackgroundStyle />
        <div className="w-full max-w-6xl relative z-10">
          <div className="bg-white/80 dark:bg-gray-800/80 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <div className="flex flex-col md:flex-row">
              {/* Left column: Sign-up form */}
              <div className="w-full md:w-1/2 p-8">
                <SignUpForm />
              </div>

              {/* Right column: Image */}
              <div className="w-full md:w-1/2 relative hidden md:block">
                {/* <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Sign up illustration"
                  width={600}
                  height={800}
                  className="object-cover w-full h-full"
                /> */}
                <SpinningLogo />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-blue-600/20 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </div>
        <FloatingShapes />
      </div>
      <Footer/>
    </>
  );
}
