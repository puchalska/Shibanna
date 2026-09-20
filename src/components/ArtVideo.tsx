import { asset } from "@/lib/asset";

/* Closing note: stop-motion of the hand-drawn florals and torn red
   paper being woven together — the actual artwork the site's own
   coral/lace look was drawn from. Sits at the very end, after
   everything else, as where it all actually came from. Rotated 90°
   clockwise (baked into the file, not a CSS transform) so it reads
   as a tilted print rather than a straight rectangle. */

export default function ArtVideo() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-6 py-16 sm:py-24">
      <div
        className="aspect-[4/3] w-full max-w-[420px] overflow-hidden border-[6px] border-coral shadow-[6px_8px_18px_rgba(0,0,0,0.35)]"
        style={{ borderTopLeftRadius: 2, borderBottomLeftRadius: 2, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
      >
        <video
          src={asset("/art-video.mp4")}
          poster={asset("/art-video-poster.jpg")}
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <p className="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-coral-soft">
        The sketches behind it all
      </p>
    </section>
  );
}
