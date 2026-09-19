"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { asset } from "@/lib/asset";
import type { Fit, Garment } from "@/lib/site";

/* The "no figure" wardrobe grid — replaces the composited photo entirely
   for occasions that have isolated per-garment cutouts (see Fit.garments).
   Matches the Figma "Outfit widget" reference: a fixed-size card for him
   (top+bottom or one outfit panel, then shoes) and a fixed-size card for
   her (a narrow column for jewelry/layers/shoes/bag, a wide column for
   top+bottom or one outfit panel). The card itself never resizes, but each garment
   photo stays fully visible inside its slot (object-fit: contain) and
   floats on the page's own background, same as the reference — no crop-
   to-fill, no label bar. Category names live in the image's alt text.

   Every slot cycles independently — mix and match, not a single "look"
   moving in lockstep. Garments are pooled across every fit in the
   occasion, and each slot keeps its own local index. Him's top slot is
   the one exception: an "outfit" candidate takes over the top+bottom
   position as one panel (since it isn't separable), which hides the
   otherwise-independent Bottom slot only while that candidate is active.
   Jewelry is just another pooled category (some occasions vary it every
   look, some repeat the same piece — either way it behaves the same).

   A slot with more than one option is a drag/swipe track: the next and
   previous photos sit just off-screen and peek a sliver into view at
   rest, so "there's another piece here" is felt by looking at it, not
   just read off an icon. Dragging past ~18% of the slot's width commits
   the swap; short of that, it springs back. Arrow buttons sit alongside
   the drag rather than replacing it, for anyone who'd rather click.

   Falls back to the old photo+arrow-notes treatment (see WhatToWear)
   wherever an occasion doesn't have real per-garment photos at all yet. */

const PEEK = 18; // px of the neighboring photo visible at rest
const ARROW = asset("/figma/outfit/arrow.svg");

