// "use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="md:flex-1">
        <Header />
        <SidebarTrigger className="fixed left-2 bottom-2 flex md:hidden" />
        {children}
        <Footer/>
      </main>
    </SidebarProvider>
  );
}
