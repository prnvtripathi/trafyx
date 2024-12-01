import { ChevronDown, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/workspace/footer";
import { Navbar } from "@/components/workspace/navbar";
import { RequestPanel } from "@/components/workspace/request-panel";
import { ResponsePanel } from "@/components/workspace/response-panel";
import { WorkspaceSidebar } from "@/components/workspace/workspaceSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      
      <div className="flex min-h-screen flex-col w-full z-50">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          {/* <WorkspaceSidebar /> */}
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
            {/* <div className="flex items-center space-x-2 border-b px-4 py-1">
              <Button variant="ghost" size="sm" className="text-green-500">
                GET
              </Button>
              <span className="text-sm">Fetch data</span>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div> */}
            <div className="flex-1 h-fit">
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
