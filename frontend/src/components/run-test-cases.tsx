"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "./ui/loader";

export function RunTestCases({ api_id }: { api_id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function runCases(apiId: string) {
    try {
      setLoading(true);
      const response = await fetch(`/api/execute/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ api_id: apiId }),
      });

      const data = await response.json();
      toast.success("Test cases executed successfully!");
      router.push(`/dashboard/test-results/${apiId}`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to run cases!");
      throw new Error("Failed to run cases!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="default"
      onClick={() => {
        runCases(api_id);
      }}
      className="w-42"
    >
      {loading ? <Loader size={2}/> : "Run Test Cases"}
    </Button>
  );
}
