import { ModeToggle } from "@/components/theme-button";
import LoginForm from "./loginForm";
// import Image from "next/image";
import { BackgroundStyle } from "@/components/ui/background-style";
// import { FloatingShapes } from "@/components/ui/floating-shapes";
// import { GearIcon } from "@radix-ui/react-icons";
import SpinningLogo from "@/components/spinningLogo";

export const metadata = {
  title: "Login | App",
  description: "Login to your account to access the App",
};

// This is the Login component
export default function Login() {
  return (
    <div className="">
      {/* ThemeToggle component */}
      <div className="absolute top-0 right-0 p-6">
        <ModeToggle />
      </div>
      {/* LoginForm component */}
      <div className=" bg-gray-50 dark:bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <BackgroundStyle />
        <div className="w-full max-w-6xl relative z-10">
          <div className="bg-white/80 dark:bg-gray-800/80 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <div className="flex flex-col md:flex-row">
              {/* Left column: Sign-up form */}
              <div className="w-full md:w-1/2 p-8">
                <LoginForm />
              </div>

              {/* Right column: Image */}
              <div className="w-full md:w-1/2 relative hidden md:flex items-center justify-center">
            
                <div className="w-2/3 h-2/3">
                <SpinningLogo/></div>
           
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-blue-600/20 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </div>
        {/* <FloatingShapes /> */}
      </div>
    </div>
  );
}
