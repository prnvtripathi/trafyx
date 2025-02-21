"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMethodColor } from "@/lib/helpers";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "method",
  //   header: "Method",
  //   cell: ({ row }: { row: { original: { method: string } } }) => {
  //     return (
  //       <Badge
  //         variant={"outline"}
  //         className={`text-blue-500 text-xs font-semibold rounded-full px-2 py-1 ${getMethodColor(
  //           row.original.method.toLowerCase()
  //         )}`}
  //       >
  //         {row.original.method}
  //       </Badge>
  //     );
  //   },
  // },
  {
    accessorKey: "url",
    header: "URL",
  },
  //   {
  //     accessorKey: "headers",
  //     header: "Headers",
  //     cell: ({ row }: { row: { original: { headers: string } } }) => {
  //       const rawHeaders = row.original.headers;

  //       if (!rawHeaders) {
  //         // Handle empty or missing headers
  //         return <span>No Headers Provided</span>;
  //       }

  //       let headers;
  //       try {
  //         headers = JSON.parse(rawHeaders);
  //       } catch (error) {
  //         console.error("Invalid JSON in headers:", rawHeaders);
  //         return <span>Invalid JSON</span>;
  //       }

  //       if (typeof headers !== "object" || headers === null) {
  //         // Ensure headers is a valid object
  //         return <span>Invalid Headers Format</span>;
  //       }

  //       return (
  //         <ul className="list-none p-0">
  //           {Object.entries(headers).map(([key, value], index) => (
  //             <li key={index}>
  //               <strong>{key}:</strong> {String(value)}
  //             </li>
  //           ))}
  //         </ul>
  //       );
  //     },
  //   },
  //   {
  //     accessorKey: "payload",
  //     header: "Payload",
  //     cell: ({ row }: { row: { original: { payload: string } } }) => {
  //       const rawPayload = row.original.payload;

  //       if (!rawPayload) {
  //         // Handle empty or missing payloads
  //         return <span>No Payload Provided</span>;
  //       }

  //       let payload;
  //       try {
  //         payload = JSON.parse(rawPayload);
  //       } catch (error) {
  //         console.error("Invalid JSON in payload:", rawPayload);
  //         return <span>Invalid JSON</span>;
  //       }

  //       if (typeof payload !== "object" || payload === null) {
  //         // Ensure payload is a valid object
  //         return <span>Invalid Payload Format</span>;
  //       }

  //       return (
  //         <ul className="list-none p-0">
  //           {Object.entries(payload).map(([key, value], index) => (
  //             <li key={index}>
  //               <strong>{key}:</strong> {String(value)}
  //             </li>
  //           ))}
  //         </ul>
  //       );
  //     },
  {
    accessorKey: "expected_outcome",
    header: "Expected Outcome",
    cell: ({ row }: { row: { original: { expected_outcome: number } } }) => {
      const outcome = row.original.expected_outcome;
      let colorClass = "";

      if (outcome >= 200 && outcome < 300) {
        colorClass = "text-green-500";
      } else if (outcome >= 400 && outcome < 500) {
        colorClass = "text-yellow-500";
      } else if (outcome >= 500) {
        colorClass = "text-red-500";
      }

      return <Badge variant='outline' className={`font-semibold ${colorClass} mx-auto`}>{outcome}</Badge>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }: { row: { getValue: (key: string) => any } }) => {
      const date = new Date(row.getValue("created_at"));
      return date.toLocaleString();
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }: { row: { original: { id: string } } }) => {
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
            <Link href={`/dashboard/all-apis/${row.original.id}`}>
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
