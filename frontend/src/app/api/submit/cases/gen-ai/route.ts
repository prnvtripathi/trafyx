import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { test_cases } = await req.json();

  console.log("test_cases", test_cases);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/save/cases/gen-ai`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ test_cases }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating cases:", error);
    return new Response(null, { status: 500 });
  }
}
