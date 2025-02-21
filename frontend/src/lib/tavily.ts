import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.NEXT_PUBLIC_TAVILY_API_KEY });

export default async function getTavilyResponse({ prompt }: { prompt: string }) {
  try {
    const response = await tvly.search(prompt, {
      maxResults: 1,
      include_domains: [
        "coursera.org",
        "khanacademy.org",
        "freecodecamp.org",
        "w3schools.com",
        "developer.mozilla.org",
        "docs.microsoft.com",
        "tutorialspoint.com",
        "geeksforgeeks.org",
        "youtube.com",
        "medium.com",
        "udemy.com",
        "udacity.com",
      ],
    });

    return response;
  } catch (error) {
    console.error("Error fetching Tavily response:", error);
    throw error;
  }
}
