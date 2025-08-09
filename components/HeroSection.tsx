"use client";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import KunjappanStory from "@/components/KunjappanStory";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxLeft = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const parallaxRight = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotate = useTransform(mouseX, [0, 1], [-2, 2]);
  const scale = useTransform(mouseY, [0, 1], [1, 1.02]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} className="relative h-[100svh] flex items-center justify-center wood-texture overflow-hidden paper-texture">
      {/* Side subtle Kerala-inspired outlines */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 opacity-30"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ y: parallaxLeft, backgroundImage: "url('/assets/ksrtc.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "left center", backgroundSize: "contain" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 opacity-30"
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ y: parallaxRight, backgroundImage: "url('/assets/parotta.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "right center", backgroundSize: "contain" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center px-6 floating-window paper-texture px-6 py-4"
        style={{ perspective: 1000 }}
      >
        <motion.h1
          style={{ rotateZ: rotate, scale }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#1d1510] drop-shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ x: 6 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Aesthetic Kunjappan
        </motion.h1>
        <motion.p
          className="mt-4 text-lg sm:text-2xl text-[#2a2019]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          “Njan design cheyyum… pakshe njan style aayirikkum.”
        </motion.p>
      </motion.div>

      {/* Floaters */}
      <Floater className="left-6 top-10" size={80} color="#c6a664" />
      <Floater className="right-10 top-20" size={56} color="#6b8f71" delay={0.2} />
      <Floater className="left-10 bottom-24" size={64} color="#a24d4d" delay={0.4} />
      <Floater className="right-16 bottom-10" size={92} color="#00aaff" delay={0.6} />
      {/* Floating backstory button + modal mount */}
      <KunjappanStory />
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