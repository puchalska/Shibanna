import { asset } from "@/lib/asset";
import { invitation } from "@/lib/site";

export default function Invitation() {
  return (
    <section className="w-full pb-16 pt-20 sm:pb-24 sm:pt-28">
      <div className="relative">
        {/* scalloped coral border straight from Figma (node 3408:12041) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/figma/cover/invite-frame.svg")}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full"
        />
        <p className="relative px-[9%] py-[12%] text-center font-serif text-xl italic leading-[1.55] text-coral sm:px-[10%] sm:text-[2rem] sm:leading-[1.5]">
          {invitation}
        </p>
      </div>
    </section>
  );
}
