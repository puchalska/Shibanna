"use client";

import { asset } from "@/lib/asset";
import { useSite, useUi } from "@/lib/site-context";

export default function Footer() {
  const { anniversaryNote, couple } = useSite();
  const ui = useUi();
  return (
    <footer className="mx-auto w-full max-w-4xl px-6 pb-24 pt-10 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/figma/cover/annashib.svg")}
        alt={couple.names}
        className="mx-auto w-[220px] max-w-[70%] sm:w-[280px]"
      />
      <p className="mt-6 font-serif text-lg text-coral">
        {couple.place} · {couple.dates}
      </p>
      <p className="mt-8 font-label text-xs uppercase tracking-[0.25em] text-coral-soft">
        {ui.footer.seeYouThere}
      </p>
      <p className="mx-auto mt-6 max-w-sm font-serif text-base italic leading-snug text-coral-soft">
        {anniversaryNote}
      </p>
    </footer>
  );
}
