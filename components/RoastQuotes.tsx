"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import roastLines from "@/lib/roastLines";

export function RoastQuotes() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-100px" });
  const items = roastLines.slice(0, 4);

  return (
    <section ref={ref} className="relative py-24 sm:py-36">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 opacity-20 bg-[url('/assets/ksrtc.svg')] bg-contain bg-no-repeat bg-left" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 opacity-20 bg-[url('/assets/parotta.svg')] bg-contain bg-no-repeat bg-right" />

      <div className="max-w-3xl mx-auto px-6 text-center">
        {items.map((text: string, idx: number) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="text-2xl sm:text-3xl font-extrabold mb-8 text-[#1d1510]"
          >
            {text}
          </motion.p>
        ))}
      </div>
    </section>
  );
} 