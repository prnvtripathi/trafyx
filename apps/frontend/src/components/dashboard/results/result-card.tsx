"use client"

import { TestResult } from "@/types/test-result.type";
import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ChevronDown, Clock } from "lucide-react";

const StatusBadge = ({ status, code }: { status: boolean; code: number }) => {
    return (
        <Badge variant={status ? "default" : "destructive"} className="gap-1">
            {status ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
            {code ?? "N/A"}
        </Badge>
    );
};

const MethodBadge = ({ method }: { method: string | undefined }) => {
    const variants = {
        GET: "secondary",
        POST: "default",
        PUT: "outline",
        DELETE: "destructive",
    };

    type MethodType = keyof typeof variants;

    const badgeVariant: "secondary" | "default" | "outline" | "destructive" =
        method && (Object.keys(variants) as MethodType[]).includes(method as MethodType)
            ? variants[method as MethodType] as "secondary" | "default" | "outline" | "destructive"
            : "outline";

    return (
        <Badge variant={badgeVariant}>
            {method ?? "N/A"}
        </Badge>
    );
};

export const TestResultCard = ({ result }: { result: TestResult }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="transition-all duration-200 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-muted/20">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <CardTitle className="text-lg">{result?.test_case?.name ?? "Unnamed Test"}</CardTitle>
                            <MethodBadge method={result?.test_case?.method} />
                            <StatusBadge status={!!result?.test_result} code={result?.status_code ?? 0} />
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                            </Button>
                        </CollapsibleTrigger>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {result.duration ?? 0}ms
                        </div>
                        <div className="text-xs">
                            {result.executed_at ? new Date(result.executed_at).toLocaleString() : ""}
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">URL:</span> {result.test_case?.url ?? "N/A"}
                    </div>

                    {result.test_case?.description && (
                        <CardDescription className="mt-2">
                            {result.test_case.description}
                        </CardDescription>
                    )}
                </CardHeader>

                <CollapsibleContent>
                    <CardContent className="pt-0 space-y-4">
                        {result.test_case?.headers && (
                            <div>
                                <div className="font-medium text-sm mb-2">Headers:</div>
                                <pre className="bg-muted/50 dark:bg-muted/20 p-3 rounded-md text-xs overflow-x-auto border">
                                    {(() => {
                                        try {
                                            return JSON.stringify(JSON.parse(result.test_case.headers), null, 2);
                                        } catch {
                                            return result.test_case.headers;
                                        }
                                    })()}
                                </pre>
                            </div>
                        )}

                        {result.test_case?.payload && (
                            <div>
                                <div className="font-medium text-sm mb-2">Payload:</div>
                                <pre className="bg-muted/50 dark:bg-muted/20 p-3 rounded-md text-xs overflow-x-auto border">
                                    {(() => {
                                        try {
                                            return JSON.stringify(JSON.parse(result.test_case.payload), null, 2);
                                        } catch {
                                            return result.test_case.payload;
                                        }
                                    })()}
                                </pre>
                            </div>
                        )}

                        <div>
                            <div className="font-medium text-sm mb-2">Response:</div>
                            <pre className="bg-muted/50 dark:bg-muted/20 p-3 rounded-md text-xs overflow-x-auto border">
                                {(() => {
                                    try {
                                        return JSON.stringify(JSON.parse(result.response), null, 2);
                                    } catch {
                                        return result.response;
                                    }
                                })()}
                            </pre>
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
};
