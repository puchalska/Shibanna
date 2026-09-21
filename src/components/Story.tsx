"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { asset } from "@/lib/asset";
import { useSite, useUi } from "@/lib/site-context";

// the poppy sticker used as the note's trigger — a cream card, tilted to
// a diamond, with a hand-painted red poppy and two small accent petals
function PoppyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <rect x="20" y="20" width="60" height="60" rx="4" transform="rotate(45 50 50)" fill="#f4f0e6" />
      <path d="M16 20 Q20 15 24 21 Q20 26 16 20Z" fill="#e14a5c" />
      <path d="M10 29 Q14 25 17 30 Q14 34 10 29Z" fill="#e14a5c" />
      <path
        d="M55 60 C 60 65 61 70 66 74"
        stroke="#4a4238"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M60 66 C 63 63 68 64 68 67 C 65 69 61 69 60 66Z" fill="#4a4238" />
      <path
        d="M50 26 C 40 25 33 33 36 43 C 39 49 46 49 49 44 C 47 50 51 57 58 57 C 65 55 67 47 62 42 C 68 44 73 40 72 33 C 70 25 60 23 53 28 C 58 24 58 30 55 33 C 52 29 52 27 50 26Z"
        fill="#cf2438"
      />
      <path
        d="M37 41 C 32 44 31 51 37 55 C 43 58 49 53 47 47 C 51 52 59 53 63 48 C 66 43 63 37 57 37 C 62 39 62 45 57 47 C 52 49 48 45 48 40 C 46 45 41 46 37 41Z"
        fill="#b81b30"
      />
      <circle cx="50" cy="45" r="7.5" fill="#3a2416" />
      <circle cx="48" cy="43" r="1" fill="#221206" />
      <circle cx="52.5" cy="47" r="1" fill="#221206" />
      <circle cx="53" cy="42.5" r="0.8" fill="#221206" />
      <circle cx="47" cy="48" r="0.8" fill="#221206" />
    </svg>
  );
}

function StoryNoteToggle({ note }: { note: string }) {
  const ui = useUi();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <span ref={wrapRef} className="relative inline-block align-middle">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? ui.story.hideNote : ui.story.showNote}
        className="relative -top-1 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center outline-none ring-coral transition-transform duration-150 hover:scale-110 focus-visible:ring-2 active:scale-95 sm:size-8"
      >
        <PoppyIcon className="size-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 6 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="absolute bottom-full left-1/2 z-10 mb-3 w-max max-w-[min(260px,80vw)] origin-bottom -translate-x-1/2 text-left"
          >
            <p
              className="rounded-[6px] px-4 py-2.5 font-sans2 text-sm not-italic leading-snug shadow-[0_6px_16px_rgba(0,0,0,0.3)]"
              style={{ background: "var(--orange)", color: "var(--yellow)" }}
            >
              {note}
            </p>
            <span
              aria-hidden
              className="absolute left-1/2 top-full -translate-x-1/2 border-x-8 border-t-8 border-x-transparent"
              style={{ borderTopColor: "var(--orange)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function Story() {
  const { story, storyNote } = useSite();

  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-16 sm:pb-24">
      <div className="mx-auto max-w-3xl font-serif text-2xl italic leading-[1.5] text-coral sm:text-[2rem] sm:leading-[1.55]">
        {story} <StoryNoteToggle note={storyNote} />
      </div>

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
