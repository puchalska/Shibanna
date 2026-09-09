import { invitation } from "@/lib/site";

export default function Invitation() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-16 pt-20 sm:pt-28">
      <div
        className="rounded-[6px] p-3.5 sm:p-4"
        style={{ background: "var(--cream)" }}
      >
        <div className="rounded-[3px] border-2 border-dashed border-coral px-6 py-10 sm:px-12 sm:py-14">
          <p className="text-center font-serif text-xl italic leading-[1.55] text-red sm:text-[1.9rem] sm:leading-[1.6]">
            {invitation}
          </p>
        </div>
      </div>
    </section>
  );
}
