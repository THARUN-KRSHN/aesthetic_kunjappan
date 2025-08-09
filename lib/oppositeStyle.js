export function convertToOpposite(userPrompt) {
  const text = String(userPrompt || "").toLowerCase();

  const alwaysCues = [
    "Kathakali",
    "temple elephant",
    "political flags",
    "KSRTC bus",
    "Onam pookkalam",
    "coconut trees",
  ];

  const mappings = [
    {
      match: /(minimal|clean|simple)/,
      out:
        "Overloaded Kerala festival banner with neon colors, heavy gold borders, misaligned stickers, bold Malayalam headings, and too many decorations",
    },
    {
      match: /(pastel|soft|muted|elegant)/,
      out:
        "Neon clashing, loud, childish festival poster with comic fonts, glitter effects, gold borders, busy layout, and over-the-top elements",
    },
    {
      match: /(elegant|luxury|premium)/,
      out:
        "Childish, loud, over-the-top Kerala banner with Comic Sans vibes, random stickers, and garish neon palette",
    },
    {
      match: /(tech|corporate|conference|professional|startup)/,
      out:
        "Kerala temple festival poster with cultural icons, gold borders, political banners, loud sponsor logos, and Malayalam title",
    },
  ];

  for (const m of mappings) {
    if (m.match.test(text)) {
      return `${m.out}. Include ${alwaysCues.join(", ")}.`;
    }
  }

  return `Kerala vintage chaos with gold accents, Malayalam title, Comic Sans subtext, random stickers, and misalignment. Include ${alwaysCues.join(", ")}.`;
} 