"use client";

import { useId } from "react";
import { asset } from "@/lib/asset";
import type { Day } from "@/lib/site";
import Timeline from "./Timeline";
import EventCard from "./EventCard";

/* Arrival / day section from Figma node 3209:11481:
   - "Block" header: coral 4px dashed border, transparent, Tiro italic 32px
   - Timeline
   - Note bubble: layered avatar + orange bubble (Alan Sans, pale yellow)
   - Section cards */

function NoteBubble({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative block size-[70px] shrink-0 overflow-hidden rounded-full">
        <img
          src={asset("/figma/schedule/avatar.jpg")}
          alt="Anna & Shib"
          className="absolute inset-0 size-full object-cover"
        />
        <img
          src={asset("/figma/schedule/overlay-orange.jpg")}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover mix-blend-hard-light"
        />
      </span>
      <p
        className="rounded-[6px] px-5 py-3.5 font-sans2 text-[17px] leading-snug sm:px-7 sm:text-xl"
        style={{ background: "var(--orange)", color: "var(--yellow)" }}
      >
        {text}
      </p>
    </div>
  );
}

export default function DayAccordion({
  day,
  open,
  onToggle,
}: {
  day: Day;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();

  return (
    <div className="scroll-mt-24" id={day.id}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full flex-wrap items-center justify-between gap-y-2 rounded-[3px] border-4 border-dashed py-5 pl-6 pr-4 text-left sm:pl-10 sm:pr-6"
        style={{
          background: day.header.fill,
          borderColor: day.header.border,
          color: day.header.text,
        }}
      >
        <span className="font-serif text-[24px] italic sm:text-[32px]">
          {day.date}
        </span>
        <span className="flex items-center gap-2.5">
          <span className="font-serif text-[24px] italic sm:text-[32px]">
            {day.name}
          </span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 48 48"
            fill="none"
            className={`transition-transform duration-300 ${open ? "" : "rotate-180"}`}
            aria-hidden
          >
            <path
              d="M30 27L24 21L18 27"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div id={panelId} hidden={!open} className="flex flex-col gap-6 py-8 sm:py-14">
        <Timeline blocks={day.blocks} />

        {day.note && <NoteBubble text={day.note} />}

        <div className="flex flex-col gap-1.5">
          {day.cards.map((card) => (
            <EventCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
