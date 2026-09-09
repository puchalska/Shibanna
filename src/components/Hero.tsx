import { asset } from "@/lib/asset";
import { couple } from "@/lib/site";

function Diamonds({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className ?? ""}`} aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2.5 rotate-45 bg-gradient-to-br from-white to-zinc-400 shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <header
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 text-coral"
      style={{
        backgroundColor: "var(--red-mid)",
        backgroundImage: `linear-gradient(rgba(82,1,0,0.35), rgba(82,1,0,0.55)), url(${asset(
          "/figma/tex-red-felt.jpg",
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative flex w-full max-w-4xl items-center justify-center py-16">
        {/* vertical captions */}
        <span className="absolute left-0 hidden text-base tracking-wide [writing-mode:vertical-rl] rotate-180 sm:block md:text-lg">
          {couple.place}
        </span>
        <span className="absolute right-0 hidden text-base tracking-wide [writing-mode:vertical-rl] sm:block md:text-lg">
          {couple.dates}
        </span>

        <Diamonds className="absolute left-8 hidden md:flex" />
        <Diamonds className="absolute right-8 hidden md:flex" />

        {/* doily frame */}
        <div className="relative aspect-[4/3] w-full max-w-2xl">
          <svg
            viewBox="0 0 400 300"
            className="absolute inset-0 size-full"
            fill="none"
            aria-hidden
          >
            <ellipse
              cx="200"
              cy="150"
              rx="180"
              ry="128"
              stroke="var(--coral)"
              strokeWidth="1.4"
              strokeDasharray="1 7"
              strokeLinecap="round"
            />
            <ellipse
              cx="200"
              cy="150"
              rx="168"
              ry="118"
              stroke="var(--coral)"
              strokeWidth="1"
              strokeDasharray="0.5 5"
              strokeLinecap="round"
              opacity="0.8"
            />
            <ellipse
              cx="200"
              cy="150"
              rx="150"
              ry="103"
              stroke="var(--coral)"
              strokeWidth="2.5"
              strokeDasharray="9 11"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-center font-serif text-6xl italic leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
              Anna
              <br />
              <span className="text-coral-soft">&amp; Shib</span>
            </h1>
          </div>
        </div>
      </div>

      {/* mobile-only caption row */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-between px-6 text-sm sm:hidden">
        <span>{couple.place}</span>
        <span>{couple.dates}</span>
      </div>
    </header>
  );
}
