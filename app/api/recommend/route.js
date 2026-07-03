import { NextResponse } from "next/server";

export async function POST(req) {
  const { task } = await req.json();

  if (!task || task.trim().length < 3) {
    return NextResponse.json({ error: "Please describe your task." }, { status: 400 });
  }

  const prompt = `You are an AI tools expert. A user described their task. Recommend 2-3 best AI tools from this list: ChatGPT, Claude, Gemini, Jasper, Copy.ai, Writesonic, Grammarly, Cursor, GitHub Copilot, Codeium, Replit AI, Tabnine, Midjourney, DALL-E, Leonardo AI, Flux, Ideogram, Runway, Pika, Synthesia, HeyGen, Veo, Notion AI, Otter.ai, Fireflies AI, Perplexity.

User task: "${task}"

You MUST respond with ONLY valid JSON, no text before or after, no markdown, no backticks. Use this exact format:
{"recommendations":[{"name":"Tool Name","reason":"Why it fits this task","freeSufficient":true,"planAdvice":"Free plan is enough OR You need Pro ($X/month) because..."}],"summary":"One sentence summary"}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("Gemini error:", err);
    return NextResponse.json({ error: "API error: " + response.status }, { status: 500 });
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");
    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (e) {
    console.error("Parse error:", e, "Raw:", text);
    return NextResponse.json({ error: "Could not parse recommendation." }, { status: 500 });
  }
}
