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
import { GenerateTestCases } from "@/components/generate-test-cases";

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

  const apiInfo = await getApi(apiId);

  const headers = parseJSON(apiInfo.Headers);
  const payload = parseJSON(apiInfo.Payload);

  // Redirect if no session
  if (!session) {
    return <div>Please log in to access this page.</div>;
  }

  const getMethodColor = (method: string) => {
    switch (method?.toLowerCase()) {
      case "get":
        return " text-green-500";
      case "post":
        return "text-blue-500";
      case "put":
        return " text-yellow-500";
      case "delete":
        return " text-red-500";
      default:
        return " text-gray-500";
    }
  };

  return (
    <div className="overflow-hidden">
      <BackgroundStyle />
      <div className=" p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">API Information</h1>
          <GenerateTestCases api_id={apiId} />
        </div>
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{apiInfo.Name}</span>
              <Badge
                variant="outline"
                className={` ${getMethodColor(apiInfo.Method)}`}
              >
                {apiInfo.Method}
              </Badge>
            </CardTitle>
            <CardDescription>{apiInfo.Description}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h3 className="font-semibold">URL</h3>
                <p className="text-sm">{apiInfo.URL}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold">Headers</h3>
                <pre className="text-sm rounded-md overflow-x-auto">
                  {JSON.stringify(headers, null, 2)}
                </pre>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold">Payload</h3>
                <pre className="text-sm rounded-md overflow-x-auto">
                  {JSON.stringify(payload, null, 2)}
                </pre>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Created At</h3>
                  <p className="text-sm">{formatDate(apiInfo.CreatedAt)}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Updated At</h3>
                  <p className="text-sm">{formatDate(apiInfo.UpdatedAt)}</p>
                </div>

                <div>
                  <h3 className="font-semibold">API ID</h3>
                  <p className="text-sm font-mono">{apiInfo.ID}</p>
                </div>
                <div>
                  <h3 className="font-semibold">User ID</h3>
                  <p className="text-sm font-mono">{apiInfo.UserID}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
