"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import { occasions, wearColors, type Fit } from "@/lib/site";

function Collage({ fit, alt }: { fit: Fit; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(fit.image)} alt={alt} width={1000} height={580} className="w-full" />
    </div>
  );
}

/** group consecutive same-day occasions under one "Day N" header — Haldi
 *  and Wedding & Reception are both Day 3, each independently selectable */
function groupByDay(list: typeof occasions) {
  return list.reduce<{ day: string; occasions: typeof occasions }[]>((groups, o) => {
    const last = groups[groups.length - 1];
    if (last?.day === o.day) last.occasions.push(o);
    else groups.push({ day: o.day, occasions: [o] });
    return groups;
  }, []);
}

export default function WhatToWear() {
  const [activeId, setActiveId] = useState(occasions[0].id);
  const [fitIndex, setFitIndex] = useState(0);
  const active = occasions.find((o) => o.id === activeId) ?? occasions[0];
  const fit = active.fits[fitIndex % active.fits.length];
  const dayGroups = groupByDay(occasions);

  const select = (id: string) => {
    setActiveId(id);
    setFitIndex(0);
  };

  return (
    <section id="what-to-wear" className="px-6 py-16 sm:py-24">
      <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[minmax(0,320px)_1fr]">
        {/* left: occasion picker */}
        <div className="text-coral">
          <h2 className="font-serif text-4xl italic sm:text-5xl">What to wear?</h2>

          <p className="mt-3 font-serif text-[26px] not-italic sm:text-[30px]">
            Occasion
          </p>
          <div className="mt-3 flex flex-col gap-4">
            {dayGroups.map((group) => (
              <div key={group.day}>
                <p className="mb-1.5 font-label text-[18px] font-bold text-coral">
                  {group.day}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.occasions.map((o) =>
                    o.labels.map((label) => {
                      const on = o.id === activeId;
                      return (
                        <button
                          key={label}
                          type="button"
                          aria-pressed={on}
                          onClick={() => select(o.id)}
                          className="rounded-[4px] px-5 font-serif text-[20px] italic transition-colors"
                          style={{
                            background: on ? "var(--orange)" : "var(--red)",
                            color: on ? "#642526" : "var(--coral)",
                            paddingTop: on ? 10 : 10,
                            paddingBottom: on ? 8 : 10,
                          }}
                        >
                          {label}
                        </button>
                      );
                    }),
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 font-serif text-[26px] not-italic sm:text-[30px]">
            Colours
          </p>
          <div className="mt-3 grid max-w-[224px] grid-cols-6 gap-2">
            {wearColors.map((c) => (
              <span
                key={c}
                className="size-7 rounded-full ring-1 ring-white/25"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        {/* right: styling stage */}
        <div>
          <p className="font-serif text-xl italic text-coral-soft">{active.blurb}</p>

          <div className="mt-6 flex flex-col items-center">
            <span
              className="rounded-full px-5 py-2 font-serif text-lg italic text-coral"
              style={{ background: "rgba(75,1,3,0.5)" }}
            >
              {active.labels.join(" · ")}
            </span>

            <div className="mt-4 w-full">
              <Collage fit={fit} alt={`${active.labels.join(" / ")} outfit — ${fit.name}`} />
            </div>

            <div className="mt-2 flex items-center justify-center gap-4">
              {active.fits.length > 1 && (
                <div className="flex gap-1.5">
                  {active.fits.map((_, i) => (
                    <span
                      key={i}
                      className="size-1.5 rounded-full"
                      style={{
                        background:
                          i === fitIndex % active.fits.length
                            ? "var(--coral)"
                            : "rgba(255,149,149,0.35)",
                      }}
                    />
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setFitIndex((v) => v + 1)}
                disabled={active.fits.length < 2}
                className="rounded-[4px] border px-[21px] py-3.5 font-serif text-[22px] not-italic shadow-[-9px_-3px_10px_rgba(0,0,0,0.21)] disabled:opacity-40"
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
        </div>
      </div>
    </section>
  );
}
