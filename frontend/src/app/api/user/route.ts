import { NextResponse } from 'next/server';

interface ApiRequestBody {
    UserID: string;
    name: string;
    method: string;
    url: string;
    headers: string;
    payload: string;
    description: string;
}

export async function POST(request: Request): Promise<Response> {
    try {
        // Extract and parse the request body
        const body: ApiRequestBody = await request.json();

        // Validate required fields
        const { UserID, name, method, url, headers, payload, description } = body;
        if (!UserID || !name || !method || !url || !headers || !payload || !description) {
            return NextResponse.json(
                { error: 'All fields (UserID, name, method, url, headers, payload, description) are required.' },
                { status: 400 }
            );
        }

        // Send POST request to the external API
        const response = await fetch(`${process.env.BACKEND_URL}/api/user-apis`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        // Parse response from the external API
        const responseData = await response.json();

        // Return the response back to the client
        return NextResponse.json(responseData, { status: response.status });
    } catch (error) {
        console.error('Error in POST /api/userApis:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
