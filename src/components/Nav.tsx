"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#prepare", label: "Preparation" },
  { href: "#schedule", label: "Timeline" },
  { href: "#what-to-wear", label: "What to Wear" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    );
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(60, 2, 2, 0.72)" : "rgba(60, 2, 2, 0)",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: `1px solid rgba(255, 149, 149, ${scrolled ? 0.18 : 0})`,
      }}
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-2 px-6 py-3 sm:flex-row sm:justify-between sm:gap-0 sm:px-10">
        <a
          href="#"
          className="font-serif text-lg italic text-coral sm:text-xl"
        >
          Anna &amp; Shib
        </a>
        <ul className="flex items-center gap-4 sm:gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="whitespace-nowrap font-label text-[11px] font-bold uppercase tracking-[0.15em] transition-colors sm:text-sm"
                style={{
                  color: active === l.href ? "var(--coral)" : "var(--coral-soft)",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
