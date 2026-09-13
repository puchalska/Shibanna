import { asset } from "@/lib/asset";
import { invitation } from "@/lib/site";

const LACE = asset("/figma/cover/invite-lace-tile.svg");
const LACE_V = asset("/figma/cover/invite-lace-tile-vertical.svg");

export default function Invitation() {
  return (
    <section className="w-full pb-16 pt-20 sm:pb-24 sm:pt-28">
      <div className="relative px-[9%] py-[11%] sm:px-[10%] sm:py-[12%]">
        {/* scalloped coral lace border as a real CSS "stroke": one repeat
            unit windowed out of the original Figma wave-and-dot artwork
            (invite-lace-tile.svg / its 90°-rotated twin for the sides),
            tiled edge to edge via background-repeat — never stretched,
            more copies of the same unit simply appear as the card grows */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-8 sm:h-11"
          style={{
            backgroundImage: `url(${LACE})`,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "left top",
            backgroundSize: "auto 100%",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-8 sm:h-11"
          style={{
            backgroundImage: `url(${LACE})`,
            backgroundRepeat: "repeat-x",
            backgroundPosition: "left bottom",
            backgroundSize: "auto 100%",
            transform: "scaleY(-1)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-11"
          style={{
            backgroundImage: `url(${LACE_V})`,
            backgroundRepeat: "repeat-y",
            backgroundPosition: "left top",
            backgroundSize: "100% auto",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-11"
          style={{
            backgroundImage: `url(${LACE_V})`,
            backgroundRepeat: "repeat-y",
            backgroundPosition: "right top",
            backgroundSize: "100% auto",
            transform: "scaleX(-1)",
          }}
        />

        <p className="relative text-center font-serif text-xl italic leading-[1.55] text-coral sm:text-[2rem] sm:leading-[1.5]">
          {invitation}
        </p>
      </div>
    </section>
  );
}
