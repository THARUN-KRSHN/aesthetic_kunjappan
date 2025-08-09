"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function KunjappanStory() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating round button bottom-right of hero */}
      <motion.button
        onClick={() => setOpen(true)}
        className="group fixed sm:absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#a24d4d] text-white font-extrabold shadow-lg border-4 border-white/70 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05, rotate: -2 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        aria-label="Backstory of Aesthetic Kunjappan?"
      >
        <span className="hidden sm:block text-[11px] leading-tight text-center px-2">
          Backstory of Aesthetic Kunjappan?
        </span>
        <span className="sm:hidden text-[10px] leading-tight text-center px-1">Backstory?</span>
      </motion.button>

      {/* Comic-style modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <motion.div
              role="dialog"
              aria-modal
              className="relative z-10 max-w-xl w-full comic-modal"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <div className="comic-bubble halftone p-5 sm:p-7">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Kunjappan Backstory</h2>
                <p className="text-base sm:text-lg leading-relaxed">
                "നിങ്ങൾക്ക് എസ്തെറ്റിക് കുഞ്ഞമ്മയെ അറിയാമോ?
ദക്ഷിണേന്ത്യയിലെ മുൻനിര ക്രിയേറ്റീവ് ഫിലിം ഡിസൈനർമാരിൽ ഒരാളാണ് അവർ. പ്രധാന സിനിമാ പോസ്റ്ററുകളിൽ ഭൂരിഭാഗവും അവരാണ് ഡിസൈൻ ചെയ്യുന്നത്.

എസ്തെറ്റിക് കുഞ്ഞപ്പൻ ഒരു വൃദ്ധനാണ്, സർഗ്ഗാത്മകതയുള്ള ആളാണ്, പക്ഷേ എസ്തെറ്റിക് കുഞ്ഞമ്മയോട് അഹങ്കാരത്തോടെയുള്ള മത്സരമുണ്ട്. അദ്ദേഹം ഒരു നല്ല ഡിസൈനറാണെങ്കിലും, അമിത ആത്മവിശ്വാസം കാരണം ഉപയോക്താവിന് ആവശ്യമുള്ളത് നൽകുന്നതിൽ അദ്ദേഹം പരാജയപ്പെടുന്നു, ഒടുവിൽ അദ്ദേഹം പൂർണ്ണമായും മണ്ടൻ ജോലി ചെയ്യുന്നു. അദ്ദേഹത്തിന്റെ പരിമിതികൾ കാരണം, അദ്ദേഹത്തിന് വർണ്ണ സിദ്ധാന്തമോ അക്ഷരവിന്യാസമോ അറിയില്ല, പക്ഷേ അദ്ദേഹത്തിന്റെ മനസ്സിൽ, അദ്ദേഹം എസ്ഥെറ്റിക് കുഞ്ഞമ്മയെ പരാജയപ്പെടുത്താൻ ആഗ്രഹിക്കുന്നു, അതിന്റെ ഫലമായി അദ്ദേഹം മണ്ടൻ കാര്യങ്ങൾ ചെയ്യുന്നു."
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#d23a3a] border-4 border-white shadow-lg flex items-center justify-center text-white text-xl font-black"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


