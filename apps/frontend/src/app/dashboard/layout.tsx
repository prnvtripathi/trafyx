import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main
            className="bg-[linear-gradient(135deg,_#e3e3e3_40%,_#0ea5e9_100%)] dark:bg-[linear-gradient(135deg,_#0b0b0c_40%,_#0c4a6e_100%)] pb-4"
        >
            <SidebarProvider>
                <AppSidebar />

                <main className="md:flex-1 space-y-2 overflow-hidden relative z-0">
                    {/* <BackgroundStyle/> */}
                    <div className="flex items-center justify-between border-b">
                        <SidebarTrigger className="flex md:hidden h-full" />
                        <Header />
                    </div>
                    <div className="mx-4">{children}</div>
                    {/* <Footer /> */}
                </main>
            </SidebarProvider>
        </main>

    );
}

