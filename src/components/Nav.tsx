"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import { useLocale, useUi } from "@/lib/site-context";

export default function Nav() {
  const ui = useUi();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // "Guest Journey" isn't a link here anymore — it's a Guide now (see
  // site.en.ts/site.pl.ts), so the nav has one fewer item and more room
  const LINKS = [
    { href: "#prepare", label: ui.nav.preparation },
    { href: "#guides", label: ui.nav.guides },
    { href: "#schedule", label: ui.nav.timeline },
    { href: "#what-to-wear", label: ui.nav.whatToWear },
  ];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const linkColor = (href: string) => (active === href ? "var(--coral)" : "var(--coral-soft)");

  // English is the site root; Polish is /pl/ — same basePath handling as
  // asset() (GitHub Pages project sites serve from /<repo>/)
  const otherLocaleHref = asset(locale === "pl" ? "/" : "/pl/");
  const otherLocaleLabel = locale === "pl" ? "EN" : "PL";

  const LocaleSwitch = ({ className = "" }: { className?: string }) => (
    <a
      href={otherLocaleHref}
      className={`font-label text-xs font-bold uppercase tracking-[0.15em] text-coral-soft transition-colors hover:text-coral ${className}`}
    >
      {otherLocaleLabel}
    </a>
  );

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300"
      style={{
        backgroundColor: scrolled || open ? "rgba(60, 2, 2, 0.72)" : "rgba(60, 2, 2, 0)",
        backdropFilter: scrolled || open ? "blur(8px)" : "none",
        borderBottom: `1px solid rgba(255, 149, 149, ${scrolled || open ? 0.18 : 0})`,
      }}
    >
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-3 sm:px-10">
        <a href="#" className="font-serif text-lg italic text-coral sm:text-xl">
          Anna &amp; Shib
        </a>

        {/* lg and up: links inline, no hamburger needed. Even at 4 items,
            "What to Wear" plus everything else didn't reliably fit in one
            line below lg (was wrapping to 2 lines at tablet widths with
            sm:flex) — lg gives it room without cramping. */}
        <ul className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="whitespace-nowrap font-label text-sm font-bold uppercase tracking-[0.15em] transition-colors"
                style={{ color: linkColor(l.href) }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <LocaleSwitch />
          </li>
        </ul>

        {/* below lg: hamburger toggles a dropdown, avoids the links
            wrapping mid-word across multiple cramped lines */}
        <div className="flex items-center gap-4 lg:hidden">
          <LocaleSwitch />
          <button
            type="button"
            aria-label={open ? ui.nav.closeMenu : ui.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-8 cursor-pointer flex-col items-center justify-center gap-[5px]"
          >
            <span
              className="h-[1.5px] w-5 rounded-full bg-current transition-transform duration-200"
              style={{ color: "var(--coral)", transform: open ? "translateY(6.5px) rotate(45deg)" : "none" }}
            />
            <span
              className="h-[1.5px] w-5 rounded-full bg-current transition-opacity duration-200"
              style={{ color: "var(--coral)", opacity: open ? 0 : 1 }}
            />
            <span
              className="h-[1.5px] w-5 rounded-full bg-current transition-transform duration-200"
              style={{ color: "var(--coral)", transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </div>

      {/* mobile dropdown panel */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 lg:hidden ${open ? "max-h-60" : "max-h-0"}`}
      >
        <ul className="flex flex-col items-center gap-5 px-6 pb-6 pt-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-label text-sm font-bold uppercase tracking-[0.15em] transition-colors"
                style={{ color: linkColor(l.href) }}
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
