"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TestResultDetails } from "./test-result-details";
import { formatDate, parseJSON } from "@/lib/helpers";

interface TestCaseItemProps {
  testCase: any;
  testResult: any;
}

export function TestCaseItem({ testCase, testResult }: TestCaseItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{testCase.name}</span>
          <Badge variant={testResult.test_result ? "default" : "destructive"}>
            {testResult.test_result ? "Passed" : "Failed"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Description:</strong> {testCase.description}
          </p>
          <p>
            <strong>Method:</strong> {testCase.method}
          </p>
          <p>
            <strong>URL:</strong> {testCase.url}
          </p>
          <p>
            <strong>Expected Outcome:</strong> {testCase.expectedoutcome}
          </p>
          <p>
            <strong>Actual Outcome:</strong> {testResult.status_code}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Show Details
              </>
            )}
          </Button>
          {isExpanded && (
            <TestResultDetails testCase={testCase} testResult={testResult} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
