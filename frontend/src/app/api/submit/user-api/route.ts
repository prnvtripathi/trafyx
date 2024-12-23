import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, method, url, headers, payload, description, user_id } =
    await req.json();

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/user-apis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        method,
        url,
        headers,
        payload,
        description,
        UserID: user_id,
      }),
    });
    const responseData = await response.json();
    return NextResponse.json(responseData, { status: response.status });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
