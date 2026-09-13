import { asset } from "@/lib/asset";
import { invitation } from "@/lib/site";

export default function Invitation() {
  return (
    <section className="w-full pb-16 pt-20 sm:pb-24 sm:pt-28">
      <div className="relative">
        {/* scalloped coral border as a true CSS border-image: a single small
            lace tile (4 fixed corners + one repeatable dot-and-scallop unit
            per edge) that border-image-repeat: round tiles at native size —
            more lace appears as the card grows, nothing ever stretches */}
        <div
          className="border-[28px] border-solid px-[7%] py-[9%] sm:border-[40px] sm:px-[8%] sm:py-[10%]"
          style={{
            borderImageSource: `url(${asset("/figma/cover/invite-frame-tile.svg")})`,
            borderImageSlice: 40,
            borderImageRepeat: "round",
            borderImageWidth: 1,
          }}
        >
          <p className="text-center font-serif text-xl italic leading-[1.55] text-coral sm:text-[2rem] sm:leading-[1.5]">
            {invitation}
          </p>
        </div>
      </div>
    </section>
  );
}
