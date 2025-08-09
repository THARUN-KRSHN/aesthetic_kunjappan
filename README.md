# Aesthetic Kunjappan

Sarcastic Kerala-rooted poster generator built with Next.js App Router. It behaves like an old Kerala uncle who ignores your request and creates the complete opposite style, with his own genius ideas.

## Tech Stack
- Next.js (App Router)
- TailwindCSS v4
- Framer Motion
- HTML5 Canvas (node-canvas on API route)
- Fonts: Noto Sans Malayalam + Comic Sans fallback
- Google Gemini API (optional for base background)
- Hosting: Vercel

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` in `kunjappan/` and add:
   ```bash
   GEMINI_API_KEY=your_key_here
   ```
   The app works without this (uses generated canvas only), but you can wire Gemini when available.
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000`.

### Windows local dev note (canvas)
The API uses `canvas` at runtime. If local installation fails on Windows, you can still run the UI; the API will work in hosted Linux environments (e.g., Vercel). To install locally, ensure:
- Node.js 18+
- Python 3
- Visual Studio Build Tools (Desktop development with C++)

## Project Structure
- `app/`
  - `page.tsx`: Single-page layout composing sections
  - `api/generatePoster/route.ts`: API for opposite-style generation and canvas overlay
- `components/`
  - `HeroSection.tsx`, `RoastQuotes.tsx`, `PromptBox.tsx`, `PosterDisplay.tsx`, `KunjappanMascot.tsx`
- `lib/`
  - `oppositeStyle.ts`: style inversion mapping
  - `roastLines.ts`: roast lines and randomizer
- `public/assets/`: Kerala-themed stickers (add `coconut.svg`, `ksrtc.svg`, `parotta.svg`, `elephant.svg`, etc.)

## How it Works
1. User enters prompt → POST `/api/generatePoster`.
2. Backend maps to opposite style, crafts a sarcastic prompt, optionally calls Gemini.
3. Canvas overlays Kerala chaos: misaligned stickers, gold borders, Malayalam heading, roast speech bubble.
4. Returns a data URL image and roast text to the frontend.

## Environment
- `GEMINI_API_KEY` (optional)

## Deployment (Vercel)
- Push to a Git repo and import in Vercel.
- Ensure `GEMINI_API_KEY` is set in Project → Settings → Environment Variables.
- API route runs on Node.js runtime.

## Notes
- Replace placeholder SVGs in `public/assets` with real Kerala-themed art.
- For a richer base image, replace the Gemini stub with an actual image generation call when available.
