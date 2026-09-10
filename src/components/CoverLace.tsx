"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "motion/react";
import { asset } from "@/lib/asset";
import { couple } from "@/lib/site";

/* Cover (Figma node 3485:2177):
   - lace.svg — coral vector lace (doily + corners + gems), always visible
   - tablecloth.jpg — the photographic lace, shown ONLY inside a soft circle
     that follows the cursor (spring position + spring radius, plus a slower
     wider halo). No colour/brightness change — just the image, revealed.
   No-hover / reduced-motion devices get lace.svg alone. */

const LACE = "/figma/cover/lace.svg";
const CLOTH = "/figma/cover/tablecloth.jpg";

export default function CoverLace() {
  const box = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(false);

  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const r = useMotionValue(0);
  const rHalo = useMotionValue(0);

  const sx = useSpring(px, { stiffness: 220, damping: 26, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 220, damping: 26, mass: 0.7 });
  const sr = useSpring(r, { stiffness: 90, damping: 18 });
  const hx = useSpring(px, { stiffness: 45, damping: 22 });
  const hy = useSpring(py, { stiffness: 45, damping: 22 });
  const hr = useSpring(rHalo, { stiffness: 55, damping: 20 });

  // keep it fully hidden until there's an actual reveal radius
  const opacity = useTransform(sr, [0, 6], [0, 1]);

  const maskImage = useMotionTemplate`radial-gradient(circle ${sr}px at ${sx}% ${sy}%, #000 0%, #000 40%, rgba(0,0,0,0.25) 74%, transparent 100%), radial-gradient(circle ${hr}px at ${hx}% ${hy}%, rgba(0,0,0,0.45) 0%, transparent 80%)`;

  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!canHover || reduced) return;
    setInteractive(true);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const el = box.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    px.set(((e.clientX - b.left) / b.width) * 100);
    py.set(((e.clientY - b.top) / b.height) * 100);
    r.set(210);
    rHalo.set(330);
  };
  const onLeave = () => {
    r.set(0);
    rHalo.set(0);
  };

  const CImg = ({
    src,
    alt = "",
    className,
  }: {
    src: string;
    alt?: string;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(src)}
      alt={alt}
      className={`pointer-events-none ${className ?? ""}`}
      aria-hidden={alt === "" || undefined}
      draggable={false}
    />
  );

  return (
    <div
      ref={box}
      className="absolute inset-0 overflow-hidden"
      onPointerMove={interactive ? onMove : undefined}
      onPointerLeave={interactive ? onLeave : undefined}
    >
      {/* coral vector lace — always visible */}
      <CImg src={LACE} className="absolute inset-0 size-full object-cover" />

      {/* photographic tablecloth, revealed under the cursor (no light change) */}
      {interactive && (
        <motion.img
          src={asset(CLOTH)}
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute inset-0 size-full object-cover"
          style={{
            opacity,
            maskImage,
            WebkitMaskImage: maskImage,
            maskComposite: "add",
            WebkitMaskComposite: "source-over",
          }}
        />
      )}

      {/* names + captions on top */}
      <CImg
        src="/figma/cover/text-sambalpur.svg"
        alt={couple.place}
        className="absolute left-[19.4%] top-[35.7%] h-[29.5%]"
      />
      <CImg
        src="/figma/cover/text-dates.svg"
        alt={couple.dates}
        className="absolute left-[74%] top-[37.1%] h-[28.3%]"
      />
      <CImg
        src="/figma/cover/annashib.svg"
        alt={`${couple.names} — getting married`}
        className="absolute left-[29.4%] top-[31.6%] w-[36.6%]"
      />
    </div>
  );
}
