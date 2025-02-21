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
import { CircleCheck, CircleX, ChevronRight, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BackgroundStyle } from "./effects/background-style";

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

  const passRate = (passedTests.length / apiInfo.test_results.length) * 100;
  
  const filteredResults =
    filter === "passed"
      ? passedTests
      : filter === "failed"
      ? failedTests
      : apiInfo.test_results;

  const StatCard = ({ title, value, type }: { title: string; value: number; type: "success" | "error" }) => (
    <Card className="">
      <CardContent className="p-6 bg-muted/10 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="text-2xl font-bold mt-1">
              {value}
            </p>
          </div>
          {type === "success" ? (
            <CircleCheck className="h-8 w-8 text-green-500" />
          ) : (
            <CircleX className="h-8 w-8 text-red-500" />
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6">
      <BackgroundStyle/>
      <div className="w-full mx-auto ">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-slate-100">API Test Results</CardTitle>
              <CardDescription className="mt-2 flex items-center space-x-2">
                <code className="px-2 py-1 bg-slate-800 rounded text-slate-300">{apiInfo.api_id}</code>
                <ChevronRight className="h-4 w-4 text-slate-600" />
                <span className="text-slate-400">Total Test Cases: {apiInfo.test_cases}</span>
              </CardDescription>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Badge
                variant={passRate === 100 ? "default" : "destructive"}
                className={`px-4 py-1.5 text-sm ${
                  passRate === 100 ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : ''
                }`}
              >
                {passedTests.length}/{apiInfo.test_results.length} Passed
              </Badge>
              <p className="text-sm text-slate-400">Pass Rate: {passRate.toFixed(1)}%</p>
            </div>
          </div>
          
          <Progress 
            value={passRate} 
            className="h-2 bg-slate-800"
          />
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              title="Passed Tests" 
              value={passedTests.length} 
              type="success" 
            />
            <StatCard 
              title="Failed Tests" 
              value={failedTests.length} 
              type="error" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-100">Test Cases</h3>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <AlertCircle className="h-4 w-4" />
                <span>Showing {filteredResults.length} results</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {[
                { key: "all", label: "All Tests" },
                { key: "passed", label: "Passed" },
                { key: "failed", label: "Failed" }
              ].map((option) => (
                <Button
                  key={option.key}
                  onClick={() => setFilter(option.key as typeof filter)}
                  variant={filter === option.key ? "default" : "outline"}
                  className={`
                    ${filter === option.key 
                      ? 'border-slate-700 bg-muted/40 hover:bg-muted/20 text-slate-100' 
                      : 'border-slate-700 text-slate-400 hover:text-slate-100 '
                    }
                  `}
                >
                  {option.label}
                  <Badge 
                    variant="outline" 
                    className="ml-2"
                  >
                    {option.key === "all" 
                      ? apiInfo.test_results.length
                      : option.key === "passed" 
                        ? passedTests.length 
                        : failedTests.length
                    }
                  </Badge>
                </Button>
              ))}
            </div>

            <div className="mt-4 rounded-lg border ">
              <TestCaseList testResults={filteredResults} />
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}