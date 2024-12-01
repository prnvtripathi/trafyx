import { formatDate, parseJSON } from "@/lib/helpers";

interface TestResultDetailsProps {
  testCase: any;
  testResult: any;
}

export function TestResultDetails({
  testCase,
  testResult,
}: TestResultDetailsProps) {
  return (
    <div className="mt-4 space-y-2 text-sm">
      <h4 className="font-semibold">Test Case Details:</h4>
      <p>
        <strong>Created At:</strong> {formatDate(testCase.createdat)}
      </p>
      <p>
        <strong>Headers:</strong>
      </p>
      <pre className="bg-muted p-2 rounded-md overflow-x-auto">
        {JSON.stringify(parseJSON(testCase.headers), null, 2)}
      </pre>
      <p>
        <strong>Payload:</strong>
      </p>
      <pre className="bg-muted p-2 rounded-md overflow-x-auto">
        {testCase.payload === "null"
          ? "N/A"
          : JSON.stringify(parseJSON(testCase.payload), null, 2)}
      </pre>
      <h4 className="font-semibold mt-4">Test Result Details:</h4>
      <p>
        <strong>Executed At:</strong> {formatDate(testResult.executed_at)}
      </p>
      <p>
        <strong>Duration:</strong> {testResult.duration.toFixed(4)} seconds
      </p>
      <p>
        <strong>Response:</strong>
      </p>
      <pre className="bg-muted p-2 rounded-md overflow-x-auto">
        {JSON.stringify(parseJSON(testResult.response), null, 2)}
      </pre>
    </div>
  );
}
