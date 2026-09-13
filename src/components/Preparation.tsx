"use client";

import { useState } from "react";
import { hotels, preparation } from "@/lib/site";

/* "What you need to prepare" (guest-info doc) — practical pre-trip
   logistics: visa, insurance/vaccine, flights, packing, gift, hotels. Cards
   echo the dashed-border "Block" language already used for the day
   headers, so this reads as part of the same system rather than a
   bolted-on FAQ. Collapsed to just a title by default — ten cards of body
   text at once was a wall; tap one open at a time (or several). */

const cards = [
  {
    title: "Visa",
    body: `${preparation.visa.body} (${preparation.visa.cost})`,
    link: preparation.visa.link,
    linkLabel: preparation.visa.linkLabel,
  },
  {
    title: "Insurance",
    body: preparation.insurance,
  },
  {
    title: "Vaccination",
    body: preparation.vaccine,
  },
  {
    title: "Medication",
    body: preparation.medication,
  },
  {
    title: "Flights",
    body: preparation.flights.body,
    note: preparation.flights.example,
  },
  {
    title: "Payments",
    body: preparation.payments,
  },
  {
    title: "Get an e-SIM",
    body: preparation.esim,
  },
  {
    title: "Packing",
    body: preparation.packing,
  },
  {
    title: "Gift",
    body: preparation.gift,
  },
  {
    title: "Mental preparedness",
    body: preparation.mentalPrep,
    link: "https://www.google.com/maps/place/Sambalpur,+Odisha,+India",
    linkLabel: "See Sambalpur on Google Maps",
  },
];

// row groups for the toggle behaviour below — matches the lg:grid-cols-3
// layout, so "expand" always means "expand this whole row together"
const ROW_SIZE = 3;
const rows = Array.from({ length: Math.ceil(cards.length / ROW_SIZE) }, (_, i) =>
  cards.slice(i * ROW_SIZE, i * ROW_SIZE + ROW_SIZE),
);

export default function Preparation() {
  const [openRows, setOpenRows] = useState<Set<number>>(new Set());

  const toggleRow = (rowIndex: number) => {
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowIndex)) {
        next.delete(rowIndex);
      } else {
        next.add(rowIndex);
      }
      return next;
    });
  };

  return (
    <section
      id="prepare"
      className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24"
    >
      <p className="mb-2 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-coral-soft">
        Before you travel
      </p>
      <h2 className="font-serif text-4xl italic text-coral sm:text-5xl">
        Preparation
      </h2>

      <div className="mt-10 grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((row, rowIndex) => {
          const isOpen = openRows.has(rowIndex);
          return row.map((c) => (
            <div
              key={c.title}
              className="flex h-full flex-col rounded-[3px] border-2 border-dashed border-coral/35"
            >
              <button
                type="button"
                onClick={() => toggleRow(rowIndex)}
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
                  <div className="px-5 pb-4">
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
          ));
        })}
      </div>

      <p className="mt-12 font-serif text-xl italic text-coral">
        Where you’ll stay
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
