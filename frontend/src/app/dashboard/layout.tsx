// "use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { BackgroundStyle } from "@/components/effects/background-style";
import { fetchUserApis } from "@/lib/data";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function getData() {
    const response = await fetchUserApis();

    if (!response || !Array.isArray(response)) {
      return [];
    }

    const formattedData = response.map(
      (api: { ID: string; Name: string; Method: string; URL: string, UpdatedAt: string }) => ({
        id: api.ID,
        name: api.Name,
        method: api.Method,
        url: api.URL,
        updatedAt: api.UpdatedAt,
      })
    );

    return formattedData;
  }

  const apiData = await getData();

  return (
    <SidebarProvider>
      <AppSidebar apiData={apiData} />

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
