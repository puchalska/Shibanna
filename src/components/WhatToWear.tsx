"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import type { Fit, Occasion } from "@/lib/site";
import { useSite, useUi } from "@/lib/site-context";
import NoteBubble from "./NoteBubble";
import Wardrobe from "./Wardrobe";
import LookGrid from "./LookGrid";

const ARROW = asset("/figma/outfit/note-arrow.svg");

function MobileNav({
  days,
  active,
  activeId,
  onSelect,
}: {
  days: { day: string; items: Occasion[] }[];
  active: Occasion;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  // day pills, plus a sub-pick only for days with more than one look
  // (Wedding day is Haldi or Wedding & Reception) — the Him/Her toggle
  // used to live here too, but moved up into the header for a cleaner,
  // less crowded sticky bar. Day pills use the real event name (Arrival,
  // Prewedding, …) instead of "Day 1/Day 2" — indexed by position, since
  // occasions.day is itself a translated string ("Dzień 1" in Polish),
  // not something to match a lookup key against. No background of its
  // own — same as the desktop sidebar's picker, it just sits on the page.
  const ui = useUi();
  const activeGroup = days.find((d) => d.day === active.day);

  return (
    <div className="sticky top-14 z-20 -mx-6 mt-6 flex flex-col gap-2 px-6 py-3 lg:hidden">
      <div className="flex flex-wrap gap-1.5">
        {days.map(({ day, items }, i) => {
          const on = day === active.day;
          return (
            <button
              key={day}
              type="button"
              aria-pressed={on}
              onClick={() => {
                if (!on) onSelect(items[0].id);
              }}
              className="cursor-pointer whitespace-nowrap rounded-[4px] px-3.5 py-1.5 text-left font-serif text-sm italic outline-none ring-coral transition-all duration-150 focus-visible:ring-2 active:scale-95"
              style={{
                background: on ? "var(--orange)" : "var(--red)",
                color: on ? "#642526" : "var(--coral)",
              }}
            >
              {ui.whatToWear.dayEvent[i] ?? day}
            </button>
          );
        })}
      </div>

      {activeGroup && activeGroup.items.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {activeGroup.items.map((o) => {
            const on = o.id === activeId;
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={on}
                onClick={() => onSelect(o.id)}
                className="cursor-pointer whitespace-nowrap rounded-full px-3 py-1 text-left font-label text-[11px] font-bold uppercase tracking-[0.08em] outline-none ring-coral transition-all duration-150 focus-visible:ring-2 active:scale-95"
                style={{
                  background: on ? "var(--coral)" : "transparent",
                  color: on ? "var(--red-deep)" : "var(--coral-soft)",
                  border: "1px solid var(--coral)",
                }}
              >
                {o.labels.join(" / ")}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PersonToggle({
  activePerson,
  onPersonChange,
}: {
  activePerson: "him" | "her";
  onPersonChange: (p: "him" | "her") => void;
}) {
  const ui = useUi();
  return (
    <div className="inline-flex gap-1 rounded-full border border-coral/40 p-1">
      {(["her", "him"] as const).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPersonChange(p)}
          aria-pressed={activePerson === p}
          className="cursor-pointer rounded-full px-6 py-1 font-label text-xs font-bold uppercase tracking-[0.12em] outline-none ring-coral transition-all duration-150 focus-visible:ring-2 active:scale-95"
          style={{
            background: activePerson === p ? "var(--orange)" : "transparent",
            color: activePerson === p ? "#642526" : "var(--coral)",
          }}
        >
          {p === "him" ? ui.whatToWear.him : ui.whatToWear.her}
        </button>
      ))}
    </div>
  );
}

function Collage({ fit, alt }: { fit: Fit; alt: string }) {
  return (
    <div
      key={fit.image}
      className="fit-fade relative mx-auto w-full max-w-[630px] sm:max-w-[720px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(fit.image)} alt={alt} width={820} height={834} className="w-full" />

      {/* him note — hand-drawn arrow curves down-right toward his collar */}
      <div className="absolute left-[1%] top-[9%] w-[34%] text-left">
        <p className="font-hand text-[11px] leading-snug text-cream-light sm:text-sm">
          {fit.notes.him}
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ARROW} alt="" aria-hidden className="mt-1 h-9 w-11 sm:h-10 sm:w-12" />
      </div>

      {/* her note — mirrored, curves down-left toward her collar */}
      <div className="absolute right-[1%] top-[9%] w-[34%] text-right">
        <p className="font-hand text-[11px] leading-snug text-cream-light sm:text-sm">
          {fit.notes.her}
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ARROW}
          alt=""
          aria-hidden
          className="ml-auto mt-1 h-9 w-11 -scale-x-100 sm:h-10 sm:w-12"
        />
      </div>
    </div>
  );
}

export default function WhatToWear() {
  const { occasions } = useSite();
  const ui = useUi();
  const [activeId, setActiveId] = useState(occasions[0].id);
  const [fitIndex, setFitIndex] = useState(0);
  const [activePerson, setActivePerson] = useState<"him" | "her">("him");
  const active = occasions.find((o) => o.id === activeId) ?? occasions[0];
  const currentFitIndex = fitIndex % active.fits.length;
  const fit = active.fits[currentFitIndex];
  // the wardrobe grid pools every look's garments and lets each slot
  // (top/bottom/shoes/bag) cycle on its own — there's no single "current
  // look" for it the way the flattened-photo occasions still have one
  const hasGrid = active.fits.some((f) => f.garments);

  const select = (id: string) => {
    setActiveId(id);
    setFitIndex(0);
  };

  // group occasions by day for the sidebar nav — Day 3 (Haldi + Wedding &
  // Reception) collapses onto one row, matching how the schedule already
  // treats them as one calendar day with two events
  const days: { day: string; items: Occasion[] }[] = [];
  for (const o of occasions) {
    let bucket = days.find((d) => d.day === o.day);
    if (!bucket) {
      bucket = { day: o.day, items: [] };
      days.push(bucket);
    }
    bucket.items.push(o);
  }

  return (
    <section id="what-to-wear" className="px-6 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-5xl">
        {/* grid-cols-1 explicitly, not just the bare "grid" implicit track
            it was — an implicit auto track sizes to its content's
            max-content and won't clamp to the viewport, which is what was
            actually pushing the outfit stage (and the whole page) wider
            than the screen on mobile. grid-cols-1 uses minmax(0,1fr), so
            it correctly shrinks the column to fit instead. */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* sidebar: title, day-grouped occasion nav, colour palette */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-serif text-4xl italic text-coral sm:text-5xl">
                {ui.whatToWear.heading}
              </h2>
              {/* Him/Her lives in the header now, not the sticky nav below —
                  a cleaner, less crowded bar once you've scrolled past it.
                  Mobile-only; sm+ already shows both cards side by side. */}
              {hasGrid && (
                <div className="sm:hidden">
                  <PersonToggle activePerson={activePerson} onPersonChange={setActivePerson} />
                </div>
              )}
            </div>

            {/* lg+: full stacked day-grouped picker in the sidebar */}
            <div className="mt-9 hidden flex-col gap-6 lg:flex">
              {days.map(({ day, items }) => (
                <div key={day} className="flex flex-col gap-3">
                  <p className="font-label text-xl font-bold text-coral">{day}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((o) => {
                      const on = o.id === activeId || o.fits === active.fits;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => select(o.id)}
                          className="cursor-pointer rounded-[4px] px-5 py-2.5 text-left font-serif text-xl italic outline-none ring-coral transition-all duration-150 hover:brightness-110 focus-visible:ring-2 active:scale-95"
                          style={{
                            background: on ? "var(--orange)" : "var(--red)",
                            color: on ? "#642526" : "var(--coral)",
                          }}
                        >
                          {o.labels.join(" / ")}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* stage: photo with arrow-callout notes, look picker + next outfit.
              min-w-0 on both wrappers — grid/flex items default to
              min-width:auto, so without it the outfit's own content width
              (not the column it's given) wins and the stage overflows the
              viewport on mobile instead of scaling down to fit it. */}
          <div className="flex min-w-0 flex-col items-center text-center lg:items-end lg:text-right">
            {/* the sticky nav lives here now, not in the (short) sidebar —
                position:sticky can only stay pinned while its own parent
                is in view, and the sidebar was barely 230px tall, so the
                nav unstuck and scrolled away almost immediately instead of
                staying reachable through the tall outfit card below it */}
            <MobileNav days={days} active={active} activeId={activeId} onSelect={select} />
            <div className="w-full min-w-0">
              {hasGrid ? (
                <LookGrid
                  fits={active.fits}
                  notes={active.fits[0].notes}
                  outfitScale={active.id === "wedding" ? 0.91 : undefined}
                  activePerson={activePerson}
                />
              ) : (
                <Collage fit={fit} alt={`${active.labels.join(" / ")} outfit — ${fit.name}`} />
              )}
            </div>

            {/* the wardrobe grid carries its own prev/next arrows on every
                cell (see LookGrid) — this picker is only needed as a
                fallback for looks still on the flattened-photo treatment */}
            {!hasGrid && (
              <div className="mt-4 flex items-center justify-center gap-4 self-center">
              {active.fits.length > 1 && (
                <div className="flex gap-2">
                  {active.fits.map((f, i) => {
                    const on = i === fitIndex % active.fits.length;
                    return (
                      <button
                        key={i}
                        type="button"
                        aria-label={f.name}
                        aria-pressed={on}
                        onClick={() => setFitIndex(i)}
                        className="flex size-11 cursor-pointer items-center justify-center rounded-full border-2 font-serif text-base italic outline-none ring-coral transition-all duration-150 hover:brightness-110 focus-visible:ring-2 active:scale-95"
                        style={{
                          background: on ? "var(--orange)" : "transparent",
                          borderColor: on ? "var(--orange)" : "var(--coral)",
                          color: on ? "#642526" : "var(--coral)",
                          opacity: on ? 1 : 0.65,
                          boxShadow: on ? "0 3px 8px rgba(0,0,0,0.35)" : undefined,
                        }}
                      >
                        {i + 1}
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
                {ui.whatToWear.nextOutfit}
              </button>
            </div>
            )}

            {!hasGrid && (
              <div className="mt-6 w-full">
                <Wardrobe fit={fit} />
              </div>
            )}

            <div className="mt-6 flex w-full flex-wrap items-center justify-end gap-4">
              <div className="flex flex-wrap gap-2">
                {active.colors.map((c, i) => (
                  <span
                    key={`${c}-${i}`}
                    className="size-6 rounded-full ring-1 ring-white/25"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <NoteBubble
                size="sm"
                background="#881817"
                text={ui.whatToWear.notDressCode}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
