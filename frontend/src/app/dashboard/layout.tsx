// "use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { BackgroundStyle } from "@/components/effects/background-style";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="md:flex-1 space-y-2 overflow-hidden relative z-0">
        {/* <BackgroundStyle/> */}
        <div className="flex items-center justify-between">
          <SidebarTrigger className="flex md:hidden h-full" />
          <Header />
        </div>
        <div className="mx-4">{children}</div>
        {/* <Footer /> */}
      </main>
    </SidebarProvider>
  );
}
