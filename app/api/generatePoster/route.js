export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateKunjappanRewrite } from "@/lib/gemini.js";
import { randomRoast } from "@/lib/roastLines.js";

// Rotate through diverse style presets to avoid repetition across requests
const STYLE_PRESETS = [
  // Retro-future and graphic
  "retro cyberpunk street scene with Malayalam signboards, neon reflections, cinematic haze, deep contrast, film grain",
  "minimalist bauhaus-inspired poster, bold geometric shapes, limited palette with Kerala-tinged colors, clean negative space, editorial layout",
  "surreal dreamscape with monsoon color grading, floating geometry, painterly textures, subtle Malayalam glyph accents",
  "mid-century modern illustration, textured paper, tropical palette hint, no obvious Kerala iconography, tasteful typographic accents",
  "bold graphic risograph print style, layered textures, halftone dots, contemporary editorial composition, playful mismatch",
  "cinematic portrait or scene with dramatic rim lighting, shallow depth of field, anamorphic bokeh, subtle Malayalam signage in background",
  "brutalist 3D abstract composition, concrete textures, volumetric light, color pop accents inspired by South Indian palettes",
  "photographic street scene with airy grading, soft shadows, modern signage in Malayalam, quiet mood, high-end color science",
];

let lastStyleIndex = -1;
let lastSizeIndex = -1;

const SIZES = [
  [1080, 1350],
  [1350, 1080],
  [1024, 1536],
  [1280, 1280],
];

function pickNext(arr, lastIndexRef) {
  const nextIndex = (lastIndexRef.value + 1) % arr.length;
  lastIndexRef.value = nextIndex;
  return arr[nextIndex];
}

const lastStyleRef = { value: lastStyleIndex };
const lastSizeRef = { value: lastSizeIndex };

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
      // Graceful fallback (avoid clichés and keep it modern/cinematic)
      rewritten = `Modern cinematic poster with surreal or abstract composition, playful mismatch to: ${userPrompt}. Subtle Kerala/South Indian nod only if relevant. Avoid elephants, coconut trees, Kathakali masks, Onam motifs, snake boats, and kitsch.`;
      roast = randomRoast();
    }

    // Build diversified Pollinations prompt with style rotation and strong negative cues
    const style = pickNext(STYLE_PRESETS, lastStyleRef);
    const negativeCliches = "exclude: elephants, coconut trees, Kathakali masks, snake boats, tiger dance, houseboats, onam pookkalam, kitsch, low quality, watermark, text-heavy";
    const goals = "modern, cinematic, high-quality, artistic composition, dramatic lighting, depth, professional color grading, subtle Kerala/South Indian nod only if relevant";
    const finalPrompt = `${rewritten} | style: ${style} | ${goals} | ${negativeCliches}`;

    const [w, h] = pickNext(SIZES, lastSizeRef);
    const seed = Math.floor(Math.random() * 1e9);
    const encoded = encodeURIComponent(finalPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=${w}&height=${h}&nologo=true&seed=${seed}`;

    return NextResponse.json({ imageUrl, image: imageUrl, roast }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
} 