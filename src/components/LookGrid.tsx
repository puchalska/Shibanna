import { asset } from "@/lib/asset";
import type { Fit, Garment } from "@/lib/site";

/* The "no figure" wardrobe grid — replaces the composited photo entirely
   for fits that have isolated per-garment cutouts (see Fit.garments).
   Items pack into a dashed-line grid, a "big" item (a dress/sari/skirt
   that doesn't split into a top+bottom) spans two rows instead of one.
   Falls back to the old photo+arrow-notes treatment (see WhatToWear)
   wherever a look doesn't have real per-garment photos yet. */

function GarmentCell({ garment }: { garment: Garment }) {
  const { image, crop, label, big } = garment;
  const aspect = crop ? `${crop.w} / ${crop.h}` : big ? "3 / 5" : "1 / 1";
  return (
    <div
      className={`flex flex-col gap-1.5 border border-dashed border-coral/30 p-2 ${big ? "row-span-2" : ""}`}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
        {crop ? (
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
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(image)} alt="" aria-hidden className="size-full object-contain" />
        )}
      </div>
      <p className="text-center font-label text-[9px] font-bold uppercase tracking-[0.15em] text-coral-soft">
        {label}
      </p>
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

  return (
    <div>
      <div className="grid grid-cols-3 gap-0 border border-dashed border-coral/30 sm:grid-cols-4">
        {garments.map((g, i) => (
          <GarmentCell key={`${g.person}-${g.label}-${i}`} garment={g} />
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Comment text={fit.notes.him} />
        <Comment text={fit.notes.her} />
      </div>
    </div>
  );
}
