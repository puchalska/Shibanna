"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from "motion/react";
import { asset } from "@/lib/asset";
import { couple } from "@/lib/site";

/* Cover (Figma node 3485:2177):
   - lace.svg — coral vector lace (doily + corners + gems), always visible
   - lace-full.webp — the full pressed-lace pattern, felt background removed
     and flattened to a single coral so it can only ever add lace linework —
     never a patch, a tone shift, or a light change. Revealed inside a soft
     feathered circle that springs along with the cursor.
   No-hover / reduced-motion devices get lace.svg alone. */

const LACE = "/figma/cover/lace.svg";
const DETAIL = "/figma/cover/lace-full.webp";

export default function CoverLace() {
  const box = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const r = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });
  const sr = useSpring(r, { stiffness: 120, damping: 20 });

  // single soft-edged radial gradient — solid core, feathered falloff.
  // (the detail layer is flat-coral on transparent, so even if a browser drops
  //  the mask the worst case is "lace detail everywhere" — never a patch.)
  const maskImage = useMotionTemplate`radial-gradient(circle ${sr}px at ${sx}px ${sy}px, #000 0%, #000 45%, rgba(0,0,0,0.35) 72%, transparent 100%)`;

  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (canHover && !reduced) setInteractive(true);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const el = box.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    x.set(e.clientX - b.left);
    y.set(e.clientY - b.top);
    r.set(200);
  };
  const onLeave = () => r.set(0);

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

      {/* photographic lace detail, revealed in a circle under the cursor */}
      {interactive && (
        <motion.img
          src={asset(DETAIL)}
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute inset-0 size-full object-cover"
          style={{ maskImage, WebkitMaskImage: maskImage }}
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
