import HomePageGreeting from "@/components/dashboard/greeting";
import Stats from "@/components/dashboard/user-stats";
import { auth } from "@/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;
    const userId = user?.id;
    return (
        <div className="flex flex-col h-full">
            <HomePageGreeting />
            {userId && <Stats userId={userId} />}
        </div>
    );
}