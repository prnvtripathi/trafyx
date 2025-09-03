import { UserAPI } from "@/types/api.type";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ClockIcon,
    ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";
import { formatTimeAgo } from "@/lib/utils";
import EditAPIButton from "./api/edit-button";
import DeleteAPIButton from "./api/delete-button";

const methodColors = {
    GET: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/50 dark:text-emerald-200 dark:border-emerald-700 shadow-emerald-200/20 dark:shadow-emerald-900/20",
    POST: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-700 shadow-blue-200/20 dark:shadow-blue-900/20",
    PUT: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/50 dark:text-amber-200 dark:border-amber-700 shadow-amber-200/20 dark:shadow-amber-900/20",
    DELETE: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-200 dark:border-red-700 shadow-red-200/20 dark:shadow-red-900/20",
    PATCH: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-700 shadow-purple-200/20 dark:shadow-purple-900/20",
};

export default function APICard({ api }: { api: UserAPI; }) {
    return (
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-1 border-border/50 bg-gradient-to-br from-card via-card to-muted/20 hover:from-card hover:via-accent/30 hover:to-muted/30 flex flex-col gap-1">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muted/10 pointer-events-none" />

            <CardHeader className="">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                            <Badge
                                variant="outline"
                                className={`px-2.5 py-1 text-xs font-semibold tracking-wide shadow-sm ${methodColors[api.method]}`}
                            >
                                {api.method}
                            </Badge>
                            <Link
                                href={`/dashboard/apis/${api.id}`}
                                className="group/link block"
                            >
                                <CardTitle className="text-lg font-semibold text-foreground group-hover/link:text-primary transition-colors duration-200 line-clamp-1">
                                    {api.name}
                                </CardTitle>
                            </Link>
                        </div>

                        <div className="flex items-center gap-2">
                            <CardDescription className="font-mono text-sm bg-muted/50 px-2 py-1 rounded-md border text-muted-foreground/80 line-clamp-1">
                                {api.url}
                            </CardDescription>
                            <Link href={api.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLinkIcon className="size-3 text-muted-foreground/50 flex-shrink-0 hover:text-muted-foreground transition-colors" />
                            </Link>
                        </div>
                    </div>

                    <CardAction className="flex items-center gap-2">
                        <EditAPIButton api={api} variant="icon" className="opacity-0 group-hover:opacity-100 transition-all duration-200" />
                        <DeleteAPIButton api={api} variant="icon" className="opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    </CardAction>
                </div>
            </CardHeader>
            <CardFooter className="">
                <div className="flex items-center justify-between w-full text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground/70 bg-muted/20 px-2 py-1 rounded-md">
                        <ClockIcon className="size-3" />
                        <span>Updated {formatTimeAgo(api.updated_at)}</span>
                    </div>
                    {api.created_at !== api.updated_at && (
                        <div className="text-muted-foreground/50 px-2 py-1">
                            <span>Created {formatTimeAgo(api.created_at)}</span>
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}