"use client";

import { useState } from "react";
import { days } from "@/lib/site";
import DayAccordion from "./DayAccordion";
import WeekOverview from "./WeekOverview";
import WeekStrip from "./WeekStrip";

export default function Schedule() {
  const [openId, setOpenId] = useState(days[0].id);

  const select = (id: string) => {
    setOpenId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="schedule"
      className="mx-auto w-full max-w-[1180px] px-6 py-8 sm:px-10"
    >
      <WeekOverview days={days} activeId={openId} onSelect={select} />
      <WeekStrip days={days} activeId={openId} onSelect={select} />
      <div className="mt-8 flex flex-col gap-12">
        {days.map((day) => (
          <DayAccordion
            key={day.id}
            day={day}
            open={day.id === openId}
            onToggle={() => select(day.id)}
          />
        ))}
      </div>
    </section>
  );
}
