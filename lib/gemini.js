import { GoogleGenAI } from "@google/genai";

const PLACEHOLDER = (text) =>
  `https://placehold.co/1080x1350/png?text=${encodeURIComponent(text.slice(0, 64))}`;

export async function generateKunjappanRewrite(userPrompt) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("No GEMINI_API_KEY");

  const ai = new GoogleGenAI({ apiKey });

  const system = `You are "Aesthetic Kunjappan", a playful but sharp creative director who believes "more is better" with 90s-uncle energy.
Your job: take any user request and produce a sarcastic, drastically opposite, exaggerated creative direction that will lead to a maximalist, colorful, visually chaotic poster. The result must feel loud, humorous, over-the-top, and proudly kitsch.

STRICT constraints for the visual direction you output in rewritten:
- Similarity: rewritten must share at most ~20% wording and content with the user's text. Invert meaning, style, and tone. Do not copy phrasing.
- Vibe: maximalist, chaotic, overloaded, clashing. 90s print-design excess with the attitude of an uncle who insists on adding everything.
- Mandatory flavor: ultra-saturated neon colors, rainbow gradients, glitter, lens flares everywhere, bevel & emboss, heavy drop shadows, chrome or gold text/borders, sticker-bomb of random objects (parrots, plastic flowers, disco balls, marbles, fireworks, balloons, bananas, umbrellas, lightning bolts), mismatched themes, layered textures, busy layout, multiple competing focal points, verbose detail.
- Avoid: minimalism, cleanliness, subtle palettes, empty whitespace, monochrome, "balanced" symmetry, corporate/flat design, muted/pastel-only looks, single-subject simplicity, restraint.
- Output should read like a rich Pollinations image prompt: long, descriptive, with many visual ingredients and chaotic energy.

Roast tone: short, witty, under 12 words, Manglish allowed, poke fun at design taste or vibe, never disparage culture.

Return STRICT JSON only with keys: {"rewritten":"...","roast":"..."}. No markdown, no commentary.`;

  const contents = `${system}

User request: ${userPrompt}

Return JSON now.`;

  const resp = await ai.models.generateContent({
    model: "gemini-1.5-pro",
    contents,
  });

  // Prefer resp.text when available, otherwise dig into parts
  let text = resp?.text;
  if (!text) {
    const part = resp?.response?.candidates?.[0]?.content?.parts?.[0];
    if (typeof part?.text === "string") text = part.text;
  }
  if (!text || typeof text !== "string") throw new Error("Empty response from Gemini");

  // Strip code fences if present
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  let data;
  try {
    data = JSON.parse(cleaned);
  } catch {
    // Fallback: try to salvage with a naive extraction by braces
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      data = JSON.parse(cleaned.slice(start, end + 1));
    } else {
      throw new Error("Gemini JSON parse failed");
    }
  }

  if (!data || typeof data.rewritten !== "string") throw new Error("Gemini rewrite missing 'rewritten'");
  const roast = typeof data.roast === "string" && data.roast.trim() ? data.roast.trim() : "Enthokkeyo color kittiyal poyi.";
  return { rewritten: data.rewritten.trim(), roast };
}

export async function generatePoster(prompt) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) return PLACEHOLDER("No GEMINI_API_KEY");

    const ai = new GoogleGenAI({ apiKey });

    // 1) Dedicated image-gen preview model via generateImages
    try {
      const resp = await ai.models.generateImages({
        model: "gemini-2.0-flash-preview-image-generation",
        prompt,
        config: { aspectRatio: "3:4", outputMimeType: "image/png" },
      });
      const img = resp?.data?.[0] || resp?.images?.[0];
      if (img?.url) return img.url;
      if (img?.b64Data) return `data:image/png;base64,${img.b64Data}`;
      if (img?.inlineData?.data) return `data:image/png;base64,${img.inlineData.data}`;
    } catch {}

    // 2) Same model via generateContent with IMAGE modality
    try {
      const resp = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: prompt,
        config: { responseModalities: ["IMAGE"] },
      });
      const files = resp?.files || [];
      const fileImage = files.find((f) => f.mediaType?.startsWith?.("image/"));
      if (fileImage?.uri) return fileImage.uri;
      if (fileImage?.data) return `data:${fileImage.mediaType || "image/png"};base64,${fileImage.data}`;
      const part = resp?.response?.candidates?.[0]?.content?.parts?.find?.(
        (p) => p.inlineData && p.inlineData.mimeType?.startsWith?.("image/")
      );
      if (part?.inlineData?.data) return `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
    } catch {}

    // 3) Fallback to 2.5-flash with IMAGE
    try {
      const resp = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { responseModalities: ["IMAGE"] },
      });
      const files = resp?.files || [];
      const fileImage = files.find((f) => f.mediaType?.startsWith?.("image/"));
      if (fileImage?.uri) return fileImage.uri;
      if (fileImage?.data) return `data:${fileImage.mediaType || "image/png"};base64,${fileImage.data}`;
      const part = resp?.response?.candidates?.[0]?.content?.parts?.find?.(
        (p) => p.inlineData && p.inlineData.mimeType?.startsWith?.("image/")
      );
      if (part?.inlineData?.data) return `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
    } catch {}

    // 4) Fallback to 1.5-flash with IMAGE
    try {
      const resp = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: { responseModalities: ["IMAGE"] },
      });
      const files = resp?.files || [];
      const fileImage = files.find((f) => f.mediaType?.startsWith?.("image/"));
      if (fileImage?.uri) return fileImage.uri;
      if (fileImage?.data) return `data:${fileImage.mediaType || "image/png"};base64,${fileImage.data}`;
      const part = resp?.response?.candidates?.[0]?.content?.parts?.find?.(
        (p) => p.inlineData && p.inlineData.mimeType?.startsWith?.("image/")
      );
      if (part?.inlineData?.data) return `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
    } catch {}

    return PLACEHOLDER("Gemini fallback");
  } catch (e) {
    return PLACEHOLDER("Gemini error");
  }
} 