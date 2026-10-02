export function getDecision(prompt: string): "YES" | "NO" {
  const lowerPrompt = prompt.toLowerCase();

  if (
    lowerPrompt.includes("support") ||
    lowerPrompt.includes("refund")
  ) {
    return "YES";
  }

  return "NO";
}