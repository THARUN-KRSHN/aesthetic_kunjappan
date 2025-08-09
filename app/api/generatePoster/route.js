export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateKunjappanRewrite } from "@/lib/gemini.js";
import { randomRoast } from "@/lib/roastLines.js";

// Rotate through maximalist, chaotic style presets to avoid repetition
const STYLE_PRESETS = [
  "90s wedding invite chaos, neon gradients, glitter confetti, chrome bevel text, gold borders, sticker-bombed with parrots and marigolds, lens flares, drop shadows, busy layout",
  "retro-psychedelic circus poster, clashing complementary colors, loud typographic stack, halftone dots + scanline texture, fireworks, balloons, bananas, umbrellas, disco balls",
  "overloaded festival banner, Malayalam headings, bevel & emboss everything, rainbow outlines, fake 3D extrusions, random clipart collage, multiple vignettes, torn paper edges",
  "Maximalist bazaar aesthetic, plastic flowers, tinsel garlands, glitter strokes, glossy gel buttons, misaligned stickers, sparkles, chaotic layering, overly detailed background",
  "saturated retro-futuristic temple-town mashup, chrome Malayalam glyphs, neon reflections, radial bursts, kaleidoscope patterns, candy colors, dramatic glare and bokeh"
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
      // Graceful fallback to maximalist chaos if Gemini fails
      rewritten = `Maximalist, neon-saturated, gloriously chaotic 90s-uncle poster that aggressively contradicts: ${userPrompt}. Clashing rainbow colors, glitter explosions, lens flares, chrome and gold beveled text, thick drop shadows, sticker-bomb collage (parrots, marigolds, disco balls, balloons, bananas, umbrellas, lightning bolts), mismatched themes stacked together, multiple competing focal points, verbose decorative details, layered textures, radial bursts, kaleidoscope patterns. Absolutely avoid minimalism, subtle palettes, empty whitespace, corporate flatness or restraint.`;
      roast = randomRoast();
    }

    // Build Pollinations prompt with maximalist goals and anti-minimalism signals
    const style = pickNext(STYLE_PRESETS, lastStyleRef);
    const antiMinimal = "avoid minimalism, clean white space, muted pastel-only, corporate flat design, single-subject simplicity, symmetry-only";
    const goals = "maximalist, colorful, chaotic, hyper-detailed, overloaded composition, clashing colors, multiple focal points, glitter, lens flares, chrome text, gold borders, sticker collage, verbose scene description";
    const finalPrompt = `${rewritten} | style: ${style} | ${goals} | ${antiMinimal}`;

    const [w, h] = pickNext(SIZES, lastSizeRef);
    const seed = Math.floor(Math.random() * 1e9);
    const encoded = encodeURIComponent(finalPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=${w}&height=${h}&nologo=true&seed=${seed}`;

    return NextResponse.json({ imageUrl, image: imageUrl, roast }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
} 