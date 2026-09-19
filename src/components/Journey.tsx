import { journey } from "@/lib/site";

/* "The Guest Journey" — the trip broken into its smallest actual steps,
   deliberately over-explicit (nothing bundled, nothing assumed). Chips
   over prose on purpose: scannable at a glance, one action per chip.
   Each chip links to whichever section actually has the detail behind
   it (Preparation or Timeline), same chip look as What to Wear's
   occasion tags so it reads as part of the same system. */

export default function Journey() {
  return (
    <section id="journey" className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
      <p className="mb-2 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-coral-soft">
        Start to finish
      </p>
      <h2 className="font-serif text-4xl italic text-coral sm:text-5xl">
        The Guest Journey
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-coral-soft">
        Every step, spelled out — from booking your flight to touching down back home. Tap a chip to jump to the
        details.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {journey.map((phase) => (
          <div key={phase.name}>
            <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-label text-xs font-bold uppercase tracking-[0.14em] text-coral">{phase.date}</p>
              <p className="font-serif text-xl italic text-coral-soft">{phase.name}</p>
            </div>

            <div className="flex flex-col gap-4">
              {phase.groups.map((group, gi) => (
                <div key={gi}>
                  {group.label && (
                    <p className="mb-2 font-label text-[10px] font-bold uppercase tracking-[0.1em] text-coral-soft/70">
                      {group.label}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {group.steps.map((step) => (
                      <a
                        key={step}
                        href={group.href}
                        className="rounded-[4px] px-4 py-2 font-serif text-sm italic transition-all duration-150 hover:brightness-110 active:scale-95"
                        style={{
                          background: phase.accent === "orange" ? "var(--orange)" : "var(--red)",
                          color: phase.accent === "orange" ? "#642526" : "var(--coral)",
                        }}
                      >
                        {step}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
