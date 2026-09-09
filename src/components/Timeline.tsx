import { asset } from "@/lib/asset";
import {
  TIMELINE_START,
  TIMELINE_END,
  timelineTicks,
  type TimelineBlock,
} from "@/lib/site";

const span = TIMELINE_END - TIMELINE_START;
const pct = (h: number) => ((h - TIMELINE_START) / span) * 100;

export default function Timeline({ blocks }: { blocks: TimelineBlock[] }) {
  return (
    <div className="py-6">
      {/* labels */}
      <div className="relative mb-2 hidden h-7 sm:block">
        {blocks.map((b) => (
          <div
            key={b.label}
            className="absolute -translate-x-1/2"
            style={{ left: `${(pct(b.start) + pct(b.end)) / 2}%` }}
          >
            <span className="whitespace-nowrap rounded-[3px] bg-orange px-3 py-1 font-label text-[13px] font-bold text-ink">
              {b.label}
            </span>
          </div>
        ))}
      </div>

      {/* bar */}
      <div
        className="relative h-4 w-full overflow-hidden rounded-[2px]"
        style={{
          backgroundColor: "var(--stone)",
          backgroundImage: `url(${asset("/figma/tex-stone.jpg")})`,
          backgroundSize: "cover",
        }}
      >
        {blocks.map((b) => (
          <div
            key={b.label}
            className="absolute inset-y-0"
            style={{
              left: `${pct(b.start)}%`,
              width: `${pct(b.end) - pct(b.start)}%`,
              backgroundColor: "var(--orange)",
              backgroundImage: `url(${asset("/figma/tex-orange-linen.jpg")})`,
              backgroundSize: "cover",
            }}
          />
        ))}
      </div>

      {/* ticks */}
      <div className="mt-2 flex justify-between font-serif text-sm text-coral">
        {timelineTicks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      {/* stacked labels for mobile */}
      <ul className="mt-3 flex flex-wrap gap-2 sm:hidden">
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
