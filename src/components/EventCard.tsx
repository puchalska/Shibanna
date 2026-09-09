import { asset } from "@/lib/asset";
import type { EventCard as EventCardType } from "@/lib/site";

export default function EventCard({ card }: { card: EventCardType }) {
  return (
    <article
      className="grid overflow-hidden rounded-[10px] sm:grid-cols-[1fr_0.9fr]"
      style={{ background: "var(--red)" }}
    >
      <div className="flex flex-col justify-center gap-3 p-6 sm:p-9">
        <h3 className="font-serif text-2xl italic text-coral sm:text-3xl">
          {card.title}
        </h3>
        <p className="font-serif text-lg italic leading-[1.5] text-coral-soft sm:text-xl">
          {card.body}
        </p>
      </div>
      <div className="duotone-wrap relative min-h-[180px] sm:min-h-full">
        <img
          src={asset(card.image)}
          alt=""
          className="duotone absolute inset-0 size-full object-cover"
          loading="lazy"
        />
      </div>
    </article>
  );
}
