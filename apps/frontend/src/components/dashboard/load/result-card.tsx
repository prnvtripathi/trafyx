import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/ui/loader";
import {
    Clock,
    Zap,
    Target,
    Activity,
    CheckCircle,
    XCircle,
    Download,
    Upload,
    BarChart3,
    Timer,
    TrendingUp,
} from "lucide-react";
import { LoadTestResponse } from "@/types/load-test.type";

interface LoadTestResultsProps {
    data: LoadTestResponse | null;
    isLoading: boolean;
    error: any;
}

export default function LoadTestResults({ data, isLoading, error }: LoadTestResultsProps) {
    if (!data && !isLoading && !error) return null;

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getStatusCodeColor = (code: string) => {
        const statusCode = parseInt(code);
        if (statusCode >= 200 && statusCode < 300) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
        if (statusCode >= 300 && statusCode < 400) return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
        if (statusCode >= 400 && statusCode < 500) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Load Test Results
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader />
                    </div>
                ) : error ? (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 py-4">
                        <XCircle className="h-5 w-5" />
                        <span>Error running load test</span>
                    </div>
                ) : data ? (
                    <div className="space-y-6">
                        {/* API Name and Success Rate */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                {data.api_name}
                            </h3>
                            <Badge
                                variant={data.success === 1 ? "default" : "destructive"}
                                className="flex items-center gap-1"
                            >
                                {data.success === 1 ? (
                                    <CheckCircle className="h-3 w-3" />
                                ) : (
                                    <XCircle className="h-3 w-3" />
                                )}
                                {(data.success * 100).toFixed(1)}% Success
                            </Badge>
                        </div>

                        {/* Key Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg border dark:border-blue-800/50">
                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                                    <Zap className="h-4 w-4" />
                                    <span className="text-sm font-medium">Requests</span>
                                </div>
                                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{data.requests}</div>
                            </div>

                            <div className="bg-green-50 dark:bg-green-950/50 p-4 rounded-lg border dark:border-green-800/50">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                                    <TrendingUp className="h-4 w-4" />
                                    <span className="text-sm font-medium">Throughput</span>
                                </div>
                                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                                    {data.throughput.toFixed(1)}<span className="text-sm">/sec</span>
                                </div>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-950/50 p-4 rounded-lg border dark:border-purple-800/50">
                                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-sm font-medium">Duration</span>
                                </div>
                                <div className="text-lg font-bold text-purple-900 dark:text-purple-100">{data.duration}</div>
                            </div>

                            <div className="bg-orange-50 dark:bg-orange-950/50 p-4 rounded-lg border dark:border-orange-800/50">
                                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
                                    <Timer className="h-4 w-4" />
                                    <span className="text-sm font-medium">Avg Wait</span>
                                </div>
                                <div className="text-lg font-bold text-orange-900 dark:text-orange-100">{data.wait}</div>
                            </div>
                        </div>

                        {/* Latencies */}
                        <div>
                            <h4 className="text-md font-semibold mb-3 flex items-center gap-2 text-foreground">
                                <Activity className="h-4 w-4" />
                                Response Times
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded border dark:border-gray-700">
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Mean</div>
                                    <div className="font-semibold text-foreground">{data.latencies.mean}</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded border dark:border-gray-700">
                                    <div className="text-xs text-gray-600 dark:text-gray-400">50th Percentile</div>
                                    <div className="font-semibold text-foreground">{data.latencies.p50}</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded border dark:border-gray-700">
                                    <div className="text-xs text-gray-600 dark:text-gray-400">95th Percentile</div>
                                    <div className="font-semibold text-foreground">{data.latencies.p95}</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded border dark:border-gray-700">
                                    <div className="text-xs text-gray-600 dark:text-gray-400">99th Percentile</div>
                                    <div className="font-semibold text-foreground">{data.latencies.p99}</div>
                                </div>
                            </div>
                        </div>

                        {/* Status Codes */}
                        <div>
                            <h4 className="text-md font-semibold mb-3 text-foreground">Status Codes</h4>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(data.status_codes).map(([code, count]) => (
                                    <Badge
                                        key={code}
                                        variant="outline"
                                        className={`${getStatusCodeColor(code)} border-current`}
                                    >
                                        {code}: {count}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Data Transfer */}
                        <div>
                            <h4 className="text-md font-semibold mb-3 text-foreground">Data Transfer</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950/50 p-3 rounded border dark:border-green-800/50">
                                    <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    <div>
                                        <div className="text-sm text-green-600 dark:text-green-400">Downloaded</div>
                                        <div className="font-semibold text-green-900 dark:text-green-100">
                                            {formatBytes(data.data.bytes_in_total)}
                                        </div>
                                        <div className="text-xs text-green-600 dark:text-green-400">
                                            {formatBytes(data.data.bytes_in)} avg/req
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-red-50 dark:bg-red-950/50 p-3 rounded border dark:border-red-800/50">
                                    <Upload className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    <div>
                                        <div className="text-sm text-red-600 dark:text-red-400">Uploaded</div>
                                        <div className="font-semibold text-red-900 dark:text-red-100">
                                            {formatBytes(data.data.bytes_out_total)}
                                        </div>
                                        <div className="text-xs text-red-600 dark:text-red-400">
                                            {formatBytes(data.data.bytes_out)} avg/req
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Errors */}
                        {data.errors && data.errors > 0 && (
                            <div>
                                <h4 className="text-md font-semibold mb-3 flex items-center gap-2 text-red-600">
                                    <XCircle className="h-4 w-4" />
                                    Errors ({data.errors})
                                </h4>
                                {data.error ? (
                                    <div className="text-red-600">
                                        <p>{data.error}</p>
                                        {data.details && <p className="text-xs text-gray-500">{data.details}</p>}
                                    </div>
                                ) : (
                                    <div className="text-gray-600">No specific error details available.</div>
                                )}
                            </div>
                        )}
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
}