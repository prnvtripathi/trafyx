import { BackgroundStyle } from "@/components/effects/background-style";
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
import { EditIcon, Trash2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./test-case-table-columns";

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
            {test_cases ? (
              <Button>Run Test Cases</Button>
            ) : (
              <GenerateTestCases api_id={apiId} />
            )}
            <div className="flex space-x-2">
              {/* Tooltip for Edit Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <EditIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-600 dark:bg-gray-900">
                  <p>Edit API</p>
                </TooltipContent>
              </Tooltip>

              {/* Tooltip for Delete Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2Icon />
                  </Button>
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
              <div>
                <h3 className="font-semibold">Headers</h3>
                <pre className="text-xs md:text-sm rounded-md overflow-x-auto max-w-full">
                  {JSON.stringify(headers, null, 2)}
                </pre>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold">Payload</h3>
                <pre className="text-xs md:text-sm rounded-md overflow-x-auto max-w-full">
                  {JSON.stringify(payload, null, 2)}
                </pre>
              </div>
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
        {test_cases ? <DataTable columns={columns} data={test_cases} /> : null}
      </div>
    </div>
  );
}
