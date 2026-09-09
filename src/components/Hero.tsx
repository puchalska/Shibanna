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
      className="absolute top-1/2 flex -translate-y-1/2 flex-col gap-2.5 sm:gap-5"
      style={{ [side]: "1.5%" } as React.CSSProperties}
      aria-hidden
    >
      {["gem1", "gem2", "gem3"].map((g) => (
        <Img
          key={g}
          src={`/figma/cover/${g}.png`}
          className="w-2.5 sm:w-4 md:w-[22px]"
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
        <Img src="/figma/cover/corner-tl.svg" className="absolute left-0 top-0 w-[19%] sm:w-[21%]" />
        <Img src="/figma/cover/corner-tr.svg" className="absolute right-0 top-0 w-[19%] sm:w-[21%]" />
        <Img src="/figma/cover/corner-bl.svg" className="absolute bottom-0 left-0 w-[19%] sm:w-[21%]" />
        <Img src="/figma/cover/corner-br.svg" className="absolute bottom-0 right-0 w-[19%] sm:w-[21%]" />

        {/* doily frame */}
        <Img
          src="/figma/cover/doily.svg"
          className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2 sm:w-[90%]"
        />

        {/* vertical captions */}
        <Img
          src="/figma/cover/text-sambalpur.svg"
          alt={couple.place}
          className="absolute left-[17%] top-1/2 h-[30%] -translate-y-1/2"
        />
        <Img
          src="/figma/cover/text-dates.svg"
          alt={couple.dates}
          className="absolute right-[17%] top-1/2 h-[29%] -translate-y-1/2"
        />

        {/* names */}
        <Img
          src="/figma/cover/annashib.svg"
          alt={`${couple.names} — getting married`}
          className="absolute left-1/2 top-[51%] w-[37%] -translate-x-1/2 -translate-y-1/2"
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
