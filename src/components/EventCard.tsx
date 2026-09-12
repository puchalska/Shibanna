import { asset } from "@/lib/asset";
import type { EventCard as EventCardType } from "@/lib/site";

/* Section from Figma node 3390:3157 — crimson card, text over photo (photo
   under an orange texture in hard-light, the "duotone"). Cards sit two-up
   in a grid rather than one full-width card per row, so each one stays
   compact; the text/photo split only goes side-by-side once a card has
   the width to spare (lg+ — a grid column, not the full section). */

export default function EventCard({ card }: { card: EventCardType }) {
  return (
    <article
      className="grid overflow-hidden rounded-[6px] lg:grid-cols-[3fr_2fr]"
      style={{ background: "var(--red)" }}
    >
      <div className="flex items-center px-6 py-5 sm:px-7 lg:px-9">
        <div className="font-serif italic text-coral">
          <p className="text-lg leading-[1.3] sm:text-xl lg:text-[22px]">
            {card.title}
          </p>
          <p className="mt-1.5 text-sm leading-[1.45] sm:text-[15px]">
            {card.body}
          </p>
        </div>
      </div>

      <div
        className="relative min-h-[140px] sm:min-h-[170px] lg:min-h-[200px]"
        style={{ backgroundColor: "#b64a12" }}
      >
        <img
          src={asset(card.image)}
          alt=""
          className="absolute inset-0 size-full object-cover"
          style={{ filter: "grayscale(0.55) contrast(1.35) brightness(0.82)" }}
        />
        <img
          src={asset("/figma/schedule/overlay-orange.jpg")}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover mix-blend-hard-light"
        />
      </div>
    </article>
  );
}
