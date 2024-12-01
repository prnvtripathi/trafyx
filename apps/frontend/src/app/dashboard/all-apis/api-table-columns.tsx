"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Trash2Icon, EditIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
//  import { deleteCustomer } from "@/app/lib/actions";

// Define the columns for the customer table
export const columns = [
  {
    accessorKey: "user_id",
    header: "User ID",
    cell: ({ row }: { row: { original: { user_id: string } } }) => {
      return <span>{row.original.user_id}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "headers",
    header: "Headers",
    cell: ({ row }: { row: { original: { headers: string } } }) => {
      return <pre>{JSON.stringify(row.original.headers, null, 2)}</pre>;
    },
  },
  {
    accessorKey: "payload",
    header: "Payload",
    cell: ({ row }: { row: { original: { payload: string } } }) => {
      return <pre>{JSON.stringify(row.original.payload, null, 2)}</pre>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }: { row: { getValue: (key: string) => any } }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div>
          {formattedDate} {formattedTime}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }: { row: { getValue: (key: string) => any } }) => {
      const date = new Date(row.getValue("updatedAt"));
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div>
          {formattedDate} {formattedTime}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }: { row: { original: { user_id: string } } }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/workspace/${row.original.user_id}`}>
              <DropdownMenuItem>
                <EditIcon className="mr-2 size-4" />
                Edit API
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem>
              <Trash2Icon className="mr-2 size-4" /> Delete API
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
