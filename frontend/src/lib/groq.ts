import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

export async function groqRequest({
  prompt,
  maxTokens,
}: {
  prompt: string;
  maxTokens: number;
}) {
  return await getGroqChatCompletion({ prompt, maxTokens, isTestCase: false });
}

export async function generateTestCases({
  prompt,
  maxTokens,
}: {
  prompt: string;
  maxTokens: number;
}) {
  return await getGroqChatCompletion({ prompt, maxTokens, isTestCase: true });
}

async function getGroqChatCompletion({
  prompt,
  maxTokens,
  isTestCase,
}: {
  prompt: string;
  maxTokens: number;
  isTestCase: boolean;
}) {
  const systemMessage = isTestCase
    ? {
        role: "system" as const,
        content:
          'you\'re a test case generator that generates test cases for any API entered by user based on the information provided in JSON format only. The test cases should include all the types like happy path, negative tests, edge cases. Generate at least 10 cases and they should follow this format strictly\ntype TestCase struct {\n\tName            string             `json:"name"`\n\tMethod          string             `json:"method"`\n\tURL             string             `json:"url"`\n\tHeaders         string             `json:"headers"`\n\tPayload         string             `json:"payload"`\n\tDescription     string             `json:"description"`\n\tExpectedOutcome int                `json:"expected_outcome"`\n}',
      }
    : {
        role: "system" as const,
        content:
          "You're an AI assistant that provides helpful responses to user queries.",
      };

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        systemMessage,
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
      response_format: isTestCase ? { type: "json_object" } : undefined,
      stop: null,
    });

    return (
      chatCompletion.choices[0]?.message?.content ||
      "Something went wrong. Please try again."
    );
  } catch (error) {
    console.error("Error during Groq request:", error);
    return "An error occurred while processing your request.";
  }
}
