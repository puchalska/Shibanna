"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { asset } from "@/lib/asset";
import type { Fit, Garment } from "@/lib/site";

/* The "no figure" wardrobe grid — replaces the composited photo entirely
   for occasions that have isolated per-garment cutouts (see Fit.garments).
   Matches the Figma "Outfit widget" reference: a fixed-size card for him
   (top+bottom or one outfit panel, then shoes) and a fixed-size card for
   her (a narrow column for jewelry/shoes/bag, a wide column for top+bottom
   or one outfit panel). The card itself never resizes, but each garment
   photo stays fully visible inside its slot (object-fit: contain) and
   floats on the page's own background, same as the reference — no crop-
   to-fill, no label bar. Category names live in the image's alt text.

   Every slot cycles independently — mix and match, not a single "look"
   moving in lockstep. Garments are pooled across every fit in the
   occasion, and each slot keeps its own local index. Him's top slot is
   the one exception: an "outfit" candidate takes over the top+bottom
   position as one panel (since it isn't separable), which hides the
   otherwise-independent Bottom slot only while that candidate is active.
   Jewelry is a standing per-occasion suggestion, not tied to any look,
   so it never cycles.

   A slot with more than one option is a drag/swipe track, not a click
   target: the next and previous photos sit just off-screen and peek a
   sliver into view at rest, so "there's another piece here" is felt by
   looking at it, not read off an icon. Dragging past ~18% of the slot's
   width commits the swap; short of that, it springs back.

   Falls back to the old photo+arrow-notes treatment (see WhatToWear)
   wherever an occasion doesn't have real per-garment photos at all yet. */

const PEEK = 18; // px of the neighboring photo visible at rest

function SwipeTrack({
  items,
  index,
  onChange,
  tall,
}: {
  items: Garment[];
  index: number;
  onChange: (next: number) => void;
  tall?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (items.length === 0) return null;
  const n = items.length;
  const canCycle = n > 1;
  const current = items[index];

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!canCycle) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // pointerId not eligible for capture (e.g. a synthetic event) — the
      // drag still works fine without capture, it just won't keep tracking
      // if the pointer leaves the element's bounds mid-drag
    }
    startX.current = e.clientX;
    setDragging(true);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const raw = e.clientX - startX.current;
    const max = Math.max(width - PEEK, 0);
    setDragX(Math.max(-max, Math.min(max, raw)));
  };
  const finish = () => {
    if (dragging) {
      const threshold = width * 0.18;
      if (dragX < -threshold) onChange((index + 1) % n);
      else if (dragX > threshold) onChange((index - 1 + n) % n);
    }
    setDragging(false);
    setDragX(0);
  };

  const layerStyle = (offset: number) => ({
    transform: `translateX(${offset + dragX}px)`,
    transition: dragging ? "none" : "transform 220ms ease-out",
  });

  return (
    <div
      ref={trackRef}
      className={`relative flex min-h-0 w-full touch-pan-y select-none overflow-hidden ${tall ? "flex-[2]" : "flex-1"} ${canCycle ? "cursor-grab active:cursor-grabbing" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finish}
      onPointerCancel={finish}
    >
      {canCycle && width > 0 && (
        <div className="absolute inset-3 flex items-center justify-center" style={layerStyle(-(width - PEEK))}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(items[(index - 1 + n) % n].image)}
            alt=""
            aria-hidden
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
      <div className="absolute inset-3 flex items-center justify-center" style={layerStyle(0)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(current.image)} alt={current.label} className="max-h-full max-w-full object-contain" />
      </div>
      {canCycle && width > 0 && (
        <div className="absolute inset-3 flex items-center justify-center" style={layerStyle(width - PEEK)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(items[(index + 1) % n].image)}
            alt=""
            aria-hidden
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

function FixedCell({ image, label }: { image: string; label: string }) {
  return (
    <div className="relative flex min-h-0 w-full flex-1 items-center justify-center p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(image)} alt={label} className="max-h-full max-w-full object-contain" />
    </div>
  );
}

function Cycle({ items, tall }: { items: Garment[]; tall?: boolean }) {
  const [index, setIndex] = useState(0);
  if (items.length === 0) return null;
  return <SwipeTrack items={items} index={index % items.length} onChange={setIndex} tall={tall} />;
}

function HimCard({ garments }: { garments: Garment[] }) {
  const tops = garments.filter((g) => g.person === "him" && (g.category === "top" || g.category === "outfit"));
  const bottoms = garments.filter((g) => g.person === "him" && g.category === "bottom");
  const shoes = garments.filter((g) => g.person === "him" && g.category === "shoes");

  const [topIndex, setTopIndex] = useState(0);
  const activeTopIndex = tops.length > 0 ? topIndex % tops.length : 0;
  const isOutfit = tops[activeTopIndex]?.category === "outfit";

  return (
    <div className="flex h-[460px] flex-col divide-y divide-[#ed8235]/40 overflow-hidden rounded-xl border-[5px] border-[#ed8235]">
      {tops.length > 0 && (
        <SwipeTrack items={tops} index={activeTopIndex} onChange={setTopIndex} tall={isOutfit} />
      )}
      {!isOutfit && <Cycle items={bottoms} />}
      <Cycle items={shoes} />
    </div>
  );
}

function HerCard({ garments, jewelryImage }: { garments: Garment[]; jewelryImage?: string }) {
  const tops = garments.filter((g) => g.person === "her" && (g.category === "top" || g.category === "outfit"));
  const bottoms = garments.filter((g) => g.person === "her" && g.category === "bottom");
  const shoes = garments.filter((g) => g.person === "her" && g.category === "shoes");
  const bags = garments.filter((g) => g.person === "her" && g.category === "bag");

  const [topIndex, setTopIndex] = useState(0);
  const activeTopIndex = tops.length > 0 ? topIndex % tops.length : 0;
  const isOutfit = tops[activeTopIndex]?.category === "outfit";

  return (
    <div className="grid h-[460px] grid-cols-[3fr_4fr] grid-rows-[1fr] divide-x divide-[#ff9595]/40 overflow-hidden rounded-xl border-[4px] border-[#ff9595]">
      <div className="flex min-h-0 flex-col divide-y divide-[#ff9595]/40">
        {jewelryImage && <FixedCell image={jewelryImage} label="Jewelry" />}
        <Cycle items={shoes} />
        <Cycle items={bags} />
      </div>
      <div className="flex min-h-0 flex-col divide-y divide-[#ff9595]/40">
        {tops.length > 0 && (
          <SwipeTrack items={tops} index={activeTopIndex} onChange={setTopIndex} tall={isOutfit} />
        )}
        {!isOutfit && <Cycle items={bottoms} />}
      </div>
    </div>
  );
}

function Comment({ text, background }: { text: string; background: string }) {
  return (
    <p
      className="rounded-[8px] px-5 py-4 font-hand text-base leading-snug sm:text-lg"
      style={{ background, color: "#4b0103" }}
    >
      {text}
    </p>
  );
}

export default function LookGrid({
  fits,
  jewelry,
  notes,
}: {
  fits: Fit[];
  jewelry?: { him?: string; her?: string };
  notes: { him: string; her: string };
}) {
  const garments = fits.flatMap((f) => f.garments ?? []);

  return (
    <div>
      <div className="grid grid-cols-2 items-start gap-4">
        <HimCard garments={garments} />
        <HerCard garments={garments} jewelryImage={jewelry?.her} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Comment text={notes.him} background="#ed8235" />
        <Comment text={notes.her} background="#ff9595" />
      </div>
    </div>
  );
}
