"use client";

import { useUserAPIs } from "@/hooks/use-user-apis";
import { authClient } from "@/lib/auth-client";
import APICard from "./card";
import { UserAPI } from "@/types/api.type";

export default function UserAPITable() {
    const {
        data: session,
    } = authClient.useSession()
    const userId = session?.user?.id;

    if (!userId) {
        return <p>Please log in to view your APIs.</p>;
    }

    const { data, error, isLoading } = useUserAPIs({ userId });
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading APIs: {error.message}</p>;

    const handleEdit = (api: UserAPI) => {
        console.log("Editing API:", api);
        // router.push(`/dashboard/apis/${api.id}/edit`);
    };

    const handleDelete = (api: UserAPI) => {
        console.log("Deleting API:", api);
        // Call your delete API function here
    };

    return (
        <div className="overflow-x-auto space-y-4">
            {data?.apis?.map((api) => (
                <APICard key={api.id} api={api} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
        </div>
    );
}