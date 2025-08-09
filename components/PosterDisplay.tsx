"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function PosterDisplay() {
  const [image, setImage] = useState<string | null>(null);
  const [roast, setRoast] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: any) => {
      setImage(e.detail?.image || e.detail?.imageUrl || null);
      setRoast(e.detail?.roast || null);
    };
    window.addEventListener("kunjappan:poster", handler);
    return () => window.removeEventListener("kunjappan:poster", handler);
  }, []);

  const download = () => {
    if (!image) return;
    const a = document.createElement("a");
    a.href = image;
    a.download = "aesthetic-kunjappan.png";
    a.click();
  };

  const share = async () => {
    if (!image) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Aesthetic Kunjappan", text: roast || "" });
      }
    } catch {}
  };

  if (!image) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="vintage-frame bg-white/70 p-4 sm:p-6">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[700px]">
              <img src={image} alt="Generated poster" className="w-full h-auto rounded-md" />
              {roast && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white/95 border border-[#3b2a1a] rounded-md px-3 py-2 text-sm font-extrabold text-[#1d1510] shadow-md">
                  {roast}
                </div>
              )}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={download} className="rounded-full px-4 py-2 border-2 border-[#6b8f71] text-[#1d1510] bg-[#e6efd8]">
                Download
              </button>
              <button onClick={share} className="rounded-full px-4 py-2 border-2 border-[#a24d4d] text-[#1d1510] bg-[#fbe3e3]">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 