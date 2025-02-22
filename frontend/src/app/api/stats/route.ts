import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/user-stats?user_id=${user_id}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting stats:", error);
    return new Response(null, { status: 500 });
  }
}
