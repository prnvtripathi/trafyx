import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/theme-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Home,
  PanelLeft,
  Search,
  Settings,
  Users2,
  Package,
  ContactRoundIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { auth, signOut } from "@/auth";
import DynamicBreadcrumb from "./breadcrumbs";

import { Table, LogOut, Shield, Mail, User } from "lucide-react";

export default async function Header() {
  const session = await auth();
  const user = session?.user as {
    img?: string | null;
    name?: string | null;
    id?: string;
    email?: string | null;
  };
  // console.log(user, "aa gaya");

  return (
    <>
      <nav className="py-4 sticky top-0 z-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 w-full">
        <div className="hidden md:flex items-center space-x-4">
          {" "}
          {/* This div is for breadcrumbs */}
          <DynamicBreadcrumb separator={"/"} />
        </div>

        <div className="relative ml-auto flex-1 md:grow-0">
          {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          /> */}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer size-7">
              <AvatarImage src={user?.img || "/noavatar.png"} />
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
                  src={user?.img ?? undefined}
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
            <DropdownMenuItem>
              <Link
                href={`/dashboard/user/${user?.id}`}
                className="flex space-x-4 items-center"
              >
                <User className="mr-4" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2 m-1">
              <form
                className="w-full"
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="w-full text-left hover:text-red-500 transition flex items-center">
                  {" "}
                  <LogOut className="mr-4" />
                  Logout
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </nav>
    </>
  );
}
