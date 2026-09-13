import type { Day } from "@/lib/site";

/* Glanceable week-at-a-glance strip above the day accordions: one chip per
   day (date + name, coloured by that day's own header variant) that jumps
   to & opens the matching accordion. Sticks under the main nav while
   scrolling through the schedule, so switching days never needs a scroll
   back up. A day with any optional block gets a dotted border instead of
   solid — same "this part is flexible" language as the optional blocks
   on the Timeline bar, visible before you even open the day. */

export default function WeekStrip({
  days,
  activeId,
  onSelect,
}: {
  days: Day[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="sticky top-14 z-40 -mx-6 bg-red-mid/85 px-6 py-3 backdrop-blur-sm sm:top-16 sm:-mx-10 sm:px-10">
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto [mask-image:linear-gradient(to_right,black_94%,transparent)] sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:[mask-image:none]">
        {days.map((day) => {
          const active = day.id === activeId;
          const tinted = day.header.fill !== "transparent";
          const hasOptional = day.blocks.some((b) => b.optional);
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => onSelect(day.id)}
              aria-current={active || undefined}
              className="flex shrink-0 snap-start flex-col items-start gap-0.5 whitespace-nowrap rounded-[3px] border-2 px-3.5 py-2.5 text-left transition-all duration-200 sm:shrink sm:whitespace-normal"
              style={{
                background: active
                  ? tinted
                    ? day.header.fill
                    : "rgba(255,149,149,0.14)"
                  : "transparent",
                borderColor: day.header.border,
                borderStyle: hasOptional ? "dotted" : "solid",
                color: active && tinted ? day.header.text : day.header.border,
                opacity: active ? 1 : 0.55,
              }}
            >
              <span className="font-label text-[10px] font-bold uppercase tracking-[0.12em]">
                {day.date}
              </span>
              <span className="font-serif text-[17px] italic leading-tight">
                {day.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
