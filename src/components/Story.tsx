"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { asset } from "@/lib/asset";
import { useSite, useUi } from "@/lib/site-context";

export default function Story() {
  const { story, storyNote } = useSite();
  const ui = useUi();
  const [showNote, setShowNote] = useState(false);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-16 sm:pb-24">
      <p className="mx-auto max-w-3xl font-serif text-2xl italic leading-[1.5] text-coral sm:text-[2rem] sm:leading-[1.55]">
        {story}{" "}
        <button
          type="button"
          onClick={() => setShowNote((v) => !v)}
          aria-expanded={showNote}
          aria-label={showNote ? ui.story.hideNote : ui.story.showNote}
          className="relative -top-1 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-coral/50 align-middle font-sans2 text-[12px] not-italic text-coral outline-none ring-coral transition-colors duration-150 hover:bg-coral/10 focus-visible:ring-2 active:scale-90 sm:size-6 sm:text-sm"
        >
          i
        </button>
      </p>

      <AnimatePresence initial={false}>
        {showNote && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-auto max-w-3xl overflow-hidden text-center font-hand text-base leading-snug text-coral-soft sm:text-lg"
          >
            <span className="mt-3 block">{storyNote}</span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* stop-motion of the hand-drawn florals and torn red paper being
          woven together — the artwork the site's own coral/lace look was
          drawn from. Rotated 90° clockwise, baked into the file. Full
          width of the section, wider than the text column above it. */}
      <div className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-[6px]">
        <video
          src={asset("/art-video.mp4")}
          poster={asset("/art-video-poster.jpg")}
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* aurora line + heart, echoing the Figma illustration */}
      <svg viewBox="0 0 600 90" className="mx-auto mt-8 w-full max-w-3xl" fill="none" aria-hidden>
        <path
          d="M4 78 C 60 74 78 40 96 44 C 108 47 112 24 122 40 C 130 52 138 30 150 46 C 160 60 176 42 196 52 C 260 78 300 30 330 40 C 360 50 372 22 386 40 C 398 55 410 34 430 46 C 470 68 520 44 596 40"
          stroke="var(--coral)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M330 24 c -6 -9 -20 -6 -20 4 c 0 8 12 15 20 22 c 8 -7 20 -14 20 -22 c 0 -10 -14 -13 -20 -4 z"
          stroke="var(--coral)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <g fill="var(--coral)">
          {[
            [220, 40],
            [246, 30],
            [268, 44],
            [400, 26],
            [420, 38],
            [446, 24],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" />
          ))}
        </g>
      </svg>
    </section>
  );
}
