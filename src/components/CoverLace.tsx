"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  animate,
} from "motion/react";
import { asset } from "@/lib/asset";

/* The lace (doily + 4 corner motifs) rendered twice:
   - a faint "ghost" layer always visible
   - a full-strength layer revealed only under a cursor-following spotlight,
     with spring physics on the position and the reveal radius, plus a
     slower, wider "comet" halo trailing behind.
   Falls back to a static full-strength lace when the device can't hover
   or the viewer prefers reduced motion. */

function LaceSet({ revealed = false }: { revealed?: boolean }) {
  const img = (src: string, cls: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(src)}
      alt=""
      aria-hidden
      className={`absolute ${cls}`}
      draggable={false}
    />
  );
  return (
    <div
      className="absolute inset-0"
      style={
        revealed
          ? { filter: "drop-shadow(0 0 7px rgba(255,149,149,0.55)) brightness(1.06)" }
          : undefined
      }
    >
      {img("/figma/cover/corner-tl.svg", "left-0 top-0 w-[21%]")}
      {img("/figma/cover/corner-tl.svg", "right-0 top-0 w-[21%] -scale-x-100")}
      {img("/figma/cover/corner-tl.svg", "bottom-0 left-0 w-[21%] -scale-y-100")}
      {img("/figma/cover/corner-tl.svg", "bottom-0 right-0 w-[21%] -scale-100")}
      {img("/figma/cover/doily.svg", "left-[4.8%] top-[2.4%] w-[90.2%]")}
    </div>
  );
}

export default function CoverLace() {
  const box = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(false);

  // cursor position in % of the box
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  // reveal radii (px)
  const r = useMotionValue(0);
  const rHalo = useMotionValue(0);

  // sharp spotlight — snappy
  const sx = useSpring(px, { stiffness: 220, damping: 26, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 220, damping: 26, mass: 0.7 });
  const sr = useSpring(r, { stiffness: 90, damping: 18 });
  // comet halo — wide, laggy
  const hx = useSpring(px, { stiffness: 45, damping: 22 });
  const hy = useSpring(py, { stiffness: 45, damping: 22 });
  const hr = useSpring(rHalo, { stiffness: 55, damping: 20 });

  const maskImage = useMotionTemplate`radial-gradient(circle ${sr}px at ${sx}% ${sy}%, #000 0%, #000 42%, rgba(0,0,0,0.28) 74%, transparent 100%), radial-gradient(circle ${hr}px at ${hx}% ${hy}%, rgba(0,0,0,0.55) 0%, transparent 78%)`;

  useEffect(() => {
    const canHover =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!canHover || reduced) return;

    setInteractive(true);

    // intro: the lace is fully drawn, then recedes — an invitation to hover
    r.set(2600);
    rHalo.set(2600);
    const t = setTimeout(() => {
      animate(r, 0, { duration: 1.1, ease: [0.4, 0, 0.2, 1] });
      animate(rHalo, 0, { duration: 1.3, ease: [0.4, 0, 0.2, 1] });
    }, 850);
    return () => clearTimeout(t);
  }, [r, rHalo]);

  const onMove = (e: React.PointerEvent) => {
    const el = box.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    px.set(((e.clientX - b.left) / b.width) * 100);
    py.set(((e.clientY - b.top) / b.height) * 100);
    r.set(190);
    rHalo.set(300);
  };
  const onLeave = () => {
    r.set(0);
    rHalo.set(0);
  };

  return (
    <div
      ref={box}
      className="absolute inset-0"
      onPointerMove={interactive ? onMove : undefined}
      onPointerLeave={interactive ? onLeave : undefined}
    >
      {/* ghost */}
      <div className="absolute inset-0" style={{ opacity: interactive ? 0.14 : 1 }}>
        <LaceSet />
      </div>
      {/* spotlight reveal */}
      {interactive && (
        <motion.div
          className="absolute inset-0"
          style={{
            maskImage,
            WebkitMaskImage: maskImage,
            maskComposite: "add",
            WebkitMaskComposite: "source-over",
          }}
        >
          <LaceSet revealed />
        </motion.div>
      )}
    </div>
  );
}
