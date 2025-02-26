import { Metadata } from "next";
import React from "react";
import AboutPageContent from "./pageContent";
import Footer from "../../components/ui/footer";
import { ModeToggle } from "../../components/theme-button";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { GearIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "About Apilex | API Testing Made Simple",
  description:
    "Learn about Apilex and the technologies powering our automated API testing platform.",
};

type Props = {};

function page({}: Props) {
  return (
    <div>
      <header className="absolute top-0 z-10 w-full">
        <div className="max-w-8xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="space-x-3 flex flex-row items-center">
            <div className="bg-primary rounded-full shadow-xl text-white  p-1">
              <GearIcon className=" m-0 h-6 p-0 rounded-full w-full" />
            </div>{" "}
            <h1 className="text-2xl font-bold">Trafix</h1>
          </div>
          <nav className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Signup</Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </header>
      <AboutPageContent />
      <Footer />
    </div>
  );
}

export default page;
