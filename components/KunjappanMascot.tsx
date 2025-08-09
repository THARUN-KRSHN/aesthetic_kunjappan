"use client";
import { motion } from "framer-motion";

export function KunjappanMascot({ text = "Njan oru idea parayam…" }: { text?: string }) {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        className="w-14 h-14 rounded-full bg-[#c6a664] flex items-center justify-center text-[#3b2a1a] font-bold"
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        🙄
      </motion.div>
      <div className="bg-white/80 border border-[#c6a664] rounded-lg px-3 py-2 text-sm text-[#3b2a1a]">
        {text}
      </div>
    </div>
  );
} 