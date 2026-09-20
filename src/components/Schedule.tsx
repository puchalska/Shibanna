"use client";

import { useState } from "react";
import { useSite } from "@/lib/site-context";
import DayDetail from "./DayDetail";
import WeekOverview from "./WeekOverview";
import WeekStrip from "./WeekStrip";

export default function Schedule() {
  const { days } = useSite();
  const [activeId, setActiveId] = useState(days[0].id);
  const active = days.find((d) => d.id === activeId) ?? days[0];

  const select = (id: string) => {
    setActiveId(id);
    document.getElementById("day-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="schedule"
      className="mx-auto w-full max-w-[1180px] px-6 py-8 sm:px-10"
    >
      <WeekOverview days={days} />
      <WeekStrip days={days} activeId={activeId} onSelect={select} />
      <div id="day-detail" className="scroll-mt-24 pt-8">
        <DayDetail key={active.id} day={active} />
      </div>
    </section>
  );
}
