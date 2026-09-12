"use client";

import { useState } from "react";
import { timelineTicks, type Day, type TimelineBlock } from "@/lib/site";
import { pct, formatHour, segmentStyle, baseBarStyle } from "./Timeline";

/* The first thing you see entering Schedule: all five days on one shared
   6am-midnight axis — the "zoomed out" dose of the week's shape before you
   commit to reading any single day. Colour is just dark (free) vs orange
   (something's on), same code as the detail Timeline; the row label itself
   (in that day's own accent) is what tells you which day you're looking
   at. Hovering a block surfaces its time + name; clicking anywhere on a
   row selects that day (same selection the sticky WeekStrip drives, so
   the two stay in sync).

   Deliberately simpler than the per-day Timeline: overlapping blocks are
   not stacked into separate lanes here — at this zoomed-out level that
   would make every row a different height. The colour just deepens where
   two blocks overlap. Full detail (exact overlap, exact minutes) is one
   click away. */

export default function WeekOverview({
  days,
  activeId,
  onSelect,
}: {
  days: Day[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [hover, setHover] = useState<{ dayId: string; block: TimelineBlock } | null>(null);

  return (
    <div className="mb-10">
      <p className="mb-4 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-coral-soft">
        The week, at a glance
      </p>

      <div className="flex flex-col">
        {days.map((day) => {
          const active = day.id === activeId;
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => onSelect(day.id)}
              className="grid grid-cols-[84px_1fr] items-center gap-3 border-b border-coral/10 py-2.5 text-left transition-opacity duration-200 last:border-0 sm:grid-cols-[150px_1fr] sm:gap-5"
              style={{ opacity: active ? 1 : 0.6 }}
            >
              <span className="flex flex-col">
                <span
                  className="font-label text-[9px] font-bold uppercase tracking-[0.1em] sm:text-[10px]"
                  style={{ color: day.header.border }}
                >
                  {day.date}
                </span>
                <span
                  className="font-serif text-[15px] italic leading-tight sm:text-lg"
                  style={{ color: day.header.border }}
                >
                  {day.name}
                </span>
              </span>

              {/* positioning context for the tooltip — NOT clipped, so a
                  tooltip popped above the bar (via -top) stays visible */}
              <span className="relative h-[20px] w-full sm:h-[24px]">
                <span
                  className="absolute inset-0 overflow-hidden rounded-[2px]"
                  style={baseBarStyle}
                >
                  {day.blocks.map((b) => {
                    const l = pct(b.start);
                    const w = pct(b.end) - l;
                    return (
                      <span
                        key={b.label}
                        onMouseEnter={() => setHover({ dayId: day.id, block: b })}
                        onMouseLeave={() =>
                          setHover((h) => (h?.dayId === day.id && h.block === b ? null : h))
                        }
                        className="absolute inset-y-0"
                        style={{ left: `${l}%`, width: `${w}%`, ...segmentStyle(b.optional) }}
                      />
                    );
                  })}
                </span>

                {hover?.dayId === day.id && (
                  <span
                    className="pointer-events-none absolute -top-8 z-10 whitespace-nowrap rounded-[3px] px-2 py-1 font-label text-[10px] font-bold text-coral shadow-lg"
                    style={{ left: `${pct(hover.block.start)}%`, background: "var(--red-deep)" }}
                  >
                    {formatHour(hover.block.start)}–{formatHour(hover.block.end)} · {hover.block.label}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* shared axis — one set of ticks for all five rows */}
      <div className="grid grid-cols-[84px_1fr] gap-3 pt-2 sm:grid-cols-[150px_1fr] sm:gap-5">
        <span />
        <div className="flex justify-between font-serif text-xs text-coral-soft sm:text-sm">
          {timelineTicks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
