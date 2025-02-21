import { TestCaseItem } from "./test-case-items";

interface TestCaseListProps {
  testResults: any[];
}

export function TestCaseList({ testResults }: TestCaseListProps) {
  return (
    <div className="space-y-4">
     
      {testResults.map((result, index) => (
        <TestCaseItem
          key={index}
          testCase={result.test_case}
          testResult={result.test_results_data}
        />
      ))}
    </div>
  );
}
