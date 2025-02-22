import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Lightbulb, RefreshCcw } from "lucide-react";
import { TestResultDetails } from "./test-result-details";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface TestCaseItemProps {
  testCase: {
    name: string;
    description: string;
    method: string;
    url: string;
    expectedoutcome: string;
  };
  testResult: {
    test_result: boolean;
    status_code: string;
  };
}

export function TestCaseItem({ testCase, testResult }: TestCaseItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="group hover:bg-muted/10 transition-all duration-300 hover:shadow-lg border-opacity-50 relative">
      {/* Lightbulb button appears on hover */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ExplainDialog testCase={testCase} testResult={testResult} />
      </div>
      <CardHeader className="relative pb-4">
        <div className="absolute -left-px top-4 h-14 w-1 rounded-r-md bg-gradient-to-b from-purple-400 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <CardTitle className="flex justify-between items-center space-x-4">
          <span className="text-lg font-medium transition-colors duration-200 group-hover:text-primary">
            {testCase.name}
          </span>
          <Badge
            variant={testResult.test_result ? "default" : "destructive"}
            className={cn(
              "transition-all duration-300 px-3 py-1",
              testResult.test_result
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            )}
          >
            {testResult.test_result ? "Passed" : "Failed"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <Separator className="w-11/12 mx-auto" />
      <CardContent>
        <div className="space-y-8">
          <div className="grid gap-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">
                  Description
                </label>
                <p className="font-medium">{testCase.description}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">
                  Method
                </label>
                <p>
                  <span
                    className={cn(
                      "font-medium",
                      testCase.method === "POST"
                        ? "text-blue-600"
                        : testCase.method === "GET"
                        ? "text-green-600"
                        : testCase.method === "PUT"
                        ? "text-yellow-600"
                        : testCase.method === "DELETE"
                        ? "text-red-600"
                        : "text-gray-600"
                    )}
                  >
                    {testCase.method}
                  </span>
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-gray-500">
                URL
              </label>
              <p className="font-medium break-all">{testCase.url}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">
                  Expected Outcome
                </label>
                <p className="font-medium">{testCase.expectedoutcome}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">
                  Actual Outcome
                </label>
                <p className="font-medium">{testResult.status_code}</p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center bg-transparent w-full space-x-1"
          >
            {isExpanded ? (
              <>
                <span>Hide Details</span>
                <ChevronUp className="ml-2 h-4 w-4 transition-transform duration-200" />
              </>
            ) : (
              <>
                <span>Show Details</span>
                <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200" />
              </>
            )}
          </Button>

          <div
            className={cn(
              "grid transition-all duration-300",
              isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="overflow-hidden">
              <Separator className="w-11/12 mx-auto" />
              <TestResultDetails testCase={testCase} testResult={testResult} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// The ExplainDialog component manages the lightbulb dialog
function ExplainDialog({ testCase, testResult }: TestCaseItemProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");

  const handleExplain = useCallback(async () => {
    setLoading(true);
    setExplanation("");
    const prompt = `
      Explain the following API test:
      - Name: ${testCase.name}
      - URL: ${testCase.url}
      - Method: ${testCase.method}
      - Expected: ${testCase.expectedoutcome}
      - Actual: ${testResult.status_code}
    `;
    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          maxTokens: 1200,
          isMarkdownNeeded: false,
        }),
      });
      const data = await res.json();
      setExplanation(data?.response || "No explanation available.");
    } catch (error) {
      setExplanation("Failed to fetch explanation.");
    }
    setLoading(false);
  }, [testCase, testResult]);

  useEffect(() => {
    if (open) {
      handleExplain();
    }
  }, [open, handleExplain]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="p-1 rounded-full">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogTitle>Test Explanation</DialogTitle>
        <DialogDescription>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[500px]" />
              <Skeleton className="h-4 w-[550px]" />
            </div>
          ) : (
            <p className="text-sm">
              {explanation || "Generating explanation..."}
            </p>
          )}
        </DialogDescription>
        <div className="flex justify-end">
          {explanation && !loading && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExplain}
              className="gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Rephrase
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
