"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { guides, type Guide, type GuideBlock } from "@/lib/site";

/* "Guides" — a shelf of book covers (Figma "Guides" frame), sitting
   between Preparation and the Timeline. Every cover's artwork —
   paper texture, wreath, title, and the two covers with a unique
   flight-path/animal graphic or a real photo — is the exact flattened
   render Figma produces (see the `guides` data in site.ts for why).

   Click a cover and it "opens": the clicked cell takes the full grid
   row (col-span-full) and unfolds into a two-page spread — the cover
   as the left page, the written guide as the right page, with a
   spine shadow down the seam. Every other cover stays put around it,
   same as pulling one book off a shelf and opening it flat rather
   than navigating away.

   The right page reads directly on the site's own red paper ground
   (same texture as the covers), not inside a white panel — white is
   reserved for the small "Guide" label tag, same restrained role it
   plays everywhere else on the site. Body text and any future images
   sit straight on the red, coral/cream ink, matching how every other
   section here presents content.

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
  guide: Guide;
  onClose: () => void;
  ref: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={ref}
      className="flex flex-col overflow-hidden rounded-[3px] shadow-[6px_10px_24px_rgba(0,0,0,0.4)] sm:h-[min(640px,75vh)] sm:flex-row"
      style={{ backgroundImage: `url(${asset("/figma/bg-red.jpg")})`, backgroundSize: "cover" }}
    >
      {/* left page: the cover — click it to close, same as shutting the book.
          Crops to match the spread's height on sm+ (instead of keeping its
          own aspect ratio) so it never runs shorter or taller than a right
          page that scrolls independently. */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close guide"
        title="Close"
        className="group relative w-full shrink-0 cursor-pointer border-[6px] border-coral outline-none ring-coral focus-visible:ring-2 sm:h-full sm:w-[280px]"
        style={{ borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(guide.image)}
          alt={guide.title}
          className="block aspect-[749/1025] w-full object-cover transition-[filter] duration-150 group-hover:brightness-90 sm:aspect-auto sm:h-full"
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
        style={{ background: "linear-gradient(to right, rgba(75,1,3,0.45), rgba(75,1,3,0))" }}
      />

      {/* right page: the written guide, straight on the red ground —
          scrolls on its own once content runs past the spread's height,
          rather than growing the whole card past a readable size */}
      <div className="relative flex flex-1 flex-col overflow-y-auto px-6 py-7 sm:px-10 sm:py-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex cursor-pointer items-center gap-1.5 rounded-full bg-[rgba(255,149,149,0.12)] py-1.5 pl-3 pr-2.5 text-xs font-bold text-coral outline-none ring-coral transition-colors duration-150 hover:bg-[rgba(255,149,149,0.22)] focus-visible:ring-2 active:scale-95"
        >
          Close
          <span aria-hidden className="text-base leading-none">
            ×
          </span>
        </button>

        <span
          className="inline-block w-fit rounded-[3px] px-2.5 py-1 font-label text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ background: "var(--cream)", color: "var(--btn)" }}
        >
          Guide
        </span>
        <h3 className="mt-3 font-serif text-3xl italic text-coral">{guide.title}</h3>

        <div className="mt-5 flex max-w-prose flex-col gap-4">
          {typeof guide.body === "string"
            ? guide.body
                .split("\n\n")
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-coral-soft">
                    {p}
                  </p>
                ))
            : guide.body.map((block, i) => <GuideBlockView key={i} block={block} />)}
        </div>
      </div>
    </div>
  );
}

function GuideBlockView({ block }: { block: GuideBlock }) {
  switch (block.kind) {
    case "heading":
      return (
        <h4 className="mt-3 font-serif text-xl italic text-coral first:mt-0">{block.text}</h4>
      );
    case "subheading":
      return (
        <p className="mt-1 font-label text-[11px] font-bold uppercase tracking-[0.16em] text-coral">
          {block.text}
        </p>
      );
    case "p":
      return <p className="text-sm leading-relaxed text-coral-soft">{block.text}</p>;
    case "list":
      return (
        <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-coral-soft">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-coral">
                &middot;
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="-mx-1 overflow-x-auto px-1">
          <table className="w-full min-w-[420px] border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-[rgba(255,149,149,0.3)] py-1.5 pr-4 font-label text-[10px] font-bold uppercase tracking-[0.12em] text-coral"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border-b border-[rgba(255,149,149,0.12)] py-1.5 pr-4 align-top leading-relaxed text-coral-soft"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
