import { asset } from "@/lib/asset";

/* Layered avatar + orange speech-bubble note — Figma node 3209:11481.
   Shared between the day schedule and What to Wear. */
export default function NoteBubble({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative block size-[70px] shrink-0 overflow-hidden rounded-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/figma/schedule/avatar.jpg")}
          alt="Anna & Shib"
          className="absolute inset-0 size-full object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/figma/schedule/overlay-orange.jpg")}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover mix-blend-hard-light"
        />
      </span>
      <p
        className="rounded-[6px] px-5 py-3.5 font-sans2 text-[17px] leading-snug sm:px-7 sm:text-xl"
        style={{ background: "var(--orange)", color: "var(--yellow)" }}
      >
        {text}
      </p>
    </div>
  );
}
