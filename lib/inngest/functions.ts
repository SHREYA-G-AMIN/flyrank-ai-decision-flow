import { inngest } from "./client";
import { getAIDecision } from "@/lib/gemini";

export const decisionWorkflow = inngest.createFunction(
  {
    id: "decision-workflow",
    triggers: {
      event: "workflow/decision",
    },
  },
  async ({ event, step }) => {
    const decision = await step.run("ai-decision", async () => {
      return await getAIDecision(event.data.prompt);
    });

    const nextNode = await step.run("follow-branch", async () => {
      return decision === "YES" ? "Support" : "Sales";
    });

    return {
      prompt: event.data.prompt,
      decision,
      nextNode,
    };
  }
);