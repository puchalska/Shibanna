"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import { occasions, wearColors } from "@/lib/site";

function Garment({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="flex w-24 shrink-0 flex-col items-center gap-1 sm:w-28">
      <div
        className="aspect-[3/4] w-full overflow-hidden rounded-[6px]"
        style={{ background: "#150303" }}
      >
        <img
          src={asset(src)}
          alt={caption}
          className="size-full object-contain"
          loading="lazy"
        />
      </div>
      <figcaption className="text-center font-label text-[11px] leading-tight text-coral-soft">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function WhatToWear() {
  const [activeId, setActiveId] = useState(occasions[0].id);
  const [variant, setVariant] = useState(0);
  const active = occasions.find((o) => o.id === activeId) ?? occasions[0];

  const him = active.him[variant % active.him.length];
  const her = active.her[variant % active.her.length];

  return (
    <section id="what-to-wear" className="px-6 py-16 sm:py-24">
      <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[minmax(0,340px)_1fr]">
        {/* left: occasion picker */}
        <div className="text-coral">
          <h2 className="font-serif text-4xl italic sm:text-5xl">What to wear?</h2>

          <p className="mt-2 font-label text-sm uppercase tracking-widest text-coral-soft">
            Occasion
          </p>
          <div className="mt-3 flex flex-col gap-4">
            {occasions.map((o) => {
              const on = o.id === activeId;
              return (
                <div key={o.id}>
                  <p className="mb-1 font-serif text-lg">{o.day}</p>
                  <div className="flex flex-wrap gap-2">
                    {o.labels.map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          setActiveId(o.id);
                          setVariant(0);
                        }}
                        aria-pressed={on}
                        className="rounded-[4px] px-4 py-2 font-serif text-base italic transition-colors"
                        style={{
                          background: on ? "var(--orange)" : "var(--red)",
                          color: on ? "var(--red-deep)" : "var(--coral)",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 font-label text-sm uppercase tracking-widest text-coral-soft">
            Colours
          </p>
          <div className="mt-3 grid max-w-[220px] grid-cols-6 gap-2">
            {wearColors.map((c) => (
              <span
                key={c}
                className="size-7 rounded-full ring-1 ring-white/30"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        {/* right: outfit board */}
        <div className="text-coral">
          <p className="font-serif text-xl italic text-coral-soft">{active.blurb}</p>

          <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-6">
            <div className="flex shrink-0 flex-col items-center gap-2">
              <div className="overflow-hidden rounded-[8px] bg-cream-light p-2">
                <img
                  src={asset("/figma/outfit-couple-illustration.jpg")}
                  alt="Bride & groom"
                  className="h-52 w-auto sm:h-60"
                />
              </div>
              <span className="font-label text-[11px] uppercase tracking-widest text-coral-soft">
                {active.labels.join(" · ")}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-5">
              <div className="flex flex-wrap gap-4">
                <Garment src={him.src} caption={him.caption} />
                <Garment src={her.src} caption={her.caption} />
                {active.extras.map((e) => (
                  <Garment key={e.src + e.caption} src={e.src} caption={e.caption} />
                ))}
              </div>

              <ul className="flex flex-col gap-2">
                {active.notes.map((n) => (
                  <li
                    key={n}
                    className="font-hand text-base leading-snug text-cream-light"
                  >
                    ✎ {n}
                  </li>
                ))}
              </ul>

              {(active.him.length > 1 || active.her.length > 1) && (
                <button
                  type="button"
                  onClick={() => setVariant((v) => v + 1)}
                  className="w-fit rounded-[4px] border px-5 py-2.5 font-serif text-base italic shadow-[-9px_-3px_10px_rgba(0,0,0,0.21)]"
                  style={{
                    background: "var(--btn)",
                    borderColor: "var(--red-deep)",
                    color: "var(--yellow)",
                  }}
                >
                  ✨ Next outfit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
