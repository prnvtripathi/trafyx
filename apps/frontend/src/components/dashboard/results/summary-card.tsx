import { Card, CardContent } from "@/components/ui/card";

export function SummaryCard({
    title,
    value,
    icon: Icon,
    variant = "default"
}: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    variant?: "default" | "success" | "destructive" | "warning";
}) {
    const iconColors = {
        default: "text-primary",
        success: "text-green-600 dark:text-green-400",
        destructive: "text-red-600 dark:text-red-400",
        warning: "text-yellow-600 dark:text-yellow-400"
    };

    return (
        <Card className="transition-all duration-200 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-muted/20">
            <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-muted/50 dark:bg-muted/20 ${iconColors[variant]}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
