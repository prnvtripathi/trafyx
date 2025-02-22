import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "@/app/dashboard/test-results/results-table-columns";
import { auth } from "@/auth";
import { fetchUserApis } from "@/lib/data";
import { BackgroundStyle } from "@/components/effects/background-style";
import Stats from "@/components/stats";

export const metadata = {
  title: "View Test Results | Trafix",
};

type Props = {};

export default async function page({}: Props) {
  // Authenticate the user and get the session
  const session = await auth();

  // Function to fetch and format customer data
  async function getData() {
    const response = session?.user?.id ? await fetchUserApis() : [];

    const formattedData = response.map(
      (api: {
        ID: string;
        UserID: string;
        Name: string;
        Method: string;
        URL: string;
        Headers: string;
        Payload: string;
        Description: string;
        CreatedAt: string;
        UpdatedAt: string;
      }) => ({
        id: api.ID,
        user_id: api.UserID,
        name: api.Name,
        method: api.Method,
        url: api.URL,
        headers: api.Headers,
        payload: api.Payload,
        description: api.Description,
        createdAt: api.CreatedAt,
        updatedAt: api.UpdatedAt,
      })
    );

    return formattedData;
  }

  // Fetch the data
  const data = await getData();

  const user = session?.user;
  const user_id = user?.id;
  return (
    <div className="overflow-hidden">
      <BackgroundStyle />
      <DataTable columns={columns} data={data} />
      {user_id && <Stats userId={user_id} />}
    </div>
  );
}
