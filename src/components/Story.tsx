import { asset } from "@/lib/asset";
import { story } from "@/lib/site";

export default function Story() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-16 sm:pb-24">
      <p className="font-serif text-2xl italic leading-[1.5] text-coral sm:text-[2rem] sm:leading-[1.55]">
        {story}
      </p>

      {/* the actual night — a beach selfie, warmed to the site's own
          red/coral grading. No frame: it just fades up into the page's
          own red at the top instead of stopping at a hard edge. */}
      <div className="relative mx-auto mt-8 aspect-[1400/1085] w-full max-w-md overflow-hidden rounded-[6px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/together.jpg")} alt="Anna & Shib" className="size-full object-cover" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(143,10,13,1) 0%, rgba(143,10,13,0) 45%)" }}
        />
      </div>

      {/* aurora line + heart, echoing the Figma illustration */}
      <svg viewBox="0 0 600 90" className="mt-8 w-full" fill="none" aria-hidden>
        <path
          d="M4 78 C 60 74 78 40 96 44 C 108 47 112 24 122 40 C 130 52 138 30 150 46 C 160 60 176 42 196 52 C 260 78 300 30 330 40 C 360 50 372 22 386 40 C 398 55 410 34 430 46 C 470 68 520 44 596 40"
          stroke="var(--coral)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M330 24 c -6 -9 -20 -6 -20 4 c 0 8 12 15 20 22 c 8 -7 20 -14 20 -22 c 0 -10 -14 -13 -20 -4 z"
          stroke="var(--coral)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <g fill="var(--coral)">
          {[
            [220, 40],
            [246, 30],
            [268, 44],
            [400, 26],
            [420, 38],
            [446, 24],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" />
          ))}
        </g>
      </svg>
    </section>
  );
}
