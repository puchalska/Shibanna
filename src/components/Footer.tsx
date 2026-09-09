import { couple } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
      <p className="font-serif text-4xl italic text-red sm:text-5xl">Anna &amp; Shib</p>
      <p className="mt-3 font-serif text-lg text-coral">
        {couple.place} · {couple.dates}
      </p>
      <p className="mt-8 font-label text-xs uppercase tracking-[0.2em] text-red/50">
        See you there
      </p>
    </footer>
  );
}
