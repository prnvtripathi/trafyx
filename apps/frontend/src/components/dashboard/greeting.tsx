import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { headers } from "next/headers";

export default async function HomePageGreeting() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    const getGreeting = () => {
        const currentTime = new Date().getHours();
        if (currentTime < 12) {
            return "Good Morning";
        } else if (currentTime < 18) {
            return "Good Afternoon";
        } else if (currentTime < 22) {
            return "Good Evening";
        } else {
            return "It's Late - Time to Rest";
        }
    };

    // Render the card
    return (
        <div>
            <Card className="border-none bg-white/30 dark:bg-black/30 backdrop-blur-3xl shadow-lg">
                <CardHeader className="flex flex-row items-center">
                    <Avatar className="size-20 md:size-28 mr-4">
                        <AvatarImage src={user?.image || "/noavatar.png"} />
                        <AvatarFallback className="text-3xl md:text-5xl">
                            {user?.name?.[0] || "?"}
                        </AvatarFallback>
                    </Avatar>{" "}
                    <CardTitle className="text-2xl md:text-5xl">
                        <span className="font-normal">{getGreeting()}</span>, <span className="bg-gradient-to-tr from-sky-500  to-zinc-400 bg-clip-text text-transparent">{user?.name}</span>
                    </CardTitle>
                </CardHeader>
            </Card>
        </div>
    );
}
