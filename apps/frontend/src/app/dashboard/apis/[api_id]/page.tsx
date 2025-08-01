"use client"

import { useParams } from "next/navigation";
import { useAPIById } from "@/hooks/use-user-apis";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import APIPageCard from "@/components/dashboard/apis/api/card";
import TestCaseDetails from "@/components/dashboard/apis/api/test-case-details";

export default function APIPage() {
    // Fetch the API details based on the provided id from the URL parameters
    const { api_id } = useParams();
    const { data, error, isLoading } = useAPIById(api_id as string);

    const { user_api: api, test_cases: testCases } = data || {};

    return (
        <main>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <Heading title="API Details" description="Review your API configuration and generate test cases." />
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="hover:bg-muted/70"
                    >
                        <PencilIcon className="size-4 mr-1" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        className="hover:text-destructive *:hover:bg-destructive/20"
                    >
                        <Trash2Icon className="size-4 mr-1" />
                        Delete
                    </Button>
                </div>
            </div>
            {/* API Details */}
            <APIPageCard api={api} isLoading={isLoading} error={error} />

            {/* Test Case Details */}
            {!isLoading && !error ? (
                <TestCaseDetails testCases={testCases} apiId={api_id as string} />
            ) : null}
        </main>
    );
}