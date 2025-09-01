import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "@/components/utils/sonner-toaster";
import { Analytics } from "@vercel/analytics/next"

export async function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class">
            <Toaster />
            {children}
            <Analytics />
        </ThemeProvider>
    );
}