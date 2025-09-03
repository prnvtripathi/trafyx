import UserAPITable from "@/components/dashboard/apis/table";
import Heading from "@/components/heading";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import Loader from "@/components/ui/loader";

export default async function APIPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;
    const userId = user?.id;

    return (
        <main>
            <Heading title="User APIs" description="Manage your APIs here. You can create, edit, and delete APIs as needed." />
            <Suspense fallback={<Loader />}>
                <UserAPITable userId={userId ?? ""} />
            </Suspense>
        </main>
    );
}