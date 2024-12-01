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
      const rawHeaders = row.original.headers;

      if (!rawHeaders) {
        // Handle empty or missing headers
        return <span>No Headers Provided</span>;
      }

      let headers;
      try {
        headers = JSON.parse(rawHeaders);
      } catch (error) {
        console.error("Invalid JSON in headers:", rawHeaders);
        return <span>Invalid JSON</span>;
      }

      if (typeof headers !== "object" || headers === null) {
        // Ensure headers is a valid object
        return <span>Invalid Headers Format</span>;
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
        // Handle empty or missing payloads
        return <span>No Payload Provided</span>;
      }

      let payload;
      try {
        payload = JSON.parse(rawPayload);
      } catch (error) {
        console.error("Invalid JSON in payload:", rawPayload);
        return <span>Invalid JSON</span>;
      }

      if (typeof payload !== "object" || payload === null) {
        // Ensure payload is a valid object
        return <span>Invalid Payload Format</span>;
      }

      return (
        <ul className="list-none p-0">
          {Object.entries(payload).map(([key, value], index) => (
            <li key={index}>
              <strong>{key}:</strong> {String(value)}
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
