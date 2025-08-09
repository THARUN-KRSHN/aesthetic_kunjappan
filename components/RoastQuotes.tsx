"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import roastLines from "@/lib/roastLines";

export function RoastQuotes() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-100px" });
  const items = roastLines.slice(0, 4);

  return (
    <section ref={ref} className="relative py-24 sm:py-36 paper-texture">
      {/* Side minimal elements, slower parallax for depth */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-24 opacity-20 bg-[url('/assets/ksrtc.svg')] bg-contain bg-no-repeat bg-left"
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.2 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-24 opacity-20 bg-[url('/assets/parotta.svg')] bg-contain bg-no-repeat bg-right"
        initial={{ x: 30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.2 }}
        transition={{ duration: 0.8 }}
      />

      <div className="max-w-3xl mx-auto px-6 text-center">
        {items.map((text: string, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16, rotate: -1 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="flex justify-center mb-8"
          >
            <div className="speech-bubble text-xl sm:text-2xl font-extrabold">
              {text}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 