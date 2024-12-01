import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./api-table-columns";
import { auth } from "@/auth";
import { fetchUserApis } from "@/lib/data";
import { BackgroundStyle } from "@/components/effects/background-style";

export const metadata = {
  title: "All APIs | Apilux",
};

type Props = {};

export default async function page({}: Props) {
  // Authenticate the user and get the session
  const session = await auth();

  // Function to fetch and format customer data
  async function getData() {
    const response = await fetchUserApis("");
    console.log(response, "jo aaya hai");

    const formattedData = response.userApis.map(
      (api: {
        user_id: number;
        name: string;
        method: string;
        url: string;
        headers: string;
        payload: string;
        description: string;
        createdAt: string;
        updatedAt: string;
      }) => ({
        user_id: api.user_id.toString(),
        name: api.name,
        method: api.method,
        url: api.url,
        headers: api.headers,
        payload: api.payload,
        description: api.description,
        createdAt: api.createdAt,
        updatedAt: api.updatedAt,
      })
    );

    return formattedData;
  }

  // Fetch the data
  const data = await getData();
  return (
    <div className="overflow-hidden">
      <BackgroundStyle />
      <DataTable
        columns={columns}
        data={data}
        addNewLink="/dashboard/workspace/add/"
        addNewText="Add new API"
      />
    </div>
  );
}
