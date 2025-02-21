"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "./ui/loader";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { FaGolang } from "react-icons/fa6";
import { IoIosThunderstorm } from "react-icons/io";
import { DollarSign } from "lucide-react";

export function RunTestCases({ api_id }: { api_id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isPremium = true;

  async function runCases(apiId: string, testType: string) {
    try {
      setLoading(true);
      const response = await fetch(`/api/execute/${testType}`, {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="w-42">
          {loading ? <Loader size={2} /> : "Run Test Cases"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => runCases(api_id, "golang")}>
          <FaGolang className="mr-2" /> GoLang
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => runCases(api_id, "kestra")}
          // disabled
          className="flex items-center justify-between"
        >
          <span className="flex items-center">
            <IoIosThunderstorm className="mr-2" /> Kestra{" "}
          </span>
          {isPremium && <DollarSign className="text-primary h-3 w-3" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
