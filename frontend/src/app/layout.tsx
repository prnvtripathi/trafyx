import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/ui/footer";
import { auth } from "@/auth";
import { SessionProvider } from "@/components/AuthProvider";
import ProgressBars from "@/components/ui/ProgressBarProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apilux: Test your APIs Faster, Not Harder",
  description:
    "Apilux Automates Test Case Generation,Retrieval And Storage For Your Api. We do the heavy lifting so you don't have to!!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <ProgressBars>{children}</ProgressBars>
              {/* <Footer /> */}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
