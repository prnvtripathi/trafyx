"use client"

import { useRunCases } from "@/hooks/use-run-cases";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { FastForward } from "lucide-react";

export default function RunCases({ apiId }: { apiId: string }) {
    const router = useRouter();

    const {
        mutate: runCases,
        isMutating: isRunCasesLoading,
        error: runCasesError,
    } = useRunCases(apiId);

    const handleTestAPI = () => {
        if (!apiId) return;
        runCases(undefined, {
            onSuccess: (data: any) => {
                if (data?.success) {
                    router.push(`/dashboard/results/${apiId}`);
                }
            },
        });
    };

    return (
        <Button
            className="flex items-center gap-2"
            variant="default"
            onClick={handleTestAPI}
            disabled={isRunCasesLoading}
        >
            {isRunCasesLoading ? (
                <>
                    <Loader size={32} />
                    Running...
                </>
            ) : (
                <>
                    <FastForward className="size-4" />
                    Test API
                </>
            )}
        </Button>
    )
}