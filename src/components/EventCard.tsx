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
      <div className="flex items-center px-8 py-8 sm:px-12 sm:py-6 lg:px-16">
        <div className="font-serif italic text-coral">
          <p className="text-[26px] leading-[1.35] sm:text-[32px] lg:text-[40px]">
            {card.title}
          </p>
          <p className="mt-2 text-lg leading-[1.45] sm:text-xl lg:text-[26px]">
            {card.body}
          </p>
        </div>
      </div>

      <div className="relative min-h-[220px] sm:min-h-[360px]">
        <img
          src={asset(card.image)}
          alt=""
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
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
