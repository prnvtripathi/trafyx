"use client";

import { ModeToggle } from "@/components/theme-button";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div>
      <div className="absolute top-0 left-0 p-6">
        <ModeToggle />
      </div>
      <div className="grid h-screen place-content-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black flex justify-center items-center text-gray-600 dark:text-gray-200">
          : (
          </h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-400 sm:text-4xl">
           Something went wrong, what a bummer.
          </p>

          <p className="mt-4 text-gray-500">
            Maybe it&apos;s you, or maybe it&apos;s us. It&apos;s okay though, let&apos;s just try again! 
          </p>

          <Button className="w-1/2 my-6">
            <a href="/dashboard">Start Over</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
