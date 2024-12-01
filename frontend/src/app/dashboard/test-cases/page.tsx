import { fetchUserApis } from "@/lib/data";
import ClientSelect from "./client-select";

export default async function AnalyticsPage() {
  // Fetch and format API data
  async function getData() {
    const response = await fetchUserApis();

    const formattedData = response.map(
      (api: { ID: string; Name: string; Method: string; URL: string }) => ({
        id: api.ID,
        name: api.Name,
        method: api.Method,
        url: api.URL,
      })
    );

    return formattedData;
  }

  // Fetch data
  const data = await getData();

  return (
    <main className="p-6 md:min-w-[800px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Test Cases</h1>
      </div>
      {/* Pass data to the client component */}
      <ClientSelect data={data} />
    </main>
  );
}

export const metadata = {
  title: "Test Cases | Apilux",
};
