import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./api-table-columns";
import { auth } from "@/auth";
import { fetchUserApis } from "@/lib/data";
import { BackgroundStyle } from "@/components/effects/background-style";

export const metadata = {
  title: "All APIs | Trafix",
};

type Props = {};

export default async function page({}: Props) {
  // Authenticate the user and get the session
  const session = await auth();

  // Function to fetch and format customer data
  async function getData() {
    const response = session?.user?._id ? await fetchUserApis() : [];

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
  // console.log("data", data);

  interface ApiData {
    id: string;
    user_id: string;
    name: string;
    method: string;
    url: string;
    headers: string;
    payload: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }

  const sortedData: ApiData[] = data.sort((a: ApiData, b: ApiData) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="overflow-hidden">
      <BackgroundStyle />
      <DataTable
        columns={columns}
        data={sortedData}
        addNewLink="/dashboard/add/"
        addNewText="Add new API"
      />
    </div>
  );
}
