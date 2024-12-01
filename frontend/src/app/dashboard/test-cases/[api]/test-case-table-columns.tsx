"use client";

export const columns = [
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
      let headers;
      try {
        headers = JSON.parse(row.original.headers);
      } catch (error) {
        console.error("Invalid JSON in headers:", row.original.headers);
        return <span>Invalid JSON</span>;
      }

      return (
        <ul className="list-none p-0">
          {Object.entries(headers).map(([key, value], index) => (
            <li key={index}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "payload",
    header: "Payload",
    cell: ({ row }: { row: { original: { payload: string } } }) => {
      const rawPayload = row.original.payload;

      if (!rawPayload) {
        // Handle empty string or null/undefined payloads
        return <span>No Payload Provided</span>;
      }

      let payload;
      try {
        payload = JSON.parse(rawPayload);
      } catch (error) {
        console.error("Invalid JSON in payload:", rawPayload);
        return <span>Invalid JSON</span>;
      }

      return (
        <ul className="list-none p-0">
          {Object.entries(payload).map(([key, value], index) => (
            <li key={index}>
              <strong>{key}:</strong> {String(value).slice(0, 100)}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "expected_outcome",
    header: "Expected Outcome",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }: { row: { getValue: (key: string) => any } }) => {
      const date = new Date(row.getValue("created_at"));
      return date.toLocaleString();
    },
  },
];
