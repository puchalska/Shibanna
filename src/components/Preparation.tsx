"use client";

import { useState } from "react";
import { useSite, useUi } from "@/lib/site-context";

/* "What you need to prepare" (guest-info doc) — practical pre-trip
   logistics: visa, insurance/vaccine, flights, packing, gift, hotels. Cards
   echo the dashed-border "Block" language already used for the day
   headers, so this reads as part of the same system rather than a
   bolted-on FAQ. Collapsed to just a title by default — ten cards of body
   text at once was a wall. Only one open at a time: opening a card closes
   whichever was open, and the open card takes the full grid row (instead
   of staying cramped in its own cell) so its text has room to breathe. */

export default function Preparation() {
  const { hotels, preparation } = useSite();
  const ui = useUi();
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  const toggle = (title: string) => {
    setOpenTitle((prev) => (prev === title ? null : title));
  };

  const cards = [
    {
      title: ui.preparation.cardTitles.visa,
      body: `${preparation.visa.body} (${preparation.visa.cost})`,
      link: preparation.visa.link,
      linkLabel: preparation.visa.linkLabel,
    },
    {
      title: ui.preparation.cardTitles.insurance,
      body: preparation.insurance,
    },
    {
      title: ui.preparation.cardTitles.vaccination,
      body: preparation.vaccine,
    },
    {
      title: ui.preparation.cardTitles.medication,
      body: preparation.medication,
    },
    {
      title: ui.preparation.cardTitles.flights,
      body: preparation.flights.body,
      note: preparation.flights.example,
    },
    {
      title: ui.preparation.cardTitles.payments,
      body: preparation.payments,
    },
    {
      title: ui.preparation.cardTitles.esim,
      body: preparation.esim,
    },
    {
      title: ui.preparation.cardTitles.packing,
      body: preparation.packing,
    },
    {
      title: ui.preparation.cardTitles.gift,
      body: preparation.gift,
    },
    {
      title: ui.preparation.cardTitles.mentalPrep,
      body: preparation.mentalPrep,
      link: "https://www.google.com/maps/place/Sambalpur,+Odisha,+India",
      linkLabel: ui.preparation.mentalPrepLink,
    },
  ];

  return (
    <section
      id="prepare"
      className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24"
    >
      <p className="mb-2 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-coral-soft">
        {ui.preparation.eyebrow}
      </p>
      <h2 className="font-serif text-4xl italic text-coral sm:text-5xl">
        {ui.preparation.heading}
      </h2>

      <div className="mt-10 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const isOpen = openTitle === c.title;
          return (
            <div
              key={c.title}
              className={`flex h-full flex-col rounded-[3px] border-2 border-dashed border-coral/35 ${isOpen ? "sm:col-span-2 lg:col-span-3" : ""}`}
            >
              <button
                type="button"
                onClick={() => toggle(c.title)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left outline-none ring-inset ring-coral focus-visible:ring-2"
              >
                <span className="font-serif text-xl italic text-coral">
                  {c.title}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 font-serif text-2xl leading-none text-coral-soft transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>
              </button>

              <div
                className="grid flex-1 transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="max-w-prose px-5 pb-4">
                    <p className="text-sm leading-[1.5] text-coral-soft">
                      {c.body}
                    </p>
                    {c.note && (
                      <p className="mt-1.5 text-xs italic text-coral-soft/70">
                        {c.note}
                      </p>
                    )}
                    {c.link && (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block font-label text-xs font-bold uppercase tracking-[0.1em] text-orange underline underline-offset-4"
                      >
                        {c.linkLabel}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-12 font-serif text-xl italic text-coral">
        {ui.preparation.whereToStay}
      </p>
      <div className="mt-3 flex flex-col gap-2">
        {hotels.map((h) => (
          <a
            key={h.name}
            href={h.link}
            target="_blank"
            rel="noreferrer"
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-[3px] border-2 border-dashed border-coral/35 px-5 py-3 transition-colors hover:border-coral"
          >
            <span className="font-serif text-lg italic text-coral">
              {h.name}
            </span>
            <span className="font-label text-xs uppercase tracking-[0.1em] text-coral-soft">
              {h.dates}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
