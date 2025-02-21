import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const api_id = searchParams.get("api_id");
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/user-apis/${api_id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating cases:", error);
    return new Response(null, { status: 500 });
  }
}
