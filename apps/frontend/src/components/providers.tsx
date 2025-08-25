import { ThemeProvider } from "./utils/theme-provider";
import { SessionProvider } from "./utils/session-provider";
import { auth } from "@/auth";
import { Toaster } from "@/components/utils/sonner-toaster";
import { Analytics } from "@vercel/analytics/next"

export async function Providers({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <ThemeProvider attribute="class">
                <Toaster />
                {children}
                <Analytics />
            </ThemeProvider>
        </SessionProvider>
    );
}