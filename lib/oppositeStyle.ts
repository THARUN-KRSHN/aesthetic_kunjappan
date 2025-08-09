export type InvertedStyle = {
  title: string;
  description: string;
  palette: string[];
  cues: string[];
};

const opposites: Array<{ match: RegExp; produce: () => InvertedStyle }> = [
  {
    match: /minimal|clean|simple/i,
    produce: () => ({
      title: "Overloaded, Festival-Mode Chaos",
      description:
        "Neon colors, too many borders, heavy drop shadows, misaligned stickers, confetti of assets.",
      palette: ["#c6a664", "#00ff85", "#ff0066", "#00aaff", "#a24d4d"],
      cues: ["kathakali", "pookkalam", "political flags", "elephants", "ksrtc"],
    }),
  },
  {
    match: /pastel|soft|elegant|muted/i,
    produce: () => ({
      title: "Neon, Loud, Messy",
      description: "Clashing neon palette, bold strokes, dense textures, sparkle effects.",
      palette: ["#39ff14", "#ff2079", "#00b3ff", "#ffd700", "#ff7f11"],
      cues: ["gold borders", "temple lamps", "festival arches", "banana leaves"],
    }),
  },
  {
    match: /corporate|tech|conference|professional/i,
    produce: () => ({
      title: "Cultural Overdose",
      description:
        "Kerala festival banner energy with random food icons, big Malayalam headings, and sponsor logos.",
      palette: ["#c6a664", "#a24d4d", "#006a4e", "#1f7a8c", "#ff0066"],
      cues: ["toddy shop board", "parotta", "coconut", "elephant caparison"],
    }),
  },
];

export function getOppositeStyle(userPrompt: string): InvertedStyle {
  for (const r of opposites) {
    if (r.match.test(userPrompt)) return r.produce();
  }
  return {
    title: "Kerala Vintage Chaos",
    description:
      "Gold accents, wooden textures, Malayalam title, Comic Sans subtext, random stickers, and misalignment.",
    palette: ["#c6a664", "#a24d4d", "#6b8f71", "#3b2a1a", "#00aaff"],
    cues: ["kathakali", "ksrtc", "pookkalam", "coconut", "political flags"],
  };
} 