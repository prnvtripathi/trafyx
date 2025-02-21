import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TestCaseList } from "./test-case-list";

interface ApiTestInfoProps {
  apiInfo: {
    api_id: string;
    test_cases: number;
    test_results: any[];
  };
}

export function ApiTestInfo({ apiInfo }: ApiTestInfoProps) {
  const [filter, setFilter] = useState<"all" | "passed" | "failed">("all");

  const passedTests = apiInfo.test_results.filter(
    (result) => result.test_results_data.test_result
  );
  const failedTests = apiInfo.test_results.filter(
    (result) => !result.test_results_data.test_result
  );

  const filteredResults =
    filter === "passed"
      ? passedTests
      : filter === "failed"
      ? failedTests
      : apiInfo.test_results;

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>API Test Results</span>
            <Badge
              variant={
                passedTests.length === apiInfo.test_results.length
                  ? "default"
                  : "destructive"
              }
            >
              {passedTests.length}/{apiInfo.test_results.length} Passed
            </Badge>
          </CardTitle>
          <CardDescription>
            API ID: {apiInfo.api_id} | Total Test Cases: {apiInfo.test_cases}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Passed Tests</h3>
                <p className="text-2xl font-bold text-green-600">
                  {passedTests.length}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Failed Tests</h3>
                <p className="text-2xl font-bold text-red-600">
                  {failedTests.length}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setFilter("all")}
                variant={filter === "all" ? "default" : "outline"}
              >
                All
              </Button>
              <Button
                onClick={() => setFilter("passed")}
                variant={filter === "passed" ? "default" : "outline"}
              >
                Passed
              </Button>
              <Button
                onClick={() => setFilter("failed")}
                variant={filter === "failed" ? "default" : "outline"}
              >
                Failed
              </Button>
            </div>
            <TestCaseList testResults={filteredResults} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
