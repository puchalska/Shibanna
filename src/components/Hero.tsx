import CoverLace from "./CoverLace";
import { couple } from "@/lib/site";

/* Hero = the Figma "Cover" (node 3485:2177), 1195 x 765.
   Everything lives in CoverLace: the lace tablecloth (corner motifs + gems
   baked in) with the cursor-following reveal, and the names + captions
   on top. */

export default function Hero() {
  return (
    <header className="flex min-h-[100svh] items-center justify-center overflow-hidden px-3 py-12 sm:px-8">
      <div className="relative aspect-[1195/765] w-full max-w-[1080px]">
        <CoverLace />
        <h1 className="sr-only">
          {couple.names} — {couple.place}, {couple.dates}
        </h1>
      </div>
    </header>
  );
}
