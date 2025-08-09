"use client";
import { HeroSection } from "@/components/HeroSection";
import { RoastQuotes } from "@/components/RoastQuotes";
import { PromptBox } from "@/components/PromptBox";
import { PosterDisplay } from "@/components/PosterDisplay";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <RoastQuotes />
      <PromptBox />
      <PosterDisplay />
    </div>
  );
}
