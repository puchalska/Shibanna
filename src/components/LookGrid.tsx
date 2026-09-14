import { asset } from "@/lib/asset";
import type { Fit, Garment } from "@/lib/site";

/* The "no figure" wardrobe grid — replaces the composited photo entirely
   for fits that have isolated per-garment cutouts (see Fit.garments).
   The shape isn't fixed to a "top/bottom/shoes" template: each person's
   half of the grid is driven by how many real photos actually exist for
   them. One combined photo (nothing was shot separately) stays one big
   panel; several real separate pieces become their own small grid, with
   a "big" item (a dress/sari/skirt that doesn't split into a top+bottom)
   spanning two rows. Falls back to the old photo+arrow-notes treatment
   (see WhatToWear) wherever a look doesn't have real per-garment photos
   at all yet. */

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

// one real combined photo — nothing to break into pieces, so it gets one
// full panel instead of being sliced into fake categories
function SoloPanel({ garment }: { garment: Garment }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1.5 border border-dashed border-coral/30 p-3">
      <div className="relative w-full flex-1" style={{ aspectRatio: "2 / 3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(garment.image)} alt="" aria-hidden className="size-full object-contain" />
      </div>
    </div>
  );
}

function PersonSection({ garments }: { garments: Garment[] }) {
  if (garments.length === 0) return null;
  if (garments.length === 1) return <SoloPanel garment={garments[0]} />;
  return (
    <div className="grid grid-cols-2">
      {garments.map((g) => (
        <GarmentCell key={g.label} garment={g} />
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
      <div className="grid grid-cols-2 items-stretch border border-dashed border-coral/30">
        <PersonSection garments={him} />
        <PersonSection garments={her} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Comment text={fit.notes.him} />
        <Comment text={fit.notes.her} />
      </div>
    </div>
  );
}
