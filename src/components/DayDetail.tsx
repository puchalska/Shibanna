import type { Day } from "@/lib/site";
import Timeline from "./Timeline";
import EventCard from "./EventCard";

/* Day section from Figma node 3209:11481:
   - "Block" header: dashed border in that day's own colour, Tiro italic 32px
   - Timeline
   - Section cards

   One day at a time — WeekOverview/WeekStrip are the nav, this just
   renders whichever day is currently selected. No expand/collapse of its
   own; picking a different day up top swaps what's rendered here. */

export default function DayDetail({ day }: { day: Day }) {
  return (
    <div>
      <div className="flex flex-col gap-6 py-8 sm:py-14">
        <Timeline blocks={day.blocks} />

        <div className="grid gap-3 sm:grid-cols-2">
          {day.cards.map((card) => (
            <EventCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
