import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { api_id } = await req.json();

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/test-cases/kestra/run?api_id=${api_id}`,
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
