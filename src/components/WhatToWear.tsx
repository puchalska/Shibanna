"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import { occasions, wearColors, type Fit } from "@/lib/site";

function Collage({ fit, alt }: { fit: Fit; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[400px] sm:max-w-[460px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(fit.image)} alt={alt} width={820} height={1000} className="w-full" />
      <div className="mt-3 flex justify-between gap-3 px-1">
        <p className="max-w-[46%] font-hand text-xs leading-snug text-cream-light sm:text-sm">
          {fit.notes.him}
        </p>
        <p className="max-w-[46%] text-right font-hand text-xs leading-snug text-cream-light sm:text-sm">
          {fit.notes.her}
        </p>
      </div>
    </div>
  );
}

export default function WhatToWear() {
  const [activeId, setActiveId] = useState(occasions[0].id);
  const [fitIndex, setFitIndex] = useState(0);
  const active = occasions.find((o) => o.id === activeId) ?? occasions[0];
  const fit = active.fits[fitIndex % active.fits.length];

  const select = (id: string) => {
    setActiveId(id);
    setFitIndex(0);
  };

  return (
    <section id="what-to-wear" className="px-6 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="text-center font-serif text-4xl italic text-coral sm:text-5xl">
          What to wear?
        </h2>

        {/* filters, e-commerce style: one horizontal bar up top, not a sidebar */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {occasions.map((o) => {
            const on = o.id === activeId || o.fits === active.fits;
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={on}
                onClick={() => select(o.id)}
                className="flex cursor-pointer flex-col items-center gap-0.5 rounded-[4px] border-2 px-4 py-2 text-center outline-none ring-coral transition-all duration-150 hover:brightness-110 focus-visible:ring-2 active:scale-95"
                style={{
                  background: on ? "var(--orange)" : "transparent",
                  borderColor: on ? "var(--orange)" : "var(--coral)",
                  color: on ? "#642526" : "var(--coral)",
                  opacity: on ? 1 : 0.65,
                  boxShadow: on ? "0 3px 8px rgba(0,0,0,0.35)" : undefined,
                }}
              >
                <span className="font-label text-[9px] font-bold uppercase tracking-[0.12em]">
                  {o.day}
                </span>
                <span className="font-serif text-base italic leading-tight">
                  {o.labels.join(" / ")}
                </span>
              </button>
            );
          })}
        </div>

        {/* stage: blurb, photo, look picker — centred and modestly sized so
            the filters + text carry as much weight as the photo does */}
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="max-w-md font-serif text-lg italic text-coral-soft">
            {active.blurb}
          </p>

          <div className="mt-5 w-full">
            <Collage fit={fit} alt={`${active.labels.join(" / ")} outfit — ${fit.name}`} />
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            {active.fits.length > 1 && (
              <div className="flex gap-2.5">
                {active.fits.map((f, i) => {
                  const on = i === fitIndex % active.fits.length;
                  return (
                    <button
                      key={i}
                      type="button"
                      aria-label={f.name}
                      aria-pressed={on}
                      onClick={() => setFitIndex(i)}
                      className="cursor-pointer p-1.5 outline-none transition-transform hover:scale-125 focus-visible:scale-125"
                    >
                      <span
                        className="block size-1.5 rounded-full transition-[background-color]"
                        style={{
                          background: on ? "var(--coral)" : "rgba(255,149,149,0.35)",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
            <button
              type="button"
              onClick={() => setFitIndex((v) => v + 1)}
              disabled={active.fits.length < 2}
              className="cursor-pointer rounded-[4px] border px-4 py-2.5 font-serif text-base not-italic shadow-[-6px_-2px_8px_rgba(0,0,0,0.21)] transition-all duration-150 hover:brightness-110 active:scale-95 disabled:cursor-default disabled:opacity-40 disabled:active:scale-100"
              style={{
                background: "var(--btn)",
                borderColor: "var(--red-deep)",
                color: "var(--coral)",
              }}
            >
              ✨ Next outfit
            </button>
          </div>
        </div>

        {/* colours: a quiet footnote, not competing with the filters above */}
        <div className="mt-14 flex flex-col items-center">
          <p className="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-coral-soft">
            Colours
          </p>
          <div className="mt-2.5 flex max-w-xs flex-wrap justify-center gap-1.5">
            {wearColors.map((c) => (
              <span
                key={c}
                className="size-5 rounded-full ring-1 ring-white/25"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
