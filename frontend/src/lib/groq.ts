import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function groqRequest({
  prompt,
  maxTokens,
}: {
  prompt: string;
  maxTokens: number;
}) {
  const chatCompletion = await getGroqChatCompletion({ prompt, maxTokens });
  // Print the completion returned by the LLM.
  return (
    chatCompletion.choices[0]?.message?.content ||
    "Apologies, I don't have an answer for that."
  );
}

async function getGroqChatCompletion({
  prompt,
  maxTokens,
}: {
  prompt: string;
  maxTokens: number;
}) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    max_completion_tokens: maxTokens,
  });
}
