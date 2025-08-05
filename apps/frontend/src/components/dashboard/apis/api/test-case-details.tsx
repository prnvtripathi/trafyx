import { TestCase } from "@/types/test-case.type";
import { Button } from "@/components/ui/button";
import { useGenerateTestCases } from "@/hooks/use-test-cases";
import Loader from "@/components/ui/loader";
import TestCaseCard from "./test-case-card";
import { AddTestCaseButton } from "./test-case-actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TestCaseDetails({
    testCases,
    apiId,
}: {
    testCases?: TestCase[] | undefined;
    apiId: string | undefined,
}) {

    const { generateTestCases, isGenerating, error } = useGenerateTestCases();

    const handleGenerateTestCases = async () => {
        try {
            if (!apiId) {
                console.error("API ID is required to generate test cases.");
                return;
            }
            await generateTestCases({ api_id: apiId, created_by: "go" });
        } catch (error) {
            console.error("Error generating test cases:", error);
        }
    };

    if (!testCases && apiId) {
        return (
            <Card className="mt-5">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-primary-foreground">Generate Test Cases</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Looks like there are no test cases for this API. Click the button to generate them.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleGenerateTestCases} className="mt-2">
                        Generate Test Cases
                    </Button>
                </CardContent>
            </Card>

        );
    }

    if (isGenerating) {
        return (
            <Card className="mt-5">
                <Loader size={36} />
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="mt-5">
                <CardContent>
                    <div className="text-red-500">Error generating test cases: {error?.message || "Unknown error"}</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mt-5">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-primary-foreground">Test Cases</CardTitle>
                    {apiId && <AddTestCaseButton apiId={apiId} />}
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {testCases?.map((testCase) => (
                        <TestCaseCard key={testCase._id} testCase={testCase} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}