import { BackgroundStyle } from "@/components/effects/background-style";
import { auth } from "@/auth";

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

  // Redirect if no session
  if (!session) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="overflow-hidden">
      <BackgroundStyle />
      <h1 className="text-3xl font-bold text-white">API: {apiId}</h1>
    </div>
  );
}
