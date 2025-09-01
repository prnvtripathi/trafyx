import { auth } from "@/auth";
import LoadTestForm from "@/components/dashboard/load/form";
import Heading from "@/components/heading";
import { headers } from "next/headers";

export default async function LoadTestPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;
    const userId = user?.id;

    return (
        <main>
            <Heading title="Load Test" />
            {userId && <LoadTestForm userId={userId} />}
        </main>
    );
}