import { asset } from "@/lib/asset";
import { couple } from "@/lib/site";

/* Hero rebuilt from the Figma "Cover" component (node 3485:2177):
   the coral doily, the "Anna & Shib" lettering, four corner motifs,
   the two vertical captions and the silver gems — all real assets. */

const Img = ({
  src,
  alt = "",
  className,
  style,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={asset(src)}
    alt={alt}
    className={className}
    style={style}
    aria-hidden={alt === "" || undefined}
  />
);

function Gems({ side }: { side: "left" | "right" }) {
  return (
    <div
      className="absolute top-1/2 flex -translate-y-1/2 flex-col gap-4 sm:gap-7"
      style={{ [side]: "0.5%" } as React.CSSProperties}
      aria-hidden
    >
      {["gem1", "gem2", "gem3"].map((g) => (
        <Img
          key={g}
          src={`/figma/cover/${g}.png`}
          className="w-3.5 sm:w-6 md:w-8"
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <header className="flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-16 sm:px-8">
      <div className="relative aspect-[1195/765] w-full max-w-[1040px]">
        {/* corner motifs */}
        <Img src="/figma/cover/corner-tl.svg" className="absolute left-0 top-0 w-[20%] sm:w-[21%]" />
        <Img src="/figma/cover/corner-tr.svg" className="absolute right-0 top-0 w-[20%] sm:w-[21%]" />
        <Img src="/figma/cover/corner-bl.svg" className="absolute bottom-0 left-0 w-[20%] sm:w-[21%]" />
        <Img src="/figma/cover/corner-br.svg" className="absolute bottom-0 right-0 w-[20%] sm:w-[21%]" />

        {/* doily frame — its inner oval holds the names */}
        <Img
          src="/figma/cover/doily.svg"
          className="absolute left-1/2 top-1/2 w-[94%] -translate-x-1/2 -translate-y-1/2"
        />

        {/* vertical captions, along the inner oval */}
        <Img
          src="/figma/cover/text-sambalpur.svg"
          alt={couple.place}
          className="absolute left-[19%] top-1/2 h-[30%] -translate-y-1/2"
        />
        <Img
          src="/figma/cover/text-dates.svg"
          alt={couple.dates}
          className="absolute right-[19%] top-1/2 h-[29%] -translate-y-1/2"
        />

        {/* names — centered in the oval */}
        <Img
          src="/figma/cover/annashib.svg"
          alt={`${couple.names} — getting married`}
          className="absolute left-1/2 top-1/2 w-[32%] -translate-x-1/2 -translate-y-1/2"
        />

        <Gems side="left" />
        <Gems side="right" />

        <h1 className="sr-only">
          {couple.names} — {couple.place}, {couple.dates}
        </h1>
      </div>
    </header>
  );
}
