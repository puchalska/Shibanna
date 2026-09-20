import { asset } from "@/lib/asset";
import { story } from "@/lib/site";

export default function Story() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-16 sm:pb-24">
      <p className="font-serif text-2xl italic leading-[1.5] text-coral sm:text-[2rem] sm:leading-[1.55]">
        {story}
      </p>

      {/* stop-motion of the hand-drawn sketches and torn paper that
          became the site's own lace/coral look — woven together frame
          by frame, so it reads as where all this actually came from. */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:items-start">
        <div
          className="aspect-[3/4] w-full max-w-[260px] overflow-hidden border-[6px] border-coral shadow-[6px_8px_18px_rgba(0,0,0,0.35)]"
          style={{ borderTopLeftRadius: 2, borderBottomLeftRadius: 2, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
        >
          <video
            src={asset("/story-video.mp4")}
            poster={asset("/story-video-poster.jpg")}
            className="size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <p className="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-coral-soft">
          The sketches behind it all
        </p>
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
