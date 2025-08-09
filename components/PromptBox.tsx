"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { KunjappanMascot } from "@/components/KunjappanMascot";

export function PromptBox() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const posterRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // Floating window drift and playful resistance
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 12, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 120, damping: 12, mass: 0.8 });

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const inside = e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom;
      if (inside) {
        // push away from cursor gently (stubborn uncle)
        const dx = (rect.left + rect.width / 2) - e.clientX;
        const dy = (rect.top + rect.height / 2) - e.clientY;
        const factor = 0.2; // resistance
        x.set(Math.max(-18, Math.min(18, dx * factor)));
        y.set(Math.max(-12, Math.min(12, dy * factor)));
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

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
        <motion.div ref={boxRef} style={{ x: sx, y: sy }} className="floating-window paper-texture p-4 sm:p-6">
          <motion.label
            whileHover={{ rotate: [-1, 1, 0] }}
            transition={{ duration: 0.6 }}
            className="block text-[#1d1510] font-extrabold mb-2"
          >
            Ninga ningade idea ivide adicholi njamma set aaki thera
          </motion.label>
          <motion.textarea
            whileHover={{ x: 4, y: -2 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="w-full min-h-28 rounded-md border-2 border-[#c6a664] bg-white/85 text-[#1d1510] p-3 outline-none focus:ring-4 focus:ring-[#c6a664]/30"
            placeholder="e.g., Minimal tech conference poster"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {/* occasional random nudge */}
          <motion.div
            className="mt-2 text-xs text-[#2a2019]/70"
            animate={{ x: [0, 2, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 6 }}
          >
            Tip: Kunjappan uncle sometimes moves the box. Catch it!
          </motion.div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <motion.button
              whileHover={{ scale: 1.03, x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={generate}
              disabled={loading || !prompt.trim()}
              className="rounded-md border-4 border-[#c6a664] text-[#1d1510] font-extrabold px-4 py-2 bg-[#f7f1e1] hover:bg-[#fff2cf] transition disabled:opacity-50"
            >
              Generate Poster
            </motion.button>
            {loading ? (
              <KunjappanMascot />
            ) : (
              <motion.span className="text-sm text-[#2a2019]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Opposite style guarantee ✅
              </motion.span>
            )}
          </div>
          {error && <p className="mt-3 text-[#7a1f1f]">{error}</p>}
        </motion.div>
      </div>
      <div ref={posterRef} />
    </section>
  );
} 