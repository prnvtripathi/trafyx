export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

export function parseJSON(jsonString: string): object {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return {};
  }
}

export const getMethodColor = (method: string) => {
  switch (method?.toLowerCase()) {
    case "get":
      return " text-green-500";
    case "post":
      return " text-blue-500";
    case "put":
      return " text-yellow-500";
    case "delete":
      return " text-red-500";
    default:
      return " text-gray-500";
  }
};
