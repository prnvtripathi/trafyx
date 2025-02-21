import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { auth } from "@/auth";
import { BackgroundStyle } from "@/components/effects/background-style";
import { columns } from "./test-case-table-columns";

// Metadata for the page
export const metadata = {
  title: "Test Cases | Trafix",
};

// Type for the fetched data
type TestCase = {
  ID: string;
  created_at: string;
  api_id: string;
  name: string;
  method: string;
  url: string;
  headers: string;
  payload: string;
  description: string;
  expected_outcome: number;
};

// Function to fetch test cases by `api_id`
async function fetchTestCasesByApiId(
  api_id: string
): Promise<TestCase[] | null> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/test-cases?api_id=${api_id}`
    );
    if (!response.ok) {
      console.error("Failed to fetch test cases:", response.statusText);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching test cases:", error);
    return null;
  }
}

// Page component
export default async function Page({
  params,
}: {
  params: { api: string }; // Extracting `api_id` from the URL params
}) {
  // Authenticate the user and get the session
  const session = await auth();

  // Redirect if no session
  if (!session) {
    return <div>Please log in to access this page.</div>;
  }

  // Fetch test case data using the `api_id`
  const apiId = params.api;
  const testCases = await fetchTestCasesByApiId(apiId);

  // Handle case where no data is found
  if (!testCases || testCases.length === 0) {
    return <div>No test cases found or an error occurred.</div>;
  }

  // Render the test case details
  return (
    <div className="overflow-hidden">
      <BackgroundStyle />
      <DataTable columns={columns} data={testCases} />
    </div>
  );
}
