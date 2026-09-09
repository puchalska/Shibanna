import { asset } from "@/lib/asset";
import { couple } from "@/lib/site";

/* Hero = the Figma "Cover" component (node 3485:2177), 1195 x 765.
   Every element is placed with the exact % offsets from that frame. */

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

function GemColumn({ side }: { side: "left" | "right" }) {
  // three gems stacked, centred on ~54% height, just inside the frame edge
  return (
    <div
      className="absolute flex flex-col gap-[3%]"
      style={{
        [side]: "2.5%",
        top: "40%",
      }}
      aria-hidden
    >
      {["gem1", "gem2", "gem3"].map((g) => (
        <Img
          key={g}
          src={`/figma/cover/${g}.png`}
          className="w-[12px] sm:w-[18px] md:w-[24px]"
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <header className="flex min-h-[100svh] items-center justify-center overflow-hidden px-3 py-12 sm:px-8">
      <div className="relative aspect-[1195/765] w-full max-w-[1080px]">
        {/* corner motifs — flush to the frame corners */}
        <Img src="/figma/cover/corner-tl.svg" className="absolute left-0 top-0 w-[21%]" />
        <Img src="/figma/cover/corner-tr.svg" className="absolute right-0 top-0 w-[21%]" />
        <Img src="/figma/cover/corner-bl.svg" className="absolute bottom-0 left-0 w-[21%]" />
        <Img src="/figma/cover/corner-br.svg" className="absolute bottom-0 right-0 w-[21%]" />

        {/* doily frame */}
        <Img
          src="/figma/cover/doily.svg"
          className="absolute left-[4.8%] top-[2.4%] w-[90.2%]"
        />

        {/* vertical captions, along the inner oval */}
        <Img
          src="/figma/cover/text-sambalpur.svg"
          alt={couple.place}
          className="absolute left-[19.4%] top-[35.7%] h-[29.5%]"
        />
        <Img
          src="/figma/cover/text-dates.svg"
          alt={couple.dates}
          className="absolute left-[74%] top-[37.1%] h-[28.3%]"
        />

        {/* names — centred in the oval */}
        <Img
          src="/figma/cover/annashib.svg"
          alt={`${couple.names} — getting married`}
          className="absolute left-[29.4%] top-[31.6%] w-[36.6%]"
        />

        <GemColumn side="left" />
        <GemColumn side="right" />

        <h1 className="sr-only">
          {couple.names} — {couple.place}, {couple.dates}
        </h1>
      </div>
    </header>
  );
}
