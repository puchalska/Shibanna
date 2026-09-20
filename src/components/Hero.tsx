import CoverLace from "./CoverLace";
import { asset } from "@/lib/asset";
import { couple } from "@/lib/site";

/* Hero = the Figma "Cover" (node 3485:2177), 1195 x 765, on sm+.
   Everything lives in CoverLace: the lace tablecloth (corner motifs + gems
   baked in) with the cursor-following reveal, and the names + captions
   on top.

   Below sm, that wide landscape design squeezed down to phone width
   loses its doily shape and crowds the names — so mobile instead gets
   the portrait cover Figma designed for that aspect ratio (node
   3443:2944). It's dense with rotated lace and gem pieces, so — same
   call as the Guides covers — it's reproduced as one exact flattened
   render rather than reassembled from parts. Figma has no way to
   export that render with a transparent backdrop, so the flat canvas
   grey it bakes in was keyed out afterwards, leaving the lace sit
   directly on the page's own red ground like everything else here. */

export default function Hero() {
  return (
    <header className="flex min-h-[100svh] items-center justify-center overflow-hidden px-3 py-12 sm:px-8">
      <div className="relative hidden aspect-[1195/765] w-full max-w-[1080px] sm:block">
        <CoverLace />
      </div>
      <div className="relative aspect-[628/892] w-full max-w-[480px] sm:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/figma/cover/mobile.webp")}
          alt=""
          className="absolute inset-0 size-full object-contain"
        />
      </div>
      <h1 className="sr-only">
        {couple.names} — {couple.place}, {couple.dates}
      </h1>
    </header>
  );
}
