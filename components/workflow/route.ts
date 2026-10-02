import { NextResponse } from "next/server";
import { inngest } from "@/lib/inngest/client";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    await inngest.send({
      name: "workflow/decision",
      data: {
        prompt,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Workflow triggered",
    });
  } catch (error) {
    console.error("WORKFLOW ERROR:", error);

    return NextResponse.json(
      { error: "Failed to trigger workflow" },
      { status: 500 }
    );
  }
}