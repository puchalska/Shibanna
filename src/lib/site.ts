/*
  Types only — value exports now live behind useSite()/useUi() (see
  site-context.tsx) so the same components can render either locale's
  content (site.en.ts / site.pl.ts). Components that only needed a type
  (`import type { Day } from "@/lib/site"`) don't need to change at all.
*/
export type {
  GuideBlock,
  Guide,
  Hotel,
  JourneyGroup,
  JourneyPhase,
  TimelineBlock,
  EventCard,
  DayHeader,
  Day,
  GarmentCategory,
  Garment,
  Fit,
  Occasion,
} from "./site.en";
