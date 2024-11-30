// "use client";
// import React from "react";
// import Link from "next/link";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//   ContactRoundIcon,
//   DoorOpen,
//   Home,
//   LayoutDashboardIcon,
//   Package,
//   TrashIcon,
//   TriangleAlertIcon,
//   UserCircle2Icon,
//   Users2,
// } from "lucide-react";
// import { usePathname } from "next/navigation";


// export default function Sidebar() {
//   const sidebarItems = [
//     {
//       id: 1,
//       name: "Home",
//       link: "/dashboard",
//       tooltiptext: "Home",
//       logo: <Home className="h-5 w-5" />,
//     },
//     {
//       id: 2,
//       name: "Products",
//       link: "/dashboard/products",
//       tooltiptext: "Products",
//       logo: <Package className="h-5 w-5" />,
//     },
//     {
//       id: 3,
//       name: "Customers",
//       link: "/dashboard/customers",
//       tooltiptext: "Customers",
//       logo: <Users2 className="h-5 w-5" />,
//     },
//     {
//       id: 4,
//       name: "Users",
//       link: "/dashboard/profile/${user.id}",
//       tooltiptext: "Users",
//       logo: <UserCircle2Icon className="h-5 w-5" />,
//     },
//     {
//       id: 5,
//       name: "contact",
//       link: "/dashboard/contactlogs",
//       tooltiptext: "Contact",
//       logo: <ContactRoundIcon className="h-5 w-5" />,
//     },
//   ];

//   const inactiveLink =
//     "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";

//   const activeLink =
//     "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8";

//   const pathname = usePathname();

//   return (
//     <div>
//       <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
//         <nav className="flex flex-col items-center gap-4 px-2 py-4">
//           <Link
//             href="/dashboard"
//             className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-transparent text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
//           >
//             {/* <Image src="" width={50} height={50} alt="App logo" /> */}
//             <LayoutDashboardIcon className="h-8 w-8 bg-primary text-white   p-1 rounded-full" />
//             <span className="sr-only">CRM Logo</span>
//           </Link>
//           {sidebarItems.map((item, index) => (
//             <Tooltip key={index}>
//               <TooltipTrigger asChild>
//                 <Link
//                   href={item.link}
//                   key={item.id}
//                   className={pathname === item.link ? activeLink : inactiveLink} // Change here
//                 >
//                   {item.logo}
//                   <span className="sr-only">{item.tooltiptext}</span>
//                 </Link>
//               </TooltipTrigger>
//               <TooltipContent side="right">{item.tooltiptext}</TooltipContent>
//             </Tooltip>
//           ))}
//         </nav>
     
//       </aside>
//     </div>
//   );
// }


"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  BarChart2,
  Settings,
  LogOut,
  ChevronsLeft,
  Plus,
  QrCode,
  ScanQrCode,
  LinkIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ModeToggle } from "./theme-button";
import SpinningLogo from "./spinningLogo";
import { GearIcon } from "@radix-ui/react-icons";
// import ThemeToggle from "./ui/theme-toggle";

export function AppSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center justify-center py-3 gap-2 flex-row w-full">
          {/* <Image
            src="/images/logo.svg"
            alt="Logo"
            height={32}
            width={32}
            priority
          /> */} <div className="bg-primary rounded-full shadow-xl text-white  p-1">
        <GearIcon className=" m-0 h-6 p-0 rounded-full w-full" />
      </div>
          {isSidebarOpen && (
            <AnimatePresence>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold"
              >
                Apilux
              </motion.span>
            </AnimatePresence>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent className="pl-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Create a new URL"
              isActive={pathname === "/short"}
              asChild
              className="flex items-center"
            >
              <Link href="/short">
                <Plus className="h-4 w-4" />
                <span>New short URL</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Create a new QR Code"
              isActive={pathname === "/qr"}
              asChild
              className="flex items-center"
            >
              <Link href="/qr">
                <QrCode className="h-4 w-4" />
                <span>New QR Code</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarSeparator />
          <SidebarMenuItem className="pr-2">
            <SidebarMenuButton
              tooltip="Dashboard"
              isActive={pathname.includes("/dashboard/home")}
              asChild
              className="flex items-center"
            >
              <Link href="/dashboard/home">
                <LinkIcon className="h-4 w-4" />
                <span>Short URLs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="pr-2">
            <SidebarMenuButton
              tooltip="QR Codes"
              isActive={pathname.includes("/dashboard/qr")}
              asChild
              className="flex items-center"
            >
              <Link href="/dashboard/qr">
                <ScanQrCode className="h-4 w-4" />
                <span>QR Codes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="pr-2">
            <SidebarMenuButton
              tooltip="Analytics"
              isActive={pathname.includes("/dashboard/analytics")}
              asChild
              className="flex items-center"
            >
              <Link href="/dashboard/analytics">
                <BarChart2 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="pr-2">
            <SidebarMenuButton
              tooltip="Settings"
              isActive={pathname.includes("/dashboard/settings")}
              asChild
              className="flex items-center"
            >
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Expand Sidebar"
              onClick={() => {
                toggleSidebar();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              // className="flex items-center justify-center w-full"
            >
              <ChevronsLeft
                className={`h-4 w-4 ${
                  isSidebarOpen ? "" : "transform rotate-180"
                } transition-transform duration-300`}
              /><span>Collapse Sidebar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {/* <ThemeToggle /> */}
            {/* <SidebarMenuButton>
            <ModeToggle/>
            <span>Switch Theme</span>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={() => {
                signOut({ redirect: true, redirectTo: "/login" });
              }}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}