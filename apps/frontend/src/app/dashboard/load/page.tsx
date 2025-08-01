import { auth } from "@/auth";
import LoadTestForm from "@/components/dashboard/load/form";
import Heading from "@/components/heading";

export default async function LoadTestPage() {
    const session = await auth();
    const userId = session?.user?._id;

    return (
        <main>
            <Heading title="Load Test" />
            {userId && <LoadTestForm userId={userId} />}
        </main>
    );
}