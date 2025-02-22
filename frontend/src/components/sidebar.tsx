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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  BarChart2,
  Settings,
  LogOut,
  ChevronsLeft,
  // Plus,
  // QrCode,
  // ScanQrCode,
  // LinkIcon,
  // LucideFileChartColumnIncreasing,
  // TestTubeDiagonal,
  NotebookTextIcon,
  ArrowUpRight,
  ChevronRight,
  GitGraphIcon,
  ChevronDown,
  PlusIcon,
  PlusCircleIcon,
  NotepadText,
  HammerIcon,
  DumbbellIcon,
  Lock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ModeToggle } from "./theme-button";
import SpinningLogo from "./effects/spinningLogo";
import { GearIcon } from "@radix-ui/react-icons";
import { PageRoutes } from "@/lib/pageroutes";
import { Badge } from "./ui/badge";
// import ThemeToggle from "./ui/theme-toggle";

type ApiData = {
  updatedAt: string | number | Date;
  id: string;
  name: string;
  method: string;
  url: string;
};

export function AppSidebar({ apiData }: { apiData: ApiData[] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  const sortedData: ApiData[] = apiData?.sort((a: ApiData, b: ApiData) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center justify-center py-3 gap-2 flex-row w-full"
        >
          {/* <Image
            src="/images/logo.svg"
            alt="Logo"
            height={32}
            width={32}
            priority
          /> */}{" "}
          <div className="bg-primary rounded-full shadow-xl text-white  p-1">
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
                Trafix
              </motion.span>
            </AnimatePresence>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent className="pl-2">
        <SidebarMenu>
          <SidebarSeparator />
          <SidebarMenuItem className="pr-2">
            <SidebarMenuButton
              tooltip="Add new API"
              isActive={pathname.includes("/dashboard/add")}
              asChild
              className="flex items-center"
            >
              <Link href="/dashboard/add">
                <PlusCircleIcon className="h-4 w-4" />
                <span>Add new API</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>{" "}
          <SidebarMenuItem className="pr-2">
            <SidebarMenuButton
              tooltip="Create & Run Load Tests"
              isActive={pathname.includes("/dashboard/load-test")}
              asChild
              className="flex items-center"
            >
              <Link href="/dashboard/load-test">
                <DumbbellIcon className="h-4 w-4" />
                <span>Load Test APIs</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuAction><Lock className="mr-2 text-muted-foreground"/></SidebarMenuAction>
          </SidebarMenuItem>
            {apiData?.length > 0 && (
            <>
              <SidebarMenuItem className="pr-2">
              <SidebarMenuButton
                tooltip="View All APIs"
                isActive={pathname.includes("/dashboard/all-apis")}
                asChild
                className="flex items-center"
              >
                <Link href="/dashboard/all-apis">
                <BarChart2 className="h-4 w-4" />
                <span>View All APIs</span>
                </Link>
              </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="pr-2">
              <SidebarMenuButton
                tooltip="See Test Results"
                isActive={pathname.includes("/dashboard/test-results")}
                asChild
                className="flex items-center"
              >
                <Link href="/dashboard/test-results">
                <NotepadText className="h-4 w-4" />
                <span>API Test Results</span>
                </Link>
              </SidebarMenuButton>
              </SidebarMenuItem>
            </>
            )}
          <SidebarSeparator />
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel className="group/label" asChild>
                <CollapsibleTrigger className="w-full flex items-center p-0">
                  <div className="rounded-lg hover:bg-muted/60 flex w-full items-center p-1">
                    <GitGraphIcon className="h-4 w-4 mr-2 -translate-x-2 text-white" />
                    <span className="text-sm text-white -translate-x-2">
                      Recent APIs
                    </span>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />{" "}
                  </div>
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="group/content">
                {sortedData?.length > 0 ? (
                sortedData.slice(0, 8).map((api) => (
                  <SidebarMenuItem key={api.id} className="pr-2">
                  <SidebarMenuButton
                    tooltip={api.name}
                    isActive={pathname.includes(api.url)}
                    asChild
                    className="flex items-center"
                  >
                    <Link
                    href={`/dashboard/all-apis/${api.id}`}
                    className="text-sm flex items-center justify-between w-full"
                    >
                    <span>
                      {api.name.length > 20
                      ? `${api.name.substring(0, 15)}...`
                      : api.name}
                    </span>
                    <Badge variant="outline">
                      <span
                      className={`${
                        api.method.toUpperCase() === "GET"
                        ? "text-green-500"
                        : api.method.toUpperCase() === "POST"
                        ? "text-blue-500"
                        : api.method.toUpperCase() === "PUT"
                        ? "text-yellow-500"
                        : api.method.toUpperCase() === "DELETE"
                        ? "text-red-500"
                        : "text-xs"
                      }`}
                      >
                      {api.method.toUpperCase()}
                      </span>
                    </Badge>
                    </Link>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
                ) : (
                <SidebarMenuItem className="pr-2">
                  <SidebarMenuButton>
                  <span className="text-sm">No APIs yet.</span><Link className="hover:underline hover:text-gray-200" href='/dashboard/add'>Create one!</Link></SidebarMenuButton>
                </SidebarMenuItem>
                )}
                </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarSeparator />
          <SidebarMenuItem>
            <Link href={`/docs${PageRoutes[0].href}`} target="_blank">
              <SidebarMenuButton tooltip="View Documentation">
                <NotebookTextIcon className="h-4 w-4" />{" "}
                <span>View Documentation</span>
                <ArrowUpRight className="h-1 w-1" />
              </SidebarMenuButton>
            </Link>{" "}
          </SidebarMenuItem>
          <SidebarMenuItem className="pr-0">
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
          <SidebarSeparator />
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
              />
              <span>Collapse Sidebar</span>
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
