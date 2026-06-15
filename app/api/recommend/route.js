import { NextResponse } from "next/server";

export async function POST(req) {
  const { task } = await req.json();

  if (!task || task.trim().length < 5) {
    return NextResponse.json({ error: "Please describe your task." }, { status: 400 });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an AI tools expert. A user described their task below. Recommend the 2-3 best AI tools for this task from this list: ChatGPT, Claude, Gemini, Jasper, Copy.ai, Writesonic, Grammarly, Cursor, GitHub Copilot, Codeium, Replit AI, Tabnine, Midjourney, DALL·E, Leonardo AI, Flux, Ideogram, Runway, Pika, Synthesia, HeyGen, Veo, Notion AI, Otter.ai, Fireflies AI, Perplexity.

For each tool say:
1. Why it fits this task
2. Whether the free plan is enough or they need paid (and which tier)

User task: "${task}"

Respond in JSON only, no markdown, no explanation outside JSON. Format:
{
  "recommendations": [
    {
      "name": "Tool name",
      "reason": "Why it fits",
      "freeSufficient": true or false,
      "planAdvice": "Free plan is enough / You need Pro ($X/month) because..."
    }
  ],
  "summary": "One sentence summary of the recommendation"
}`,
        },
      ],
    }),
  });

  const data = await response.json();
  const text = data.content?.[0]?.text || "";

  try {
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Could not parse recommendation." }, { status: 500 });
  }
}
