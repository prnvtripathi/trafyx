import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, method, rate, duration } = body;

    const response = await fetch(`${process.env.BACKEND_URL}/api/load-test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, method, rate, duration }),
    });

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error during Groq request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
