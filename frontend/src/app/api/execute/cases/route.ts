import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { api_id } = await req.json();

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/test-cases/run?api_id=${api_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating cases:", error);
    return new Response(null, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const api_id = searchParams.get("api_id");
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/test-results?api_id=${api_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating cases:", error);
    return new Response(null, { status: 500 });
  }
}
