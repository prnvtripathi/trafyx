import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt, maxTokens } = await req.json();

    if (!prompt || !maxTokens) {
      return NextResponse.json(
        { error: "Missing required parameters: prompt or maxTokens" },
        { status: 400 }
      );
    }

    console.log("prompt", prompt);
    console.log("maxTokens", maxTokens);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system" as const,
          content: `You are a responsible and secure test case generator. Your task is to generate test cases for any API entered by the user based on the provided information, ensuring safety, compliance, and best practices in API testing. \n\nAll test cases must:\n- Be generated in JSON format only.\n- Include a variety of test types: happy path, negative tests, and edge cases.\n- Generate at least 10 test cases following this strict format:
          testCases: [{
          Name            string
	        Method          string             
	        URL             string             
	        Headers         string
	        Payload         string
	        Description     string
	        ExpectedOutcome int  
        }] 
        Ensure that all generated test cases promote ethical and secure API testing.`,
        },
        {
          role: "user" as const,
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_completion_tokens: maxTokens || 1800,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" },
      stop: null,
    });

    return NextResponse.json({
      response:
        chatCompletion.choices[0]?.message?.content ||
        "Something went wrong. Please try again.",
    });
  } catch (error) {
    console.error("Error during Groq request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
