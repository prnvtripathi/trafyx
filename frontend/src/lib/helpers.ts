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
