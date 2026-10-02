import { NextResponse } from "next/server";
import { getAIDecision } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const decision = await getAIDecision(prompt);

    return NextResponse.json({ decision });
  } catch (error) {
    console.error("GEMINI ERROR:", error);

    return NextResponse.json(
      { error: "Failed to get AI decision" },
      { status: 500 }
    );
  }
}