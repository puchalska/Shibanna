"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useDragControls, type PanInfo } from "motion/react";
import { asset } from "@/lib/asset";
import { guides, type Guide, type GuideBlock } from "@/lib/site";

/* "Guides" — a shelf of book covers (Figma "Guides" frame), sitting
   between Preparation and the Timeline. Every cover's artwork —
   paper texture, wreath, title, and the two covers with a unique
   flight-path/animal graphic or a real photo — is the exact flattened
   render Figma produces (see the `guides` data in site.ts for why).

   Guides turned out to be real long-form reading (headings, lists,
   tables — see Street Life/New Delhi/Mental prep in site.ts), so a
   card that unfolded in place stopped making sense once there was
   this much to read. Tap a cover and it opens in an overlay instead:
   a centered, closable dialog on sm+, a bottom sheet below that
   (drag the handle down, or flick it, to dismiss — same spring
   physics as the site's other draggable bits). Both read straight on
   the site's own red paper ground, same as the old spread did.

   Closing: the Close pill, the backdrop, Escape, and — on the sheet —
   dragging the handle down. */

export default function Guides() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);
  const open = guides.find((g) => g.title === openTitle) ?? null;

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
        {guides.map((g) => (
          <button
            key={g.title}
            type="button"
            onClick={() => setOpenTitle(g.title)}
            className="block w-full cursor-pointer outline-none ring-coral transition-transform duration-150 hover:scale-[1.02] focus-visible:ring-2 active:scale-[0.98]"
          >
            <Cover image={g.image} title={g.title} />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && <GuideModal key={open.title} guide={open} onClose={() => setOpenTitle(null)} />}
      </AnimatePresence>
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

function GuideModal({ guide, onClose }: { guide: Guide; onClose: () => void }) {
  const dragControls = useDragControls();

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const onHandleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 600) onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      style={{ background: "rgba(30,1,2,0.6)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={guide.title}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={onHandleDragEnd}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)] sm:max-h-[85vh] sm:max-w-2xl sm:rounded-[8px] sm:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{ backgroundImage: `url(${asset("/figma/bg-red.jpg")})`, backgroundSize: "cover" }}
      >
        {/* drag handle — the only part of the sheet that starts a drag, so
            scrolling the guide's own text never fights with dismissing it */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="flex shrink-0 cursor-grab touch-none justify-center pb-1 pt-3 active:cursor-grabbing sm:hidden"
        >
          <div className="h-1 w-10 rounded-full" style={{ background: "rgba(255,149,149,0.35)" }} />
        </div>

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

        <div className="overflow-y-auto px-6 pb-8 pt-10 sm:px-10">
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
      </motion.div>
    </motion.div>
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
