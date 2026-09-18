"use client";

import { useState } from "react";
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

   Falls back to the old photo+arrow-notes treatment (see WhatToWear)
   wherever an occasion doesn't have real per-garment photos at all yet. */

const ARROW = asset("/figma/outfit/arrow.svg");

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className={`absolute top-1/2 z-10 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center outline-none transition-opacity hover:opacity-70 ${dir === "prev" ? "left-0" : "right-0"}`}
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

function Cell({
  garment,
  tall,
  canCycle,
  onPrev,
  onNext,
}: {
  garment: Garment;
  tall?: boolean;
  canCycle: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className={`relative flex min-h-0 w-full items-center justify-center p-3 ${tall ? "flex-[2]" : "flex-1"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(garment.image)} alt={garment.label} className="max-h-full max-w-full object-contain" />
      {canCycle && <ArrowButton dir="prev" onClick={onPrev} />}
      {canCycle && <ArrowButton dir="next" onClick={onNext} />}
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
  const i = index % items.length;
  return (
    <Cell
      garment={items[i]}
      tall={tall}
      canCycle={items.length > 1}
      onPrev={() => setIndex((v) => (v - 1 + items.length) % items.length)}
      onNext={() => setIndex((v) => (v + 1) % items.length)}
    />
  );
}

function HimCard({ garments }: { garments: Garment[] }) {
  const tops = garments.filter((g) => g.person === "him" && (g.category === "top" || g.category === "outfit"));
  const bottoms = garments.filter((g) => g.person === "him" && g.category === "bottom");
  const shoes = garments.filter((g) => g.person === "him" && g.category === "shoes");

  const [topIndex, setTopIndex] = useState(0);
  const activeTop = tops.length > 0 ? tops[topIndex % tops.length] : undefined;
  const isOutfit = activeTop?.category === "outfit";

  return (
    <div className="flex h-[460px] flex-col divide-y divide-[#ed8235]/40 overflow-hidden rounded-xl border-[5px] border-[#ed8235]">
      {activeTop && (
        <Cell
          garment={activeTop}
          tall={isOutfit}
          canCycle={tops.length > 1}
          onPrev={() => setTopIndex((v) => (v - 1 + tops.length) % tops.length)}
          onNext={() => setTopIndex((v) => (v + 1) % tops.length)}
        />
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
  const activeTop = tops.length > 0 ? tops[topIndex % tops.length] : undefined;
  const isOutfit = activeTop?.category === "outfit";

  return (
    <div className="grid h-[460px] grid-cols-[3fr_4fr] grid-rows-[1fr] divide-x divide-[#ff9595]/40 overflow-hidden rounded-xl border-[4px] border-[#ff9595]">
      <div className="flex min-h-0 flex-col divide-y divide-[#ff9595]/40">
        {jewelryImage && <FixedCell image={jewelryImage} label="Jewelry" />}
        <Cycle items={shoes} />
        <Cycle items={bags} />
      </div>
      <div className="flex min-h-0 flex-col divide-y divide-[#ff9595]/40">
        {activeTop && (
          <Cell
            garment={activeTop}
            tall={isOutfit}
            canCycle={tops.length > 1}
            onPrev={() => setTopIndex((v) => (v - 1 + tops.length) % tops.length)}
            onNext={() => setTopIndex((v) => (v + 1) % tops.length)}
          />
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
