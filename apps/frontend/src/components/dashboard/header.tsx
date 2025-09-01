import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";
import { headers } from "next/headers";
import DynamicBreadcrumb from "./breadcrumbs";
import { LogOut, User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Header() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user as {
        image?: string | null;
        name?: string | null;
        id?: string;
        email?: string | null;
    };

    return (
        <>
            <nav className="flex items-center justify-between px-4 py-2 gap-2 w-full">
                <div className="hidden md:flex md:flex-1 items-center">
                    <DynamicBreadcrumb separator={"/"} />
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer size-7">
                                <AvatarImage src={user?.image || "/noavatar.png"} />
                                {user?.name ? (
                                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                                ) : (
                                    <AvatarFallback>
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-fit p-0" align="end">
                            <div className="flex items-center space-x-4 p-4 border-b">
                                <Avatar className="h-16 w-16 border-2 border-primary">
                                    <AvatarImage
                                        src={user?.image ?? undefined}
                                        alt={user?.name || ""}
                                    />
                                    {user?.name ? (
                                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                                    ) : (
                                        <AvatarFallback>
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <div>
                                    <p className="text-lg font-semibold">{user?.name}</p>
                                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                                </div>
                            </div>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={`/profile`}
                                    className="flex items-center"
                                >
                                    <User className="mr-2" />
                                    View Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-2 m-1" asChild>
                                <form
                                    className="w-full"
                                    action={async () => {
                                        "use server";
                                        await auth.api.signOut({
                                            headers: await headers(),
                                        });
                                        redirect("/auth/login");
                                    }}
                                >
                                    <button className="w-full text-left hover:text-red-500 transition flex items-center">
                                        {" "}
                                        <LogOut className="mr-4" />
                                        Log Out
                                    </button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ModeToggle />
                </div>
            </nav>
        </>
    );
}
