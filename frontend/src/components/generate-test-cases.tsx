"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
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
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

export function GenerateTestCases({
  api_id,
  apiSpec,
}: {
  api_id: string;
  apiSpec: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [generatedCases, setGeneratedCases] = useState("");

  async function generateCases(testType: "golang" | "genAI") {
    try {
      setLoading(true);
      if (testType === "golang") {
        await fetch(`/api/generate/cases`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api_id }),
        });
        toast.success("Test cases generated successfully!");
        // router.push(`/dashboard/all-apis/${api_id}`);
        window.location.reload();
      } else if (testType === "genAI") {
        const response = await fetch(`/api/generate/groq`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `Generate test cases for the following API: ${JSON.stringify(
              apiSpec
            )}`,
            maxTokens: 2000,
          }),
        });
        const data = await response.json();
        setGeneratedCases(data?.response);
        setDialogOpen(true);
      }
    } catch (err) {
      console.log(err);
      toast.error(`Failed to generate cases with ${testType}!`);
    } finally {
      setLoading(false);
    }
  }

  async function saveGenAICases() {
    try {
      setLoading(true);
      await fetch(`/api/submit/cases/gen-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test_cases: generatedCases, api_id }),
      });
      setDialogOpen(false);
      toast.success("AI-generated test cases saved successfully!");
      router.push(`/dashboard/all-apis/${api_id}`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to save AI-generated test cases!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="w-42 flex justify-between">
          {loading ? <Loader size={2} /> : "Generate Test Cases"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => generateCases("golang")}>
          <FaGolang className="mr-2" /> Golang
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateCases("genAI")}>
          <IoIosThunderstorm className="mr-2" /> GenAI
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* Dialog for editing GenAI test cases */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit GenAI Test Cases</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <Textarea
              value={generatedCases}
              onChange={(e) => setGeneratedCases(e.target.value)}
              className="min-h-[60vh] font-mono text-sm"
            />
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                generateCases("golang");
              }}
              disabled={loading}
            >
              {loading ? <Loader size={2} /> : "Save Test Cases"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
