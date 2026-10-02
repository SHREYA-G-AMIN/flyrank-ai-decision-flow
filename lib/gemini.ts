import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function getAIDecision(prompt: string): Promise<"YES" | "NO"> {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: `Answer the following question with ONLY YES or NO.

Question:
${prompt}`,
  });

  const answer = response.text?.trim().toUpperCase();

  if (answer === "YES") {
    return "YES";
  }

  if (answer === "NO") {
    return "NO";
  }

  throw new Error(`Gemini returned an invalid decision: ${answer}`);
}