// row-height weights lifted straight from the Figma reference's own pixel
// measurements (e.g. him's card: shirt 159 / jeans 227 / shoes 96 out of
// 482) — shoes is a genuinely smaller compartment than shirt or jeans
// there, not an equal third, so these are deliberately uneven
const WEIGHT = {
  himTop: 159,
  himBottom: 227,
  himOutfit: 159 + 227,
  himShoes: 96,
  herWideTop: 192,
  herWideBottom: 290,
  herWideOutfit: 192 + 290,
  herJewelry: 135,
  herShoes: 112,
  herBag: 235,
  herLayers: 293, // Wedding's narrow column: blouse+petticoat on top, shoes below
};

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className={`absolute inset-y-0 z-10 flex w-12 cursor-pointer items-center opacity-0 outline-none transition-opacity duration-150 group-hover:opacity-100 hover:opacity-70 focus-visible:opacity-100 ${dir === "prev" ? "left-0 justify-start pl-1" : "right-0 justify-end pr-1"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ARROW}
        alt=""
        aria-hidden
        className={`h-3.5 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${dir === "prev" ? "rotate-180" : ""}`}
      />
    </button>
  );
}

// combines the category-wide imgScale (e.g. shoes rendering too big by
// default) with a per-garment scale/rotate override (e.g. Wedding Look
// 2's saree, the one photo Figma itself crops+tilts to sit denser in
// its column instead of shrinking to stay fully visible)
function itemTransform(item: Garment, imgScale: number) {
  const scale = imgScale * (item.scale ?? 1);
  const rotate = item.rotate ?? 0;
  return `scale(${scale}) rotate(${rotate}deg)`;
}

function SwipeTrack({
  items,
  index,
  onChange,
  weight,
  imgScale = 1,
}: {
  items: Garment[];
  index: number;
  onChange: (next: number) => void;
  weight: number;
  imgScale?: number;
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
  });

  return (
    <div
      ref={trackRef}
      className={`group relative flex min-h-0 w-full touch-pan-y select-none overflow-hidden ${canCycle ? "cursor-grab active:cursor-grabbing" : ""}`}
      style={{ flexGrow: weight, flexBasis: 0 }}
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
            className="size-full object-contain"
            style={{ transform: itemTransform(items[(index - 1 + n) % n], imgScale) }}
          />
        </div>
      )}
      <div className="absolute inset-3 flex items-center justify-center" style={layerStyle(0)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(current.image)}
          alt={current.label}
          className="size-full object-contain"
          style={{ transform: itemTransform(current, imgScale) }}
        />
      </div>
      {canCycle && width > 0 && (
        <div className="absolute inset-3 flex items-center justify-center" style={layerStyle(width - PEEK)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(items[(index + 1) % n].image)}
            alt=""
            aria-hidden
            className="size-full object-contain"
            style={{ transform: itemTransform(items[(index + 1) % n], imgScale) }}
          />
        </div>
      )}
      {canCycle && (
        <>
          <ArrowButton dir="prev" onClick={() => onChange((index - 1 + n) % n)} />
          <ArrowButton dir="next" onClick={() => onChange((index + 1) % n)} />
        </>
      )}
    </div>
  );
}

function Cycle({
  items,
  weight,
  imgScale,
}: {
  items: Garment[];
  weight: number;
  imgScale?: number;
}) {
  const [index, setIndex] = useState(0);
  if (items.length === 0) return null;
  return (
    <SwipeTrack items={items} index={index % items.length} onChange={setIndex} weight={weight} imgScale={imgScale} />
  );
}

function HimCard({ garments }: { garments: Garment[] }) {
  const tops = garments.filter((g) => g.person === "him" && (g.category === "top" || g.category === "outfit"));
  const bottoms = garments.filter((g) => g.person === "him" && g.category === "bottom");
  const shoes = garments.filter((g) => g.person === "him" && g.category === "shoes");

  const [topIndex, setTopIndex] = useState(0);
  const activeTopIndex = tops.length > 0 ? topIndex % tops.length : 0;
  const isOutfit = tops[activeTopIndex]?.category === "outfit";

  return (
    <div className="flex aspect-[245/482] flex-col divide-y divide-[#ed8235]/40 overflow-hidden rounded-xl border-[5px] border-[#ed8235]">
      {tops.length > 0 && (
        <SwipeTrack
          items={tops}
          index={activeTopIndex}
          onChange={setTopIndex}
          weight={isOutfit ? WEIGHT.himOutfit : WEIGHT.himTop}
        />
      )}
      {!isOutfit && <Cycle items={bottoms} weight={WEIGHT.himBottom} />}
      <Cycle items={shoes} weight={WEIGHT.himShoes} imgScale={0.6} />
    </div>
  );
}

function HerCard({ garments }: { garments: Garment[] }) {
  const tops = garments.filter((g) => g.person === "her" && (g.category === "top" || g.category === "outfit"));
  const bottoms = garments.filter((g) => g.person === "her" && g.category === "bottom");
  const shoes = garments.filter((g) => g.person === "her" && g.category === "shoes");
  const bags = garments.filter((g) => g.person === "her" && g.category === "bag");
  const jewelry = garments.filter((g) => g.person === "her" && g.category === "jewelry");
  const layers = garments.filter((g) => g.person === "her" && g.category === "layers");

  const [topIndex, setTopIndex] = useState(0);
  const activeTopIndex = tops.length > 0 ? topIndex % tops.length : 0;
  const isOutfit = tops[activeTopIndex]?.category === "outfit";

  return (
    <div className="grid aspect-[367/482] grid-cols-[3fr_4fr] grid-rows-[1fr] divide-x divide-[#ff9595]/40 overflow-hidden rounded-xl border-[4px] border-[#ff9595]">
      <div className="flex min-h-0 flex-col divide-y divide-[#ff9595]/40">
        <Cycle items={jewelry} weight={WEIGHT.herJewelry} />
        <Cycle items={layers} weight={WEIGHT.herLayers} />
        <Cycle items={shoes} weight={WEIGHT.herShoes} imgScale={0.89} />
        <Cycle items={bags} weight={WEIGHT.herBag} />
      </div>
      <div className="flex min-h-0 flex-col divide-y divide-[#ff9595]/40">
        {tops.length > 0 && (
          <SwipeTrack
            items={tops}
            index={activeTopIndex}
            onChange={setTopIndex}
            weight={isOutfit ? WEIGHT.herWideOutfit : WEIGHT.herWideTop}
          />
        )}
        {!isOutfit && <Cycle items={bottoms} weight={WEIGHT.herWideBottom} />}
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
  notes,
}: {
  fits: Fit[];
  notes: { him: string; her: string };
}) {
  const garments = fits.flatMap((f) => f.garments ?? []);

  return (
    <div>
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-[245fr_367fr]">
        <HimCard garments={garments} />
        <HerCard garments={garments} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Comment text={notes.him} background="#ed8235" />
        <Comment text={notes.her} background="#ff9595" />
      </div>
    </div>
  );
}
