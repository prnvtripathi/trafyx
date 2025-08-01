import HomePageGreeting from "@/components/dashboard/greeting";
import Stats from "@/components/dashboard/user-stats";
import { auth } from "@/auth";

export default async function DashboardPage() {
    const session = await auth();
    const user = session?.user;
    const user_id = user?._id;
    return (
        <div className="flex flex-col h-full">
            <HomePageGreeting />
            {user_id && <Stats userId={user_id} />}
        </div>
    );
}