import { asset } from "@/lib/asset";
import {
  TIMELINE_START,
  TIMELINE_END,
  timelineTicks,
  type TimelineBlock,
} from "@/lib/site";

/* Timeline from Figma node 3209:11494 — a stone-textured bar (6am → midnight),
   orange-textured segments for scheduled blocks, dashed coral tick lines, and
   an orange label box connected to each segment. */

const span = TIMELINE_END - TIMELINE_START;
const pct = (h: number) => ((h - TIMELINE_START) / span) * 100;
const clamp = (n: number) => Math.max(0, Math.min(100, n));

export default function Timeline({ blocks }: { blocks: TimelineBlock[] }) {
  return (
    <div className="relative w-full py-10 sm:py-14">
      {/* label boxes + connectors (sm+) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-14 sm:block">
        {blocks.map((b) => {
          const mid = clamp((pct(b.start) + pct(b.end)) / 2);
          return (
            <div
              key={b.label}
              className="absolute flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${mid}%`, top: 0 }}
            >
              <span className="whitespace-nowrap rounded-[3px] bg-orange px-3 py-1.5 font-label text-[12px] font-bold text-ink md:text-[13px]">
                {b.label}
              </span>
              <span className="h-6 w-[3px] bg-orange" />
            </div>
          );
        })}
      </div>

      {/* bar */}
      <div
        className="relative h-3.5 w-full sm:h-4"
        style={{
          backgroundColor: "var(--stone)",
          backgroundImage: `url(${asset("/figma/schedule/stone.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {blocks.map((b) => (
          <div
            key={b.label}
            className="absolute inset-y-0"
            style={{
              left: `${clamp(pct(b.start))}%`,
              width: `${clamp(pct(b.end)) - clamp(pct(b.start))}%`,
              backgroundColor: "var(--orange)",
              backgroundImage: `url(${asset("/figma/schedule/overlay-orange.jpg")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        {/* dashed tick lines through the bar */}
        {[0, 33.333, 66.667, 100].map((x, i) => (
          <span
            key={i}
            className="absolute top-1/2 -translate-y-1/2 border-l-[3px] border-dashed border-coral"
            style={{
              left: `${x}%`,
              height: "60px",
              transform: `translate(${i === 0 ? "0" : i === 3 ? "-3px" : "-50%"}, -50%)`,
            }}
          />
        ))}
      </div>

      {/* tick labels */}
      <div className="mt-9 flex justify-between font-serif text-sm text-coral sm:text-base">
        {timelineTicks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      {/* stacked labels for mobile */}
      <ul className="mt-4 flex flex-wrap gap-2 sm:hidden">
        {blocks.map((b) => (
          <li
            key={b.label}
            className="rounded-[3px] bg-orange px-2.5 py-1 font-label text-xs font-bold text-ink"
          >
            {b.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
