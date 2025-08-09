"use client";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-[100svh] flex items-center justify-center wood-texture overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6"
      >
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#1d1510] drop-shadow">
          Aesthetic Kunjappan
        </h1>
        <p className="mt-4 text-lg sm:text-2xl text-[#2a2019]">
          “Njan design cheyyum… pakshe njan style aayirikkum.”
        </p>
      </motion.div>

      {/* Floaters */}
      <Floater className="left-6 top-10" size={80} color="#c6a664" />
      <Floater className="right-10 top-20" size={56} color="#6b8f71" delay={0.2} />
      <Floater className="left-10 bottom-24" size={64} color="#a24d4d" delay={0.4} />
      <Floater className="right-16 bottom-10" size={92} color="#00aaff" delay={0.6} />
    </section>
  );
}

function Floater({ className, size, color, delay = 0 }: { className: string; size: number; color: string; delay?: number }) {
  return (
    <motion.span
      className={`absolute rounded-full opacity-20 ${className}`}
      style={{ width: size, height: size, backgroundColor: color }}
      initial={{ y: 0 }}
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay }}
    />
  );
} 