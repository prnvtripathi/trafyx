"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function GenerateTestCases({ api_id }: { api_id: string }) {
  const router = useRouter();

  async function generateCases(apiId: string) {
    try {
      const response = await fetch(`/api/generate/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ api_id: apiId }),
      });

      const data = await response.json();
      router.push(`/dashboard/test-cases/${apiId}`);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to generate cases!");
    }
  }

  return (
    <Button
      variant="default"
      onClick={() => {
        generateCases(api_id);
      }}
    >
      Generate Test Cases
    </Button>
  );
}
