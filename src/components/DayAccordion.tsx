"use client";

import { useId, useState } from "react";
import { asset } from "@/lib/asset";
import type { Day } from "@/lib/site";
import Timeline from "./Timeline";
import EventCard from "./EventCard";

export default function DayAccordion({
  day,
  defaultOpen = false,
}: {
  day: Day;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  const headerBg = day.tone === "orange" ? "var(--orange)" : "var(--cream)";

  return (
    <div className="scroll-mt-6" id={day.id}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="deckle flex w-full items-center justify-between gap-4 px-6 py-4 text-left sm:px-9 sm:py-5"
        style={{ background: headerBg, color: "var(--red-deep)" }}
      >
        <span className="font-serif text-lg sm:text-xl">{day.date}</span>
        <span className="flex items-center gap-3">
          <span className="font-serif text-lg italic sm:text-2xl">{day.name}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`transition-transform duration-300 ${open ? "" : "rotate-180"}`}
            aria-hidden
          >
            <path
              d="M4 12l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div id={panelId} hidden={!open} className="pt-6">
        {day.note && (
          <div className="mb-6 flex items-start gap-3">
            <img
              src={asset("/figma/couple-selfie.jpg")}
              alt="Anna & Shib"
              className="size-10 shrink-0 rounded-full object-cover"
              loading="lazy"
            />
            <p
              className="flex-1 rounded-[6px] px-4 py-3 font-label text-sm leading-snug"
              style={{ background: "var(--orange)", color: "var(--cream-light)" }}
            >
              {day.note}
            </p>
          </div>
        )}

        <Timeline blocks={day.blocks} />

        <div className="mt-6 flex flex-col gap-4">
          {day.cards.map((card) => (
            <EventCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
