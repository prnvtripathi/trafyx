import { formatDate, parseJSON } from "@/lib/helpers";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TestResultDetailsProps {
  testCase: any;
  testResult: any;
}

export function TestResultDetails({
  testCase,
  testResult,
}: TestResultDetailsProps) {
  const formatJSON = (data: any) => {
    try {
      const parsed = typeof data === 'string' ? parseJSON(data) : data;
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      return 'Invalid JSON';
    }
  };

  const CodeBlock = ({ title, content }: { title: string; content: string }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-medium text-slate-200">{title}</p>
        <Badge variant="outline" className="text-xs">
          JSON
        </Badge>
      </div>
      <div className="bg-muted/50 rounded-lg overflow-hidden shadow-lg">
        <SyntaxHighlighter 
          language="json" 
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            fontSize: '0.875rem',
            backgroundColor: 'transparent',
            borderRadius: '0.5rem',
          }}
          wrapLongLines={true}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center space-x-2 text-sm">
      <span className="font-medium text-slate-300">{label}:</span>
      <span className="text-slate-200">{value}</span>
    </div>
  );

  return (
    <div className="mt-4 ">
      <CardContent className="space-y-6 p-6">
        {/* Test Case Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-slate-100">
              Test Case Details
            </h4>
            {/* <Badge className="bg-blue-600 hover:bg-blue-700">
              Case #{testCase.id || '001'}
            </Badge> */}
          </div>

          <div className="space-y-4 divide-y divide-slate-700">
            <div className="pb-4">
              <InfoRow 
                label="Created At"
                value={formatDate(testCase.createdat)}
              />
            </div>

            <div className="pt-4 space-y-4">
              <CodeBlock 
                title="Headers"
                content={formatJSON(testCase.headers)}
              />

              <CodeBlock 
                title="Payload"
                content={testCase.payload === "null" ? "N/A" : formatJSON(testCase.payload)}
              />
            </div>
          </div>
        </div>

        {/* Test Result Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-slate-100">
              Test Result Details
            </h4>
            <Badge 
              variant="outline" 
              className="bg-green-600/10 text-green-400 border-green-400/20"
            >
              Completed
            </Badge>
          </div>

          <div className="space-y-4 divide-y divide-slate-700">
            <div className="pb-4 grid grid-cols-2 gap-4">
              <InfoRow 
                label="Executed At"
                value={formatDate(testResult.executed_at)}
              />
              <InfoRow 
                label="Duration"
                value={`${testResult.duration.toFixed(4)} seconds`}
              />
            </div>

            <div className="pt-4">
              <CodeBlock 
                title="Response"
                content={formatJSON(testResult.response)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}