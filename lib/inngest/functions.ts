import { inngest } from "./client";

export const testWorkflow = inngest.createFunction(
  { id: "test-workflow", triggers: [{ event: "workflow/test" }] },
  async ({ event, step }) => {
    const result = await step.run("test-step", async () => {
      return {
        message: "Inngest is working!",
        input: event.data,
      };
    });

    return result;
  }
);