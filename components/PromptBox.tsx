"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { KunjappanMascot } from "@/components/KunjappanMascot";

export function PromptBox() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const posterRef = useRef<HTMLDivElement | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generatePoster", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setResult(data);
      window.dispatchEvent(new CustomEvent("kunjappan:poster", { detail: data }));
      setTimeout(() => posterRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="vintage-frame bg-white/70 p-4 sm:p-6">
          <label className="block text-[#1d1510] font-extrabold mb-2">Parayaam: Ningal ente request</label>
          <textarea
            className="w-full min-h-28 rounded-md border-2 border-[#c6a664] bg-white/85 text-[#1d1510] p-3 outline-none focus:ring-4 focus:ring-[#c6a664]/30"
            placeholder="e.g., Minimal tech conference poster"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="mt-4 flex items-center justify-between gap-4">
            <button
              onClick={generate}
              disabled={loading || !prompt.trim()}
              className="rounded-md border-4 border-[#c6a664] text-[#1d1510] font-extrabold px-4 py-2 bg-[#f7f1e1] hover:bg-[#fff2cf] transition disabled:opacity-50"
            >
              Generate Poster
            </button>
            {loading ? (
              <KunjappanMascot />
            ) : (
              <span className="text-sm text-[#2a2019]">Opposite style guarantee ✅</span>
            )}
          </div>
          {error && <p className="mt-3 text-[#7a1f1f]">{error}</p>}
        </div>
      </div>
      <div ref={posterRef} />
    </section>
  );
} 