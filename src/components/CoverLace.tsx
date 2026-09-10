import { asset } from "@/lib/asset";
import { couple } from "@/lib/site";

/* Cover (Figma node 3485:2177) — plain version, no reveal effect:
   lace.svg (coral vector lace: doily + corner motifs + gems) with the
   names + captions on top. */

const Img = ({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={asset(src)}
    alt={alt}
    className={className}
    aria-hidden={alt === "" || undefined}
    draggable={false}
  />
);

export default function CoverLace() {
  return (
    <div className="absolute inset-0">
      <Img
        src="/figma/cover/lace.svg"
        className="absolute inset-0 size-full object-cover"
      />
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
      <Img
        src="/figma/cover/annashib.svg"
        alt={`${couple.names} — getting married`}
        className="absolute left-[29.4%] top-[31.6%] w-[36.6%]"
      />
    </div>
  );
}
