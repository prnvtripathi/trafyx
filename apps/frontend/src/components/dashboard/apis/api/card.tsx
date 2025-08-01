import { UserAPI } from "@/types/api.type";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    ClockIcon,
    SettingsIcon,
    FileTextIcon,
    DatabaseIcon,
    CodeIcon,
    CopyIcon,
} from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import Loader from "@/components/ui/loader";
import RunCases from "./run-cases";

const methodColors = {
    GET: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/50 dark:text-emerald-200 dark:border-emerald-700",
    POST: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-700",
    PUT: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/50 dark:text-amber-200 dark:border-amber-700",
    DELETE: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-200 dark:border-red-700",
    PATCH: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-700",
};

function CodeBlock({ title, content, icon: Icon }: { title: string, content: string, icon: any }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(content);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Icon className="size-4" />
                    {title}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 px-2 text-xs"
                >
                    <CopyIcon className="size-3 mr-1" />
                    Copy
                </Button>
            </div>
            <pre className="bg-muted/50 border rounded-lg p-3 text-sm font-mono overflow-x-auto">
                <code>{content}</code>
            </pre>
        </div>
    );
}

export default function APIPageCard({
    api,
    isLoading,
    error,
}: {
    api: UserAPI | undefined,
    isLoading: boolean,
    error: Error | null,
}) {

    if (isLoading) {
        return (
            <Card>
                <CardContent>
                    <Loader size={36} />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="border-destructive/50">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-destructive">
                        <div className="size-5 rounded-full bg-destructive/10 flex items-center justify-center">
                            <span className="text-xs font-bold">!</span>
                        </div>
                        <p className="font-medium">Error loading API details</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
                </CardContent>
            </Card>
        );
    }

    if (!api) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-muted-foreground">No API details found.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/10 pointer-events-none" />

            {/* Header Section */}
            <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                            <Badge
                                variant="outline"
                                className={`px-3 py-1 text-sm font-semibold tracking-wide shadow-sm ${methodColors[api.method]}`}
                            >
                                {api.method}
                            </Badge>
                            <CardTitle className="text-2xl font-bold text-foreground">
                                {api.name}
                            </CardTitle>
                        </div>

                        {api.description && (
                            <p className="text-muted-foreground leading-relaxed">
                                {api.description}
                            </p>
                        )}
                    </div>

                    <RunCases apiId={api.id} />
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Endpoint Details */}
                <div className="space-y-4 flex flex-col md:flex-row justify-between items-start md:items-center max-w-4xl">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">URL</label>
                        <div className="mt-1 flex items-center gap-2">
                            <code className="flex-1 bg-muted/50 border rounded-lg px-3 py-2 font-mono text-sm">
                                {api.url}
                            </code>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigator.clipboard.writeText(api.url)}
                            >
                                <CopyIcon className="size-4" />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-muted-foreground">API ID</label>
                        <div className="flex items-center gap-2">
                            <p className="mt-1 font-mono text-sm text-foreground">{api.id}</p>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigator.clipboard.writeText(api.id)}
                            >
                                <CopyIcon className="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Request Configuration */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-lg font-semibold">
                        <SettingsIcon className="size-5" />
                        Request Configuration
                    </div>

                    {api.headers || api.params || api.payload ? (
                        <div className="space-y-4">
                            {api.headers && (
                                <CodeBlock
                                    title="Headers"
                                    content={api.headers}
                                    icon={CodeIcon}
                                />
                            )}

                            {api.params && (
                                <CodeBlock
                                    title="Parameters"
                                    content={api.params}
                                    icon={DatabaseIcon}
                                />
                            )}

                            {api.payload && (
                                <CodeBlock
                                    title="Payload"
                                    content={api.payload}
                                    icon={FileTextIcon}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-6 text-muted-foreground">
                            <SettingsIcon className="size-6 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No additional request configuration defined</p>
                        </div>
                    )}
                </div>

                <Separator />

                {/* Timeline */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-lg font-semibold">
                        <ClockIcon className="size-5" />
                        Timeline
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Created</label>
                            <div className="flex items-center gap-2 text-sm">
                                <ClockIcon className="size-4 text-muted-foreground/70" />
                                <span>{formatTimeAgo(api.created_at)}</span>
                                <span className="text-muted-foreground/50">
                                    ({new Date(api.created_at).toLocaleString()})
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                            <div className="flex items-center gap-2 text-sm">
                                <ClockIcon className="size-4 text-muted-foreground/70" />
                                <span>{formatTimeAgo(api.updated_at)}</span>
                                <span className="text-muted-foreground/50">
                                    ({new Date(api.updated_at).toLocaleString()})
                                </span>
                            </div>
                        </div>
                    </div>

                    {api.created_at !== api.updated_at && (
                        <div className="text-sm text-muted-foreground pt-2">
                            This API was last modified {formatTimeAgo(api.updated_at)}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}