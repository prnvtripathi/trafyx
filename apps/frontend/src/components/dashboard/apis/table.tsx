"use client";

import { useUserAPIs } from "@/hooks/use-user-apis";
import APICard from "./card";
import Loader from "@/components/ui/loader";

export default function UserAPITable({ userId }: { userId: string }) {
    const { data, error, isLoading } = useUserAPIs({ userId });
    if (isLoading) return <Loader />;
    if (error) return <p>Error loading APIs: {error.message}</p>;

    return (
        <div className="overflow-x-auto space-y-2 py-1">
            {data?.apis?.map((api) => (
                <APICard key={api.id} api={api} />
            ))}
        </div>
    );
}