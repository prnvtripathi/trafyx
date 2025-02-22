import { useState, useEffect } from "react";
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
  const [statusFilter, setStatusFilter] = useState<"all" | "passed" | "failed">(
    "all"
  );
  // Default remains null, representing "All Runs"
  const [runCountFilter, setRunCountFilter] = useState<number | null>(null);
  const [uniqueRunCounts, setUniqueRunCounts] = useState<number[]>([]);
  const [filteredResults, setFilteredResults] = useState(apiInfo.test_results);
  const [stats, setStats] = useState({
    passed: 0,
    failed: 0,
    passRate: 0,
  });

  // Extract unique run counts on component mount or when test_results change
  useEffect(() => {
    const runCounts = [
      ...new Set(
        apiInfo.test_results.map(
          (result) => result.test_results_data.run_count || 0
        )
      ),
    ].sort((a, b) => a - b);
    setUniqueRunCounts(runCounts);
  }, [apiInfo.test_results]);

  // Compute run-only results based on runCountFilter (ignoring status filter)
  const resultsByRun =
    runCountFilter !== null
      ? apiInfo.test_results.filter(
          (result) => result.test_results_data.run_count === runCountFilter
        )
      : apiInfo.test_results;

  // Compute overall stats solely based on resultsByRun
  useEffect(() => {
    const passedTests = resultsByRun.filter(
      (result) => result.test_results_data.test_result
    );
    const failedTests = resultsByRun.filter(
      (result) => !result.test_results_data.test_result
    );
    const passRate =
      resultsByRun.length > 0
        ? (passedTests.length / resultsByRun.length) * 100
        : 0;
    setStats({
      passed: passedTests.length,
      failed: failedTests.length,
      passRate,
    });
  }, [resultsByRun]);

  // Compute filtered results for the test case list based on run and status filters
  useEffect(() => {
    let results = resultsByRun;
    if (statusFilter === "passed") {
      results = results.filter(
        (result) => result.test_results_data.test_result
      );
    } else if (statusFilter === "failed") {
      results = results.filter(
        (result) => !result.test_results_data.test_result
      );
    }
    setFilteredResults(results);
  }, [statusFilter, resultsByRun]);

  const StatCard = ({
    title,
    value,
    type,
  }: {
    title: string;
    value: number;
    type: "success" | "error";
  }) => (
    <Card className="">
      <CardContent className="p-4 md:p-6 bg-muted/10 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm text-slate-400">{title}</p>
            <p className="text-xl md:text-2xl font-bold mt-1">{value}</p>
          </div>
          {type === "success" ? (
            <CircleCheck className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
          ) : (
            <CircleX className="h-6 w-6 md:h-8 md:w-8 text-red-500" />
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-6 py-4 md:py-6">
      <BackgroundStyle />
      <div className="w-full mx-auto">
        <CardHeader className="px-3 py-3 md:px-6 md:py-4 space-y-3 md:space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
            <div>
              <CardTitle className="text-xl md:text-2xl text-slate-100">
                API Test Results
              </CardTitle>
              <CardDescription className="mt-1 md:mt-2 flex flex-wrap items-center gap-2 md:space-x-2">
                <code className="px-2 py-1 bg-slate-800 rounded text-xs md:text-sm text-slate-300">
                  {apiInfo.api_id}
                </code>
                <div className="flex items-center">
                  <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-slate-600 mr-1 md:mr-2" />
                  <span className="text-xs md:text-sm text-slate-400">
                    Total Test Cases: {apiInfo.test_cases}
                  </span>
                </div>
              </CardDescription>
            </div>
            <div className="flex flex-col items-start sm:items-end space-y-1 md:space-y-2">
              <Badge
                variant={stats.passRate === 100 ? "default" : "destructive"}
                className={`px-2 md:px-4 py-1 md:py-1.5 text-xs md:text-sm ${
                  stats.passRate === 100
                    ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                    : ""
                }`}
              >
                {stats.passed}/{resultsByRun.length} Passed
              </Badge>
              <p className="text-xs md:text-sm text-slate-400">
                Pass Rate: {stats.passRate.toFixed(1)}%
              </p>
            </div>
          </div>

          <Progress
            value={stats.passRate}
            className="h-1.5 md:h-2 bg-slate-800"
          />
        </CardHeader>

        <CardContent className="px-3 py-3 md:px-6 md:py-4 space-y-6 md:space-y-8">
          <div className="grid grid-cols-2 xs:grid-cols-2 gap-3 md:gap-4">
            <StatCard
              title="Passed Tests"
              value={stats.passed}
              type="success"
            />
            <StatCard title="Failed Tests" value={stats.failed} type="error" />
          </div>

          <div className="space-y-3 md:space-y-4">
            {/* Run Count Filter Tabs */}
            <div className="mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold text-slate-100 mb-2 md:mb-3">
                Run Count
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setRunCountFilter(null)}
                  variant={runCountFilter === null ? "default" : "outline"}
                  size="sm"
                  className={`text-xs md:text-sm h-8 md:h-10 px-2 md:px-3
                    ${
                      runCountFilter === null
                        ? "border-slate-700 bg-muted/40 hover:bg-muted/20 text-slate-100"
                        : "border-slate-700 text-slate-400 hover:text-slate-100"
                    }
                  `}
                >
                  All Runs
                </Button>
                {uniqueRunCounts.map((count) => (
                  <Button
                    key={`run-${count}`}
                    onClick={() => setRunCountFilter(count)}
                    variant={runCountFilter === count ? "default" : "outline"}
                    size="sm"
                    className={`text-xs md:text-sm h-8 md:h-10 px-2 md:px-3
                      ${
                        runCountFilter === count
                          ? "border-slate-700 bg-muted/40 hover:bg-muted/20 text-slate-100"
                          : "border-slate-700 text-slate-400 hover:text-slate-100"
                      }
                    `}
                  >
                    Run #{count}
                    <Badge
                      variant="outline"
                      className="ml-1 md:ml-2 text-xs px-1.5 py-0"
                    >
                      {
                        apiInfo.test_results.filter(
                          (r) => r.test_results_data.run_count === count
                        ).length
                      }
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-0">
              <h3 className="text-base md:text-lg font-semibold text-slate-100">
                Test Cases
              </h3>
              <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-slate-400">
                <AlertCircle className="h-3 w-3 md:h-4 md:w-4" />
                <span>Showing {filteredResults.length} results</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "All Tests" },
                { key: "passed", label: "Passed" },
                { key: "failed", label: "Failed" },
              ].map((option) => (
                <Button
                  key={option.key}
                  onClick={() =>
                    setStatusFilter(option.key as typeof statusFilter)
                  }
                  variant={statusFilter === option.key ? "default" : "outline"}
                  size="sm"
                  className={`text-xs md:text-sm h-8 md:h-10 px-2 md:px-3
                    ${
                      statusFilter === option.key
                        ? "border-slate-700 bg-muted/40 hover:bg-muted/20 text-slate-100"
                        : "border-slate-700 text-slate-400 hover:text-slate-100"
                    }
                  `}
                >
                  {option.label}
                  <Badge
                    variant="outline"
                    className="ml-1 md:ml-2 text-xs px-1.5 py-0"
                  >
                    {option.key === "all"
                      ? resultsByRun.length
                      : option.key === "passed"
                      ? resultsByRun.filter(
                          (r) => r.test_results_data.test_result
                        ).length
                      : resultsByRun.filter(
                          (r) => !r.test_results_data.test_result
                        ).length}
                  </Badge>
                </Button>
              ))}
            </div>

            <div className="mt-3 md:mt-4">
              <TestCaseList testResults={filteredResults} />
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
