"use client";

import { createContext, useContext, type ReactNode } from "react";
import * as en from "./site.en";
import * as pl from "./site.pl";

export type Locale = "en" | "pl";

/* Everything a component used to get via `import { x } from "@/lib/site"`
   now comes from useSite() instead, so the SAME component tree can render
   either language depending on which locale's provider it's mounted
   under (see LocaleProvider below) — no per-component branching, no
   duplicated component files. */
export type SiteData = {
  couple: { names: string; place: string; dates: string };
  invitation: string;
  story: string;
  storyNote: string;
  anniversaryNote: string;
  preparation: typeof en.preparation;
  hotels: typeof en.hotels;
  guides: typeof en.guides;
  journey: typeof en.journey;
  days: typeof en.days;
  occasions: typeof en.occasions;
  TIMELINE_START: typeof en.TIMELINE_START;
  TIMELINE_END: typeof en.TIMELINE_END;
  timelineTicks: typeof en.timelineTicks;
};

function dataFor(locale: Locale): SiteData {
  const m = locale === "pl" ? pl : en;
  return {
    couple: m.couple,
    invitation: m.invitation,
    story: m.story,
    storyNote: m.storyNote,
    anniversaryNote: m.anniversaryNote,
    preparation: m.preparation,
    hotels: m.hotels,
    guides: m.guides,
    journey: m.journey,
    days: m.days,
    occasions: m.occasions,
    TIMELINE_START: m.TIMELINE_START,
    TIMELINE_END: m.TIMELINE_END,
    timelineTicks: m.timelineTicks,
  };
}

/* UI chrome — headings, labels, button text — that's hardcoded directly
   in component JSX rather than living in the content data above. Kept
   separate from SiteData since it's interface copy, not written content. */
export type UiStrings = {
  nav: { preparation: string; guides: string; timeline: string; whatToWear: string; openMenu: string; closeMenu: string };
  story: { showNote: string; hideNote: string };
  guides: {
    heading: string;
    guideLabel: string;
    close: string;
    closeGuide: string;
    comingSoon: string;
  };
  preparation: {
    heading: string;
    whereToStay: string;
    visaLinkLabel: string;
    cardTitles: {
      visa: string;
      insurance: string;
      vaccination: string;
      medication: string;
      flights: string;
      payments: string;
      esim: string;
      packing: string;
      gift: string;
      mentalPrep: string;
    };
    mentalPrepLink: string;
  };
  schedule: { weekAtAGlance: string };
  whatToWear: {
    heading: string;
    him: string;
    her: string;
    nextOutfit: string;
    notDressCode: string;
    // indexed by position, not by the (locale-specific) "Day N" string
    // occasions.day actually holds — see WhatToWear's use of this
    dayEvent: string[];
  };
  lookGrid: { previous: string; next: string };
  footer: { seeYouThere: string };
};

const uiEn: UiStrings = {
  nav: {
    preparation: "Preparation",
    guides: "Guides",
    timeline: "Timeline",
    whatToWear: "What to Wear",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  story: { showNote: "Show note", hideNote: "Hide note" },
  guides: {
    heading: "Guides",
    guideLabel: "Guide",
    close: "Close",
    closeGuide: "Close guide",
    comingSoon: "Guides section coming soon",
  },
  preparation: {
    heading: "Preparation",
    whereToStay: "Where you'll stay",
    visaLinkLabel: "Apply for the e-visa",
    cardTitles: {
      visa: "Visa",
      insurance: "Insurance",
      vaccination: "Vaccination",
      medication: "Medication",
      flights: "Flights",
      payments: "Payments",
      esim: "Get an e-SIM",
      packing: "Packing",
      gift: "Gift",
      mentalPrep: "Mental preparedness",
    },
    mentalPrepLink: "See Sambalpur on Google Maps",
  },
  schedule: { weekAtAGlance: "The week, at a glance" },
  whatToWear: {
    heading: "What to wear?",
    him: "Him",
    her: "Her",
    nextOutfit: "✨ Next outfit",
    notDressCode: "Not a dress code — just inspiration. Wear what makes you feel like you.",
    dayEvent: ["Arrival", "Prewedding", "Wedding day", "Departure"],
  },
  lookGrid: { previous: "Previous", next: "Next" },
  footer: { seeYouThere: "See you there" },
};

const uiPl: UiStrings = {
  nav: {
    preparation: "Przygotowania",
    guides: "Przewodniki",
    timeline: "Harmonogram",
    whatToWear: "Co na siebie",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
  },
  story: { showNote: "Pokaż notatkę", hideNote: "Ukryj notatkę" },
  guides: {
    heading: "Przewodniki",
    guideLabel: "Przewodnik",
    close: "Zamknij",
    closeGuide: "Zamknij przewodnik",
    comingSoon: "Sekcja przewodników już wkrótce",
  },
  preparation: {
    heading: "Przygotowania",
    whereToStay: "Gdzie się zatrzymasz",
    visaLinkLabel: "Złóż wniosek o e-wizę",
    cardTitles: {
      visa: "Wiza",
      insurance: "Ubezpieczenie",
      vaccination: "Szczepienia",
      medication: "Leki",
      flights: "Loty",
      payments: "Płatności",
      esim: "Kup e-SIM",
      packing: "Pakowanie",
      gift: "Prezent",
      mentalPrep: "Przygotowanie mentalne",
    },
    mentalPrepLink: "Zobacz Sambalpur na Google Maps",
  },
  schedule: { weekAtAGlance: "Tydzień w skrócie" },
  whatToWear: {
    heading: "Co na siebie?",
    him: "On",
    her: "Ona",
    nextOutfit: "✨ Następny strój",
    notDressCode: "To nie dress code — tylko inspiracja. Ubierz się tak, żeby czuć się sobą.",
    dayEvent: ["Przyjazd", "Przed ślubem", "Dzień ślubu", "Wyjazd"],
  },
  lookGrid: { previous: "Poprzedni", next: "Następny" },
  footer: { seeYouThere: "Do zobaczenia tam" },
};

function uiFor(locale: Locale): UiStrings {
  return locale === "pl" ? uiPl : uiEn;
}

const SiteDataContext = createContext<SiteData | null>(null);
const UiContext = createContext<UiStrings | null>(null);
const LocaleValueContext = createContext<Locale>("en");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <LocaleValueContext.Provider value={locale}>
      <SiteDataContext.Provider value={dataFor(locale)}>
        <UiContext.Provider value={uiFor(locale)}>{children}</UiContext.Provider>
      </SiteDataContext.Provider>
    </LocaleValueContext.Provider>
  );
}

export function useSite(): SiteData {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSite() must be used within a LocaleProvider");
  return ctx;
}

export function useUi(): UiStrings {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi() must be used within a LocaleProvider");
  return ctx;
}

export function useLocale(): Locale {
  return useContext(LocaleValueContext);
}
