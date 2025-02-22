import { NextResponse } from "next/server";
import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

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

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error during Groq request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
