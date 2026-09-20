import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { LocaleProvider } from "@/lib/site-context";

export const metadata: Metadata = {
  title: "Anna i Shib — 17–20 grudnia 2026, Sambalpur",
  description:
    "Anna i Shib biorą ślub w Sambalpurze w Indiach, 17–20 grudnia 2026. Harmonogram, podróż i co na siebie.",
};

export default function HomePl() {
  return (
    <LocaleProvider locale="pl">
      <HomePage />
    </LocaleProvider>
  );
}
