import { days } from "@/lib/site";
import DayAccordion from "./DayAccordion";

export default function Schedule() {
  return (
    <section
      id="schedule"
      className="mx-auto w-full max-w-[1180px] px-6 py-8 sm:px-10"
    >
      <div className="flex flex-col gap-12">
        {days.map((day, i) => (
          <DayAccordion key={day.id} day={day} defaultOpen={i < 4} />
        ))}
      </div>
    </section>
  );
}
