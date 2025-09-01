"use client";

import { useAPIsWithTestResults } from "@/hooks/use-test-results";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { authClient } from "@/lib/auth-client";
import Heading from "@/components/heading";
import APICard from "@/components/dashboard/results/api-card";

export default function ResultsPage() {
    const {
        data: session,
    } = authClient.useSession()
    const userId = session?.user?.id;

    const { data, error, isLoading } = useAPIsWithTestResults(userId as string);

    console.log("data:", data);

    if (isLoading) {
        return (
            <Card>
                <CardContent>
                    <Loader size={36} />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="border-destructive/50">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-destructive">
                        <div className="size-5 rounded-full bg-destructive/10 flex items-center justify-center">
                            <span className="text-xs font-bold">!</span>
                        </div>
                        <p className="font-medium">Error loading API details</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
                </CardContent>
            </Card>
        );
    }

    if (!data) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-muted-foreground">No API details found.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <main>
            <Heading title="APIs with Test Results" description="View APIs that have test results available." />
            <div className="grid grid-cols-1 gap-4">
                {data.apis.map((api) => (
                    <APICard key={api._id} api={api} isLoading={isLoading} error={error} />
                ))}
            </div>
        </main>
    );
}