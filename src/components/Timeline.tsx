import { asset } from "@/lib/asset";
import {
  TIMELINE_START,
  TIMELINE_END,
  timelineTicks,
  type TimelineBlock,
} from "@/lib/site";

/* Timeline from Figma node 3209:11494 — a stone-textured bar (6am → midnight),
   tinted segments for scheduled blocks (tinted by that day's own accent —
   see `accent`, shared with WeekOverview/WeekStrip so a day reads the same
   colour everywhere), dashed coral tick lines, and a label box above each
   segment with a thin connector down to it.

   Segments use a resolution-independent CSS hatch + inset shadow for grain
   instead of a photographic texture stretched to fit — a raster image
   `cover`-fit into a narrow box either blurs or shows the same static crop
   regardless of segment width; the CSS pattern stays crisp at any size and
   tints correctly with the day's accent instead of always reading orange. */

const span = TIMELINE_END - TIMELINE_START;
export const pct = (h: number) =>
  Math.max(0, Math.min(100, ((h - TIMELINE_START) / span) * 100));

export function formatHour(h: number) {
  if (h === 12) return "noon";
  if (h === 24 || h === 0) return "midnight";
  const period = h < 12 ? "am" : "pm";
  let hour = Math.floor(h) % 12;
  if (hour === 0) hour = 12;
  const mins = Math.round((h % 1) * 60);
  return mins ? `${hour}:${String(mins).padStart(2, "0")}${period}` : `${hour}${period}`;
}

/** shared "grain" for every busy block, tinted to the day's own accent */
export function segmentStyle(accent: string, optional?: boolean): React.CSSProperties {
  return {
    backgroundColor: `color-mix(in srgb, ${accent} ${optional ? 22 : 82}%, transparent)`,
    backgroundImage:
      "repeating-linear-gradient(127deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 1.5px, transparent 1.5px, transparent 7px)",
    boxShadow: optional
      ? undefined
      : "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -2px 3px rgba(0,0,0,0.32)",
    border: optional ? `1.5px dashed ${accent}` : undefined,
  };
}

const MINOR_TICKS = [9, 15, 21];

/* give overlapping blocks their own stacked lane, reused by both the bar
   segments and the floating labels above them */
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

export default function Timeline({
  blocks,
  accent = "var(--orange)",
}: {
  blocks: TimelineBlock[];
  accent?: string;
}) {
  const placed = withRows(blocks);
  const rowCount = placed.reduce((m, p) => Math.max(m, p.row + 1), 1);
  const rowH = 44; // px per label row
  const laneH = 14; // px per bar lane
  const laneGap = 4;
  const barHeight = rowCount * laneH + (rowCount - 1) * laneGap;

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
                className="flex flex-col items-end gap-0.5 px-2 py-1"
                style={{
                  marginBottom: row * rowH,
                  background: b.optional
                    ? `color-mix(in srgb, ${accent} 30%, transparent)`
                    : accent,
                  border: b.optional ? `1.5px dashed ${accent}` : undefined,
                }}
              >
                <span className="whitespace-nowrap font-label text-[10px] font-bold uppercase tracking-[0.06em] text-ink/70">
                  {formatHour(b.start)}–{formatHour(b.end)}
                </span>
                <span className="truncate font-label text-[12px] font-bold text-ink md:text-[13px]">
                  {b.label}
                </span>
              </div>
              <span
                className="absolute left-1/2 w-[3px] -translate-x-1/2"
                style={{
                  top: `calc(100% - ${row * rowH}px)`,
                  height: row * rowH + 8,
                  background: accent,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* bar */}
      <div
        className="relative mt-2 w-full overflow-hidden rounded-[2px]"
        style={{
          height: barHeight,
          backgroundColor: "var(--stone)",
          backgroundImage: `url(${asset("/figma/schedule/stone.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 2px 5px rgba(0,0,0,0.45)",
        }}
      >
        {placed.map(({ b, row }) => (
          <div
            key={b.label}
            className="absolute rounded-[2px]"
            style={{
              left: `${pct(b.start)}%`,
              width: `${pct(b.end) - pct(b.start)}%`,
              top: row * (laneH + laneGap),
              height: laneH,
              ...segmentStyle(accent, b.optional),
            }}
          />
        ))}

        {/* minor hour ticks */}
        {MINOR_TICKS.map((h) => (
          <span
            key={h}
            className="absolute top-0 bottom-0 w-px bg-coral/25"
            style={{ left: `${pct(h)}%` }}
          />
        ))}

        {/* major dashed coral tick lines */}
        {[0, 33.333, 66.667, 100].map((x, i) => (
          <span
            key={i}
            className="absolute border-l-[3px] border-dashed border-coral"
            style={{
              left: `${x}%`,
              top: -10,
              bottom: -10,
              transform: `translateX(${i === 3 ? "-3px" : i === 0 ? "0" : "-1.5px"})`,
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

      {/* stacked labels for mobile — same time info as the desktop callouts */}
      <ul className="mt-4 flex flex-col gap-1.5 sm:hidden">
        {blocks.map((b) => (
          <li
            key={b.label}
            className="flex items-baseline gap-2 px-2.5 py-1.5 font-label text-xs font-bold text-ink"
            style={{
              background: b.optional
                ? `color-mix(in srgb, ${accent} 30%, transparent)`
                : accent,
              border: b.optional ? `1.5px dashed ${accent}` : undefined,
            }}
          >
            <span className="shrink-0 tracking-[0.04em] text-ink/70">
              {formatHour(b.start)}–{formatHour(b.end)}
            </span>
            <span>{b.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
