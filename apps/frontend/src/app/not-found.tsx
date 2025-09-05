"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-3 overflow-hidden">
            <div className="h-1/3 md:h-1/2 w-full md:w-1/2 p-4 md:p-0">
                <DotLottieReact
                    src="/lotties/404.lottie"
                    loop
                    autoplay
                />
            </div>
            <div className="text-3xl font-light text-center tracking-wide">
                We couldn't find your page.
            </div>
            <div className="flex flex-col text-center leading-4 tracking-tighter text-muted-foreground">
                <p>
                    But we're working on it.
                </p>
                <p>
                    Honest.
                </p>
            </div>
            <Link href="/dashboard" className="z-10 cursor-pointer">
                <Button className="z-10 cursor-pointer ">Return back Home</Button>
            </Link>
        </div>
    );
}