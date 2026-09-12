import { asset } from "@/lib/asset";
import type { EventCard as EventCardType } from "@/lib/site";

/* Section from Figma node 3390:3157 — crimson card, 3fr text / 2fr photo,
   the photo carried under an orange texture in hard-light (the "duotone"). */

export default function EventCard({ card }: { card: EventCardType }) {
  return (
    <article
      className="grid overflow-hidden rounded-[6px] sm:grid-cols-[3fr_2fr]"
      style={{ background: "var(--red)" }}
    >
      <div className="flex items-center px-7 py-6 sm:px-10 sm:py-6 lg:px-14">
        <div className="font-serif italic text-coral">
          <p className="text-[20px] leading-[1.3] sm:text-[24px] lg:text-[30px]">
            {card.title}
          </p>
          <p className="mt-2 text-sm leading-[1.5] sm:text-base lg:text-lg">
            {card.body}
          </p>
        </div>
      </div>

      <div
        className="relative min-h-[220px] sm:min-h-[360px]"
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
