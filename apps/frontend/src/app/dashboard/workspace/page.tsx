import { ChevronDown, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { RequestPanel } from "@/components/request-panel";
import { ResponsePanel } from "@/components/response-panel";
import { WorkspaceSidebar } from "@/components/ui/workspaceSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col w-full">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <WorkspaceSidebar />
          <main className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  Konnect Admin
                </Button>
                <Button variant="ghost" size="sm">
                  New
                </Button>
                <Button variant="ghost" size="sm">
                  Import
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2 border-b px-4 py-1">
              <Button variant="ghost" size="sm" className="text-green-500">
                GET
              </Button>
              <span className="text-sm">Fetch data</span>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              <RequestPanel />
              <ResponsePanel />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
