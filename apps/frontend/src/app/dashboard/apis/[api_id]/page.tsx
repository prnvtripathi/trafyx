"use client"

import { useParams } from "next/navigation";
import { useAPIById } from "@/hooks/use-user-apis";
import Heading from "@/components/heading";
import EditAPIButton from "@/components/dashboard/apis/api/edit-button";
import DeleteAPIButton from "@/components/dashboard/apis/api/delete-button";
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
                    {api && <EditAPIButton api={api} variant="default" />}
                    {api && <DeleteAPIButton api={api} variant="default" />}
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