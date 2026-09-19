"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { guides } from "@/lib/site";

/* "Guides" — a shelf of book covers (Figma "Guides" frame), sitting
   between Preparation and the Timeline. Every cover's artwork —
   paper texture, wreath, title, and the two covers with a unique
   flight-path/animal graphic or a real photo — is the exact flattened
   render Figma produces (see the `guides` data in site.ts for why).

   Click a cover and it "opens": the clicked cell takes the full grid
   row (col-span-full) and unfolds into a two-page spread — the cover
   as the left page, the written guide as the right page on a cream
   paper ground, with a spine shadow down the seam. Every other cover
   stays put around it, same as pulling one book off a shelf and
   opening it flat rather than navigating away. Same smooth
   grid-template-rows reveal Preparation's accordion cards use, so it
   reads as part of the same system.

   Closing has four redundant paths, since a small "×" alone is easy
   to miss: a labeled Close pill, clicking the cover page itself
   (closing the book you just opened), clicking anywhere outside the
   open spread, and Escape. */

export default function Guides() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);
  const openRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openTitle) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenTitle(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (openRef.current && !openRef.current.contains(e.target as Node)) {
        setOpenTitle(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openTitle]);

  return (
    <section id="guides" className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
      <p className="mb-2 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-coral-soft">
        A shelf for later
      </p>
      <h2 className="font-serif text-4xl italic text-coral sm:text-5xl">Guides</h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-coral-soft">
        Short reads for once you're here — hotels, flights, what to expect on the street, family customs, and more.
        Tap a cover to open it.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {guides.map((g) => {
          const isOpen = openTitle === g.title;
          return (
            <div key={g.title} className={isOpen ? "col-span-full" : undefined}>
              {isOpen ? (
                <OpenBook ref={openRef} guide={g} onClose={() => setOpenTitle(null)} />
              ) : (
                <button
                  type="button"
                  onClick={() => setOpenTitle(g.title)}
                  className="block w-full cursor-pointer outline-none ring-coral transition-transform duration-150 hover:scale-[1.02] focus-visible:ring-2 active:scale-[0.98]"
                >
                  <Cover image={g.image} title={g.title} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Cover({ image, title }: { image: string; title: string }) {
  return (
    <div
      className="relative aspect-[749/1025] overflow-hidden border-[6px] border-coral shadow-[6px_8px_18px_rgba(0,0,0,0.35)]"
      style={{ borderTopLeftRadius: 2, borderBottomLeftRadius: 2, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(image)} alt={title} className="absolute inset-0 size-full object-cover" />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[5px]"
        style={{ background: "linear-gradient(to bottom, rgba(217,217,217,0), #930f12)" }}
      />
    </div>
  );
}

function OpenBook({
  guide,
  onClose,
  ref,
}: {
  guide: { title: string; image: string; body: string };
  onClose: () => void;
  ref: React.Ref<HTMLDivElement>;
}) {
  const paragraphs = guide.body.split("\n\n").filter(Boolean);

  return (
    <div ref={ref} className="grid overflow-hidden rounded-[3px] shadow-[6px_10px_24px_rgba(0,0,0,0.4)]" style={{ gridTemplateRows: "1fr" }}>
      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,280px)_1fr]">
        {/* left page: the cover — click it to close, same as shutting the book */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close guide"
          title="Close"
          className="group relative cursor-pointer border-[6px] border-coral outline-none ring-coral focus-visible:ring-2"
          style={{ borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(guide.image)}
            alt={guide.title}
            className="block aspect-[749/1025] w-full object-cover transition-[filter] duration-150 group-hover:brightness-90 sm:h-full sm:aspect-auto"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-[rgba(75,1,3,0.55)] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <span className="font-label text-xs font-bold uppercase tracking-[0.2em] text-[var(--cream)]">
              Close book
            </span>
          </span>
        </button>

        {/* spine shadow, sitting in the seam between the two pages */}
        <div
          className="pointer-events-none hidden w-3 -translate-x-3 sm:block"
          style={{ background: "linear-gradient(to right, rgba(75,1,3,0.35), rgba(75,1,3,0))" }}
        />

        {/* right page: the written guide */}
        <div className="relative flex flex-col bg-[var(--cream)] px-6 py-7 sm:px-10 sm:py-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex cursor-pointer items-center gap-1.5 rounded-full py-1.5 pl-3 pr-2.5 text-xs font-bold outline-none ring-[var(--red-deep)] transition-colors duration-150 hover:bg-[var(--red-deep)]/10 focus-visible:ring-2 active:scale-95"
            style={{ color: "var(--red-deep)" }}
          >
            Close
            <span aria-hidden className="text-base leading-none">
              ×
            </span>
          </button>

          <p className="font-label text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--btn)" }}>
            Guide
          </p>
          <h3 className="mt-1 font-serif text-3xl italic" style={{ color: "var(--red-deep)" }}>
            {guide.title}
          </h3>

          <div className="mt-5 flex flex-col gap-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="max-w-prose text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
