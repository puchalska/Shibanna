import { asset } from "@/lib/asset";
import {
  TIMELINE_START,
  TIMELINE_END,
  timelineTicks,
  type TimelineBlock,
} from "@/lib/site";

/* Timeline from Figma node 3209:11494 — a stone-textured bar (6am → midnight),
   orange-textured segments for scheduled blocks, dashed coral tick lines, and
   an orange label box (Arimo bold, right-aligned) above each segment with a
   thin connector down to it. */

const span = TIMELINE_END - TIMELINE_START;
const pct = (h: number) => Math.max(0, Math.min(100, ((h - TIMELINE_START) / span) * 100));

/* give overlapping blocks their own stacked label row */
function withRows(blocks: TimelineBlock[]) {
  const rows: number[] = []; // row -> latest end%
  return blocks.map((b) => {
    const s = pct(b.start);
    let row = rows.findIndex((end) => s >= end - 0.01);
    if (row === -1) {
      row = rows.length;
      rows.push(0);
    }
    rows[row] = pct(b.end);
    return { b, row };
  });
}

export default function Timeline({ blocks }: { blocks: TimelineBlock[] }) {
  const placed = withRows(blocks);
  const rowCount = placed.reduce((m, p) => Math.max(m, p.row + 1), 1);
  const rowH = 34; // px per label row

  return (
    <div className="w-full">
      {/* label boxes + connectors (sm+) */}
      <div
        className="relative hidden sm:block"
        style={{ height: rowCount * rowH + 14 }}
      >
        {placed.map(({ b, row }) => {
          const l = pct(b.start);
          const w = pct(b.end) - l;
          return (
            <div
              key={b.label}
              className="absolute"
              style={{ left: `${l}%`, width: `${w}%`, bottom: 0 }}
            >
              <div
                className="flex items-center justify-end bg-orange px-2 py-1"
                style={{ marginBottom: row * rowH }}
              >
                <span className="truncate font-label text-[12px] font-bold text-ink md:text-[13px]">
                  {b.label}
                </span>
              </div>
              <span
                className="absolute left-1/2 w-[3px] -translate-x-1/2 bg-orange"
                style={{ top: `calc(100% - ${row * rowH}px)`, height: row * rowH + 8 }}
              />
            </div>
          );
        })}
      </div>

      {/* bar */}
      <div
        className="relative mt-2 h-4 w-full"
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
              left: `${pct(b.start)}%`,
              width: `${pct(b.end) - pct(b.start)}%`,
              backgroundColor: "var(--orange)",
              backgroundImage: `url(${asset("/figma/schedule/overlay-orange.jpg")})`,
              backgroundSize: "cover",
            }}
          />
        ))}

        {/* dashed coral tick lines */}
        {[0, 33.333, 66.667, 100].map((x, i) => (
          <span
            key={i}
            className="absolute top-1/2 h-[46px] border-l-[3px] border-dashed border-coral"
            style={{
              left: `${x}%`,
              transform: `translate(${i === 3 ? "-3px" : i === 0 ? "0" : "-1.5px"}, -50%)`,
            }}
          />
        ))}
      </div>

      {/* tick labels */}
      <div className="mt-7 flex justify-between font-serif text-[15px] text-coral sm:text-base">
        {timelineTicks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      {/* stacked labels for mobile */}
      <ul className="mt-4 flex flex-wrap gap-2 sm:hidden">
        {blocks.map((b) => (
          <li
            key={b.label}
            className="bg-orange px-2.5 py-1 font-label text-xs font-bold text-ink"
          >
            {b.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
