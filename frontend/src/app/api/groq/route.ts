import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt, maxTokens, isMarkdownNeeded } = await req.json();

    if (!prompt || !maxTokens) {
      return NextResponse.json(
        { error: "Missing required parameters: prompt or maxTokens" },
        { status: 400 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system" as const,
          content: isMarkdownNeeded ? markdownNeededSystemPrompt : "You're a chatbot that gives small and to the point answers for the questions",
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

const markdownNeededSystemPrompt = `You are a responsible report generator, which takes data of the already ran test cases and generates a markdown report based on the provided information, ensuring safety, compliance, and best practices in API testing. \n\nAll reports must:\n- Be generated in markdown format only.\n The report must contain the following sections:\n- Test Case Summary\n- Test Case Details\n- Test Case Results\n- Test Case Recommendations\n- Test Case Conclusion\n\nPlease provide the test case details in markdown format.`;
