import UserAPITable from "@/components/dashboard/apis/table";
import Heading from "@/components/heading";

export default async function APIPage() {

    return (
        <main>
            <Heading title="User APIs" description="Manage your APIs here. You can create, edit, and delete APIs as needed." />
            <UserAPITable />
        </main>
    );
}