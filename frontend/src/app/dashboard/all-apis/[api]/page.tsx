import { BackgroundStyle } from "@/components/effects/background-style";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, parseJSON } from "@/lib/helpers";
import { Separator } from "@/components/ui/separator";
import { getMethodColor } from "@/lib/helpers";
import { GenerateTestCases } from "@/components/generate-test-cases";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, EditIcon, Trash2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./test-case-table-columns";
import { RunTestCases } from "@/components/run-test-cases";
import { toast } from "sonner";
import DeleteButton from "./deleteAPI";
import Link from "next/link";

async function getApi(apiId: string) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/user-apis/${apiId}`
    );
    const api = await response.json();
    return api;
  } catch (error) {
    console.error("Error fetching API:", error);
    return null;
  }
}

// Page component
export default async function Page({ params }: { params: { api: string } }) {
  const formatJSON = (data: any) => {
    try {
      const parsed = typeof data === "string" ? parseJSON(data) : data;
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      return "Invalid JSON";
    }
  };

  const CodeBlock = ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => (
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
            padding: "1.25rem",
            fontSize: "0.875rem",
            backgroundColor: "transparent",
            borderRadius: "0.5rem",
          }}
          wrapLongLines={true}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );

  const apiId = params.api;

  // Authenticate the user and get the session
  const session = await auth();

  const apiData = await getApi(apiId);
  const { user_api, test_cases } = apiData;

  const headers = parseJSON(user_api.Headers);
  const payload = parseJSON(user_api.Payload);

  // Redirect if no session
  if (!session) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="overflow-hidden">
      <BackgroundStyle />
      <div className="md:p-4">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <h1 className="text-2xl font-bold">API Information</h1>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
    <Link href={`/dashboard/test-results/${apiId}`}> <Button variant='outline'> View Previous Results   <ArrowUpRight className="h-3 w-3" /></Button> </Link>

            {test_cases ? (
              <RunTestCases api_id={apiId} />
            ) : (
              <GenerateTestCases api_id={apiId} apiSpec={user_api} />
            )}
            <div className="flex space-x-2">
              {/* Tooltip for Delete Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <DeleteButton apiId={apiId} />
                </TooltipTrigger>
                <TooltipContent className="bg-gray-600 dark:bg-gray-900">
                  <p>Delete API</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
        <Card className="w-full max-w-full mx-auto">
          <CardHeader>
            <CardTitle className="flex justify-between items-center flex-wrap gap-2">
              <span>{user_api.Name}</span>
              <Badge
                variant="outline"
                className={` ${getMethodColor(user_api.Method)}`}
              >
                {user_api.Method}
              </Badge>
            </CardTitle>
            <CardDescription>{user_api.Description}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h3 className="font-semibold">URL</h3>
                <p className="text-xs md:text-base dark:text-gray-300">
                  {user_api.URL}
                </p>
              </div>
              <Separator />
              <CodeBlock title="Headers" content={formatJSON(headers)} />

              <CodeBlock
                title="Payload"
                content={payload === null ? "N/A" : formatJSON(payload)}
              />
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Created At</h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    {formatDate(user_api.CreatedAt)}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Updated At</h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    {formatDate(user_api.UpdatedAt)}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">API ID</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-mono break-all">
                    {user_api.ID}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">User ID</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-mono break-all">
                    {user_api.UserID}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {test_cases ? <DataTable columns={columns} data={test_cases} addNewText='Add custom Test' addNewLink="/test-cases/" /> : null}
      </div>
    </div>
  );
}