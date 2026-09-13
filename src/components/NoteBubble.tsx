import { asset } from "@/lib/asset";

/* Layered avatar + orange speech-bubble note — Figma node 3209:11481.
   Shared between the day schedule and What to Wear. `size="sm"` shrinks
   the avatar/padding/type for spots where the full-size bubble is too
   heavy (e.g. tucked under a carousel rather than leading a section). */
export default function NoteBubble({
  text,
  size = "default",
  background = "var(--orange)",
}: {
  text: string;
  size?: "default" | "sm";
  background?: string;
}) {
  const avatar = size === "sm" ? "size-[46px]" : "size-[70px]";
  const bubble =
    size === "sm"
      ? "rounded-[5px] px-4 py-2.5 text-sm"
      : "rounded-[6px] px-5 py-3.5 text-[17px] sm:px-7 sm:text-xl";

  return (
    <div className="flex items-center gap-3">
      <span className={`relative block shrink-0 overflow-hidden rounded-full ${avatar}`}>
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
        className={`font-sans2 leading-snug ${bubble}`}
        style={{ background, color: "var(--yellow)" }}
      >
        {text}
      </p>
    </div>
  );
}
