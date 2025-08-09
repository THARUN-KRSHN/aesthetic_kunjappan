export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateKunjappanRewrite } from "@/lib/gemini.js";
import { randomRoast } from "@/lib/roastLines.js";

export async function POST(req) {
  try {
    const body = await req.json();
    const userPrompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    if (!userPrompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    let rewritten, roast;
    try {
      const out = await generateKunjappanRewrite(userPrompt);
      rewritten = out.rewritten;
      roast = out.roast;
    } catch (e) {
      // Graceful fallback
      rewritten = `Chaotic Kerala festival poster with neon colors, gold borders, elephants, Kathakali, banana leaves, toddy shop boards, political slogans, bus art, and Malayalam text. Opposite of: ${userPrompt}`;
      roast = randomRoast();
    }

    const encoded = encodeURIComponent(rewritten);
    const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1024`;

    return NextResponse.json({ imageUrl, image: imageUrl, roast }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
} 