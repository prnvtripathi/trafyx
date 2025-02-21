import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TestResultDetails } from "./test-result-details";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

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
    <Card className="group hover:bg-muted/10 transition-all duration-300 hover:shadow-lg border-opacity-50">
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
      <Separator className="w-11/12 mx-auto"/>
      <CardContent>
        <div className="space-y-8">
          <div className="grid gap-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">Description</label>
                <p className="font-medium">{testCase.description}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">Method</label>
              <p>  <span className={cn(
                  "font-medium",
                  testCase.method === "POST" ? "text-blue-600" :
                  testCase.method === "GET" ? "text-green-600" :
                  testCase.method === "PUT" ? "text-yellow-600" :
                  testCase.method === "DELETE" ? "text-red-600" : "text-gray-600"
                )}>
                  {testCase.method}
                </span></p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-gray-500">URL</label>
              <p className="font-medium break-all">{testCase.url}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">Expected Outcome</label>
                <p className="font-medium">{testCase.expectedoutcome}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-gray-500">Actual Outcome</label>
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
                
                <span>Show Details</span><ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200" />
              </>
            )}
          </Button>
          
          <div className={cn(
            "grid transition-all duration-300",
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}>
            
            <div className="overflow-hidden">
          <Separator className="w-11/12 mx-auto"/>

              <TestResultDetails testCase={testCase} testResult={testResult} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}