import { asset } from "@/lib/asset";
import { guides } from "@/lib/site";

/* "Guides" — a shelf of book covers (Figma "Guides" frame), sitting
   between Preparation and the Timeline. Every cover shares the same
   treatment: crimson ground, pink lace wreath, book-style asymmetric
   corners (tight spine edge, rounded page edge) and a spine-shadow
   strip down the left. Family Guide is the one exception — a real
   photo behind the wreath, run through the site's existing duotone
   treatment (see globals.css) instead of the plain crimson ground. */

const LACE = asset("/figma/guides/lace-border.svg");
const LACE_CREAM = asset("/figma/guides/lace-border-cream.svg");

function Cover({ title, photo }: { title: string; photo?: string }) {
  return (
    <div
      className="relative aspect-[749/1025] overflow-hidden border-[6px] border-coral bg-red shadow-[6px_8px_18px_rgba(0,0,0,0.35)]"
      style={{ borderTopLeftRadius: 2, borderBottomLeftRadius: 2, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
    >
      {photo && (
        <div className="duotone-wrap absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(photo)} alt="" className="duotone absolute inset-0 size-full object-cover" />
        </div>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo ? LACE_CREAM : LACE}
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rotate-90 object-contain opacity-90"
      />

      <p
        className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 text-center font-serif text-xl leading-tight sm:text-2xl"
        style={{ color: photo ? "var(--cream)" : "var(--coral)" }}
      >
        {title}
      </p>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[5px]"
        style={{ background: "linear-gradient(to bottom, rgba(217,217,217,0), #930f12)" }}
      />
    </div>
  );
}

export default function Guides() {
  return (
    <section id="guides" className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
      <p className="mb-2 font-label text-[11px] font-bold uppercase tracking-[0.2em] text-coral-soft">
        A shelf for later
      </p>
      <h2 className="font-serif text-4xl italic text-coral sm:text-5xl">Guides</h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-coral-soft">
        Short reads for once you're here — hotels, flights, what to expect on the street, family customs, and more.
        Content coming soon.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {guides.map((g) => (
          <Cover key={g.title} title={g.title} photo={g.photo} />
        ))}
      </div>
    </section>
  );
}
