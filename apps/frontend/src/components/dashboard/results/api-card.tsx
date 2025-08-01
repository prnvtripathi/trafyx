import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { TestResultWithAPI } from "@/types/test-result.type";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/lib/utils";
import { Clock, Eye, BarChart3, TestTube } from "lucide-react";
import Link from "next/link";

const methodColors = {
    GET: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
    POST: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    PUT: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
    DELETE: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
    PATCH: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
};

export default function APICard({ api, isLoading, error }: { api: TestResultWithAPI; isLoading: boolean; error: Error | null; }) {
    if (isLoading) {
        return (
            <Card className="h-48">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader size={36} />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3 text-red-700 dark:text-red-300">
                        <div className="size-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold">!</span>
                        </div>
                        <div>
                            <p className="font-medium">Error loading API details</p>
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error.message}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!api) {
        return (
            <Card className="border-dashed">
                <CardContent className="pt-6 text-center">
                    <div className="size-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                        <TestTube className="size-5 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">No API details found</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="group hover:shadow-lg hover:shadow-black/5 transition-all duration-200 hover:-translate-y-0.5 border-0 shadow-sm">
            <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Badge
                            variant="outline"
                            className={`${methodColors[api.user_api.method]} font-mono text-xs px-2.5 py-1 font-semibold`}
                        >
                            {api.user_api.method ?? "N/A"}
                        </Badge>
                        <div className="min-w-0 flex-1">
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50 truncate">
                                {api.user_api.name}
                            </CardTitle>
                        </div>
                    </div>
                    <CardDescription className="font-mono leading-relaxed mt-2">
                        {api.user_api.url}
                    </CardDescription>
                </div>

                {api.user_api.description && (
                    <CardDescription className=" leading-relaxed mt-2">
                        {api.user_api.description}
                    </CardDescription>
                )}

            </CardHeader>

            <CardContent className="">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                        <TestTube className="size-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-600 dark:text-gray-400">Test Results:</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{api.test_cases_count}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href={`/dashboard/apis/${api._id}`}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors font-medium"
                        >
                            <Eye size={14} />
                            View API
                        </Link>
                        <Link
                            href={`/dashboard/results/${api._id}`}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors font-medium"
                        >
                            <BarChart3 size={14} />
                            View Results
                        </Link>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock size={12} />
                    <span>Last updated {formatTimeAgo(api.user_api.updated_at)}</span>
                </div>
            </CardFooter>
        </Card>
    );
}