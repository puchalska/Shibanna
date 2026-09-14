import { asset } from "@/lib/asset";
import type { Fit } from "@/lib/site";

/* The wardrobe overlay — reads straight off the existing look photo, no
   separate per-garment assets. Each compartment is a cropped "window"
   onto the same image (source is a fixed 820x834 canvas for every look,
   see WhatToWear's Collage), picked to land on one garment area. Her
   side is 2 compartments (top/bottom) unless the look is a one-piece
   sari/lehenga drape, which doesn't have a bottom seam to crop at —
   that gets one bigger compartment instead. Him is always 4: top,
   bottom, shoes, a close-in accessory read (collar/tie/belt). */

const SOURCE = { w: 820, h: 834 };

type Crop = { x: number; y: number; w: number; h: number };

const HIM: Record<"top" | "bottom" | "shoes" | "accessories", Crop> = {
  top: { x: 195, y: 225, w: 215, h: 205 },
  bottom: { x: 195, y: 430, w: 215, h: 180 },
  shoes: { x: 215, y: 585, w: 170, h: 55 },
  accessories: { x: 235, y: 230, w: 140, h: 140 },
};

const HER: Record<"top" | "bottom" | "sari", Crop> = {
  top: { x: 415, y: 225, w: 245, h: 205 },
  bottom: { x: 395, y: 430, w: 270, h: 230 },
  sari: { x: 390, y: 225, w: 280, h: 425 },
};

function Compartment({
  image,
  crop,
  label,
  className = "",
}: {
  image: string;
  crop: Crop;
  label: string;
  className?: string;
}) {
  const scale = 100 / crop.w;
  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <div
        className="relative w-full overflow-hidden rounded-[4px] border border-coral/25 bg-cream-light"
        style={{ aspectRatio: `${crop.w} / ${crop.h}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(image)}
          alt=""
          aria-hidden
          className="absolute max-w-none"
          style={{
            width: `${SOURCE.w * scale}%`,
            height: `${SOURCE.h * scale}%`,
            left: `${-crop.x * scale}%`,
            top: `${-crop.y * scale}%`,
          }}
        />
      </div>
      <p className="font-label text-[9px] font-bold uppercase tracking-[0.15em] text-coral-soft">
        {label}
      </p>
    </div>
  );
}

export default function Wardrobe({ fit }: { fit: Fit }) {
  const sari = fit.herStyle === "sari";

  return (
    <div className="rounded-[3px] border-2 border-dashed border-coral/35 px-5 py-4">
      <p className="mb-3 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-coral-soft">
        The wardrobe
      </p>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <p className="mb-2 font-serif text-sm italic text-coral">Her</p>
          <div className={sari ? "" : "grid grid-cols-2 gap-2.5"}>
            {sari ? (
              <Compartment image={fit.image} crop={HER.sari} label="Sari" className="mx-auto max-w-[120px]" />
            ) : (
              <>
                <Compartment image={fit.image} crop={HER.top} label="Top" />
                <Compartment image={fit.image} crop={HER.bottom} label="Bottom" />
              </>
            )}
          </div>
        </div>

        <div>
          <p className="mb-2 font-serif text-sm italic text-coral">Him</p>
          <div className="grid grid-cols-2 gap-2.5">
            <Compartment image={fit.image} crop={HIM.top} label="Top" />
            <Compartment image={fit.image} crop={HIM.bottom} label="Bottom" />
            <Compartment image={fit.image} crop={HIM.shoes} label="Shoes" />
            <Compartment image={fit.image} crop={HIM.accessories} label="Details" />
          </div>
        </div>
      </div>
    </div>
  );
}
