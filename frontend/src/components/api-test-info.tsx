import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestCaseList } from "./test-case-list";
import { formatDate } from "@/lib/helpers";

interface ApiTestInfoProps {
  apiInfo: {
    api_id: string;
    test_cases: number;
    test_results: any[];
  };
}

export function ApiTestInfo({ apiInfo }: ApiTestInfoProps) {
  const passedTests = apiInfo.test_results.filter(
    (result) => result.test_results_data.test_result
  ).length;
  const failedTests = apiInfo.test_results.length - passedTests;

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>API Test Results</span>
            <Badge
              variant={
                passedTests === apiInfo.test_results.length
                  ? "default"
                  : "destructive"
              }
            >
              {passedTests}/{apiInfo.test_results.length} Passed
            </Badge>
          </CardTitle>
          <CardDescription>
            API ID: {apiInfo.api_id} | Total Test Cases: {apiInfo.test_cases}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Passed Tests</h3>
                <p className="text-2xl font-bold text-green-600">
                  {passedTests}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Failed Tests</h3>
                <p className="text-2xl font-bold text-red-600">{failedTests}</p>
              </div>
            </div>
            <TestCaseList testResults={apiInfo.test_results} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
