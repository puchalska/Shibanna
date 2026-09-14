"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import type { Fit, Garment, GarmentCategory } from "@/lib/site";

/* The "no figure" wardrobe grid — replaces the composited photo entirely
   for fits that have isolated per-garment cutouts (see Fit.garments).
   The grid itself never changes shape: every look gets the same four
   slots (top/bottom/shoes/accessory) in the same positions, and what
   changes between looks is only which photo — if any — fills each one.
   A slot with no photo for this look renders empty rather than the grid
   reflowing. A slot with more than one candidate (e.g. two accessory
   options) paginates in place instead of doubling up.

   "outfit" is the one exception: a photo that was never shot piece by
   piece (a combined ghost-mannequin shot, a sari that has no top/bottom
   seam) replaces all four slots with a single panel — pretending to
   slice it into parts would be fabricating detail that isn't there.

   Falls back to the old photo+arrow-notes treatment (see WhatToWear)
   wherever a look doesn't have real per-garment photos at all yet. */

const SLOTS: GarmentCategory[] = ["top", "bottom", "shoes", "accessory"];
const SLOT_LABEL: Record<GarmentCategory, string> = {
  top: "Top",
  bottom: "Bottom",
  shoes: "Shoes",
  accessory: "Accessory",
  outfit: "Outfit",
};

// pink for her, a cool off-white for him — a subtle cue for which side
// of the grid you're looking at, independent of the photos themselves
const SIDE_BORDER: Record<"him" | "her", string> = {
  him: "border-[#dce9f2]/40",
  her: "border-[#ffc4cb]/50",
};

function GarmentImage({ garment }: { garment: Garment }) {
  const { image, crop } = garment;
  if (!crop) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={asset(image)} alt="" aria-hidden className="size-full object-contain" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(image)}
      alt=""
      aria-hidden
      className="absolute max-w-none"
      style={{
        width: `${(crop.naturalW / crop.w) * 100}%`,
        height: `${(crop.naturalH / crop.h) * 100}%`,
        left: `${(-crop.x / crop.w) * 100}%`,
        top: `${(-crop.y / crop.h) * 100}%`,
      }}
    />
  );
}

function Slot({
  side,
  category,
  items,
}: {
  side: "him" | "her";
  category: GarmentCategory;
  items: Garment[];
}) {
  const [index, setIndex] = useState(0);
  const border = SIDE_BORDER[side];

  if (items.length === 0) {
    return (
      <div className={`flex flex-col gap-1.5 border border-dashed p-2 opacity-30 ${border}`}>
        <div className="w-full" style={{ aspectRatio: "1 / 1" }} />
        <p className="text-center font-label text-[9px] font-bold uppercase tracking-[0.15em] text-coral-soft">
          {SLOT_LABEL[category]}
        </p>
      </div>
    );
  }

  const active = items[index % items.length];
  const aspect = active.crop ? `${active.crop.w} / ${active.crop.h}` : "1 / 1";
  const multi = items.length > 1;

  return (
    <button
      type="button"
      onClick={() => multi && setIndex((v) => v + 1)}
      className={`flex flex-col gap-1.5 border border-dashed p-2 text-left ${border} ${multi ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
        <GarmentImage garment={active} />
      </div>
      <div className="flex items-center justify-between gap-1">
        <p className="font-label text-[9px] font-bold uppercase tracking-[0.15em] text-coral-soft">
          {active.label}
        </p>
        {multi && (
          <span className="flex shrink-0 gap-0.5" aria-hidden>
            {items.map((_, i) => (
              <span
                key={i}
                className="size-1 rounded-full"
                style={{ background: i === index % items.length ? "var(--coral)" : "rgba(255,255,255,0.3)" }}
              />
            ))}
          </span>
        )}
      </div>
    </button>
  );
}

function PersonGrid({ side, garments }: { side: "him" | "her"; garments: Garment[] }) {
  const outfit = garments.find((g) => g.category === "outfit");
  if (outfit) {
    return (
      <div className={`flex h-full flex-col items-center justify-center border border-dashed p-3 ${SIDE_BORDER[side]}`}>
        <div className="relative w-full flex-1" style={{ aspectRatio: "2 / 3" }}>
          <GarmentImage garment={outfit} />
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2">
      {SLOTS.map((category) => (
        <Slot key={category} side={side} category={category} items={garments.filter((g) => g.category === category)} />
      ))}
    </div>
  );
}

function Comment({ text }: { text: string }) {
  return (
    <p
      className="rounded-[8px] px-5 py-4 font-hand text-base leading-snug sm:text-lg"
      style={{ background: "#ffc4cb", color: "var(--red-deep)" }}
    >
      {text}
    </p>
  );
}

export default function LookGrid({ fit }: { fit: Fit }) {
  const garments = fit.garments ?? [];
  const him = garments.filter((g) => g.person === "him");
  const her = garments.filter((g) => g.person === "her");

  return (
    <div>
      <div className="grid grid-cols-2 items-stretch border border-dashed border-coral/20">
        <PersonGrid side="him" garments={him} />
        <PersonGrid side="her" garments={her} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Comment text={fit.notes.him} />
        <Comment text={fit.notes.her} />
      </div>
    </div>
  );
}
