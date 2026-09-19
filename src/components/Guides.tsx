import { asset } from "@/lib/asset";
import { guides } from "@/lib/site";

/* "Guides" — a shelf of book covers (Figma "Guides" frame), sitting
   between Preparation and the Timeline. Every cover's artwork —
   paper texture, wreath, title, and the two covers with a unique
   flight-path/animal graphic or a real photo — is the exact flattened
   render Figma produces (see the `guides` data in site.ts for why).
   This component just supplies the book-cover frame around it: the
   pink border, asymmetric corners (tight spine edge, rounded page
   edge), a spine-shadow strip, and the drop shadow — none of that
   varies per cover, so it isn't baked into the images. */

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
          <div
            key={g.title}
            className="relative aspect-[749/1025] overflow-hidden border-[6px] border-coral shadow-[6px_8px_18px_rgba(0,0,0,0.35)]"
            style={{
              borderTopLeftRadius: 2,
              borderBottomLeftRadius: 2,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(g.image)} alt={g.title} className="absolute inset-0 size-full object-cover" />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[5px]"
              style={{ background: "linear-gradient(to bottom, rgba(217,217,217,0), #930f12)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
