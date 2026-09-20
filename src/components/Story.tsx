import { asset } from "@/lib/asset";
import { story } from "@/lib/site";

export default function Story() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pb-16 sm:pb-24">
      <p className="mx-auto max-w-3xl font-serif text-2xl italic leading-[1.5] text-coral sm:text-[2rem] sm:leading-[1.55]">
        {story}
      </p>

      {/* stop-motion of the hand-drawn florals and torn red paper being
          woven together — the artwork the site's own coral/lace look was
          drawn from. Rotated 90° clockwise, baked into the file. Full
          width of the section, wider than the text column above it. */}
      <div className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-[6px]">
        <video
          src={asset("/art-video.mp4")}
          poster={asset("/art-video-poster.jpg")}
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* aurora line + heart, echoing the Figma illustration */}
      <svg viewBox="0 0 600 90" className="mx-auto mt-8 w-full max-w-3xl" fill="none" aria-hidden>
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
