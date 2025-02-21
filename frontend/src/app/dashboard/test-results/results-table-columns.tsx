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
import { View } from "lucide-react";
import Link from "next/link";
import { getMethodColor } from "@/lib/helpers";
import { Badge } from "@/components/ui/badge";

// Define the columns for the customer table
export const columns = [
  {
    accessorKey: "View",
    header: "View",
    cell: ({ row }: { row: { original: { id: string } } }) => {
      return (
        <Button variant="ghost" asChild>
          <Link href={`/dashboard/test-results/${row.original.id}`}>View Results <View className="h-4 w-4 ml-2"/> </Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }: { row: { original: { method: string } } }) => {
      return (
        <Badge
          variant={"outline"}
          className={`text-xs font-semibold rounded-full px-2 py-1 ${getMethodColor(
            row.original.method.toLowerCase()
          )}`}
        >
          {row.original.method}
        </Badge>
      );
    },
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  // {
  //   accessorKey: "headers",
  //   header: "Headers",
  //   cell: ({ row }: { row: { original: { headers: string } } }) => {
  //     let headers;
  //     try {
  //       headers = JSON.parse(row.original.headers);
  //     } catch (error) {
  //       console.error("Invalid JSON in headers:", row.original.headers);
  //       return <span>Invalid JSON</span>;
  //     }

  //     return (
  //       <ul className="list-none p-0">
  //         {Object.entries(headers).map(([key, value], index) => (
  //           <li key={index}>
  //             <strong>{key}:</strong> {String(value)}
  //           </li>
  //         ))}
  //       </ul>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "payload",
  //   header: "Payload",
  //   cell: ({ row }: { row: { original: { payload: string } } }) => {
  //     const rawPayload = row.original.payload;

  //     if (!rawPayload) {
  //       // Handle empty string or null/undefined payloads
  //       return <span>No Payload Provided</span>;
  //     }

  //     let payload;
  //     try {
  //       payload = JSON.parse(rawPayload);
  //     } catch (error) {
  //       console.error("Invalid JSON in payload:", rawPayload);
  //       return <span>Invalid JSON</span>;
  //     }

  //     return (
  //       <ul className="list-none p-0">
  //         {Object.entries(payload).map(([key, value], index) => (
  //           <li key={index}>
  //             <strong>{key}:</strong> {String(value)}
  //           </li>
  //         ))}
  //       </ul>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
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
  // {
  //   accessorKey: "updatedAt",
  //   header: "Updated At",
  //   cell: ({ row }: { row: { getValue: (key: string) => any } }) => {
  //     const date = new Date(row.getValue("updatedAt"));
  //     const formattedDate = `${date.getDate()}-${
  //       date.getMonth() + 1
  //     }-${date.getFullYear()}`;
  //     const formattedTime = date.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });

  //     return (
  //       <div>
  //         {formattedDate} {formattedTime}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   header: "Actions",
  //   cell: ({ row }: { row: { original: { id: string } } }) => {
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <Link href={`/dashboard/all-apis/${row.original.id}`}>
  //             <DropdownMenuItem>
  //               <EditIcon className="mr-2 size-4" />
  //               Edit API
  //             </DropdownMenuItem>
  //           </Link>

  //           <DropdownMenuItem>
  //             <Trash2Icon className="mr-2 size-4" /> Delete API
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
