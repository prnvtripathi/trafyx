"use client";

import { useParams } from "next/navigation";
import { useTestResults } from "@/hooks/use-test-results";
import React, { useState } from "react";
import { CheckCircle, XCircle, Clock, Activity, Globe, Code, Database, Filter, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SummaryCard } from "@/components/dashboard/results/summary-card";
import { TestResultCard } from "@/components/dashboard/results/result-card";
import { TestResult } from "@/types/test-result.type";
import Loader from "@/components/ui/loader";
import Heading from "@/components/heading";

export default function ApiTestResults() {
    const [filter, setFilter] = useState<string>("all");
    const [runCountFilter, setRunCountFilter] = useState<string>("all");
    const { api_id } = useParams<{ api_id: string }>();
    const { data, error, isLoading } = useTestResults(api_id ?? "");

    console.log("Test Results Data:", data);


    if (isLoading || !data) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <Loader size={48} />
            </div>
        );
    }

    // Defensive: ensure test_results is always an array
    const testResultsArr = Array.isArray(data.test_results)
        ? data.test_results
        : [];

    // Support both [{ r: TestResult }] and [TestResult] shapes
    const getResult = (item: any): TestResult | undefined => {
        if (item && typeof item === "object") {
            if ("r" in item) return item.r;
            if ("_id" in item) return item as TestResult;
        }
        return undefined;
    };

    const passedTests = testResultsArr.filter((item) => {
        const r = getResult(item);
        return r && r.test_result;
    }).length;
    const failedTests = testResultsArr.filter((item) => {
        const r = getResult(item);
        return r && !r.test_result;
    }).length;
    const avgDuration =
        testResultsArr.reduce((acc: number, item) => acc + (getResult(item)?.duration ?? 0), 0) /
        (testResultsArr.filter((item) => getResult(item)).length || 1);

    // Get unique run counts for filter options
    const uniqueRunCounts = ([
        ...new Set(testResultsArr.map((item) => getResult(item)?.run_count))
    ] as number[]).filter((v) => v !== undefined).sort((a, b) => a - b);

    const filteredResults = testResultsArr.filter((item) => {
        const r = getResult(item);
        // Status filter
        if (filter === "passed" && !r?.test_result) return false;
        if (filter === "failed" && r?.test_result) return false;

        // Run count filter
        if (runCountFilter !== "all") {
            const runCount = parseInt(runCountFilter);
            if (r?.run_count !== runCount) return false;
        }
        return true;
    });

    console.log("passedTests:", passedTests);
    console.log("failedTests:", failedTests);
    console.log("avgDuration:", avgDuration);
    console.log("filteredResults:", filteredResults);

    return (
        <main>
            <div className="">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Heading title="API Test Results" className="mb-2" />
                        <div className="flex flex-col md:flex-row items-center text-muted-foreground">
                            <Globe className="w-4 h-4 mr-2" />
                            <span className="font-medium text-foreground">{data.user_api.name}</span>
                            <span className="mx-2">•</span>
                            <span>API ID: {data.api_id}</span>
                        </div>
                    </div>
                </div>

                {/* API Info Card */}
                <Card className="mb-8 transition-all duration-200 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-muted/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5" />
                            API Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Base URL</p>
                                <p className="text-foreground font-mono">{data.user_api.url}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                                <p className="text-foreground">{data.user_api.description}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Created</p>
                                <p className="text-foreground">{new Date(data.user_api.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Last Updated</p>
                                <p className="text-foreground">{new Date(data.user_api.updated_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <SummaryCard
                        title="Total Tests"
                        value={data.test_cases}
                        icon={Code}
                        variant="default"
                    />
                    <SummaryCard
                        title="Passed"
                        value={passedTests}
                        icon={CheckCircle}
                        variant="success"
                    />
                    <SummaryCard
                        title="Failed"
                        value={failedTests}
                        icon={XCircle}
                        variant="destructive"
                    />
                    <SummaryCard
                        title="Avg Duration"
                        value={`${Math.round(avgDuration * 100) / 100}ms`}
                        icon={Clock}
                        variant="warning"
                    />
                </div>

                {/* Filter and Results */}
                <Card className="transition-all duration-200">
                    <CardHeader>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <CardTitle>Test Results</CardTitle>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Filter className="w-4 h-4 text-muted-foreground" />
                                    <Select value={filter} onValueChange={setFilter}>
                                        <SelectTrigger className="w-40">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="passed">Passed Only</SelectItem>
                                            <SelectItem value="failed">Failed Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Activity className="w-4 h-4 text-muted-foreground" />
                                    <Select value={runCountFilter} onValueChange={setRunCountFilter}>
                                        <SelectTrigger className="w-40">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Runs</SelectItem>
                                            {uniqueRunCounts.map((count) => (
                                                <SelectItem key={count} value={count?.toString()}>
                                                    Run #{count}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="space-y-4">
                            {filteredResults.map((item, idx) => {
                                const r = getResult(item);
                                return r ? (
                                    <TestResultCard key={r._id ?? idx} result={r} />
                                ) : null;
                            })}
                        </div>

                        {filteredResults.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-muted-foreground text-lg mb-2">No test results found</div>
                                <p className="text-sm text-muted-foreground">
                                    No test results match the current filter criteria. Try adjusting your filters.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}