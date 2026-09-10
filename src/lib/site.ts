/*
  All copy + structure for the Anna & Shib wedding site.
  Text is taken verbatim from the Figma "Wedding" prototype.
*/

export const couple = {
  names: "Anna & Shib",
  place: "Sambalpur, India",
  dates: "17–20.12.2026",
};

export const invitation =
  "Dear Guest, we are getting married in a sacred Hindu ceremony on 20th of December 2026, with prior wedding ceremonies on 18th & 19th. We are cordially inviting you to join us on this adventure.";

export const story =
  "We met in Umeå & fell in love in the night of the biggest aurora we’ve ever seen. 7 years later, 3 countries and 2 cultures — Polish & Oriya — are merging for the first time in an official ceremony.";

export type TimelineBlock = {
  label: string;
  /** 24h decimal, e.g. 15.5 = 15:30. Timeline runs 6:00 → 24:00. */
  start: number;
  end: number;
  optional?: boolean;
};

export type EventCard = {
  title: string;
  body: string;
  image: string;
};

export type Day = {
  id: string;
  date: string;
  name: string;
  /** header tint */
  tone: "cream" | "orange";
  /** short avatar-style note shown above the schedule */
  note?: string;
  blocks: TimelineBlock[];
  cards: EventCard[];
};

export const days: Day[] = [
  {
    id: "arrival",
    date: "17th December",
    name: "Arrival",
    tone: "cream",
    note: "Remember to set up your e-sim & e-visa before your arrival in India.",
    blocks: [{ label: "(Optional) Shopping", start: 15, end: 19, optional: true }],
    cards: [
      {
        title: "Taxi pickup",
        body: "We will pick you up when you reach the airport so let us know the day & time of your arrival.",
        image: "/figma/schedule/card-taxi.jpg",
      },
      {
        title: "Grand Siba Hotel",
        body: "Taxi will drive you to the hotel in Sambalpur. We will spend there 2 nights.",
        image: "/figma/schedule/card-hotel.jpg",
      },
      {
        title: "Shopping is optional",
        body: "Another chance of obtaining clothes for ceremony is 19th of December.",
        image: "/figma/schedule/card-shop.jpg",
      },
    ],
  },
  {
    id: "prewedding",
    date: "18th December",
    name: "Prewedding",
    tone: "orange",
    blocks: [
      { label: "Engagement", start: 12, end: 15 },
      { label: "Mehendi / Henna & Sangeet", start: 16, end: 23 },
    ],
    cards: [
      {
        title: "Engagement",
        body: "Families meet, rings exchange, Anna & Shib get blessed. Calm start.",
        image: "/figma/engagement.jpg",
      },
      {
        title: "Mehendi",
        body: "Henna on the bride (and any guest who wants it), music, food, no ritual pressure.",
        image: "/figma/mehendi.jpg",
      },
      {
        title: "Sangeet",
        body: "Family & friends perform, dance, chaos in the best way. Probably a European party just for us.",
        image: "/figma/sangeet.jpg",
      },
    ],
  },
  {
    id: "recovery",
    date: "19th December",
    name: "Recovery",
    tone: "cream",
    blocks: [
      { label: "(Optional) Safari or / and Shopping", start: 10, end: 18, optional: true },
    ],
    cards: [
      {
        title: "Optional Fun",
        body: "Optional safari trip & / or optional shopping & recovery before the big day.",
        image: "/figma/story-tree.jpg",
      },
      {
        title: "Checking in X hotel",
        body: "We need to check in another hotel in which the wedding ceremony takes place.",
        image: "/figma/hotel.jpg",
      },
    ],
  },
  {
    id: "wedding",
    date: "20th December",
    name: "Wedding",
    tone: "orange",
    blocks: [
      { label: "Haldi", start: 8, end: 11 },
      { label: "Barat & Wedding", start: 15, end: 22 },
      { label: "Reception", start: 20, end: 24 },
    ],
    cards: [
      {
        title: "Haldi",
        body: "Applying the turmeric paste on Anna & Shib for luck. Messy, joyful. Cleansing ritual.",
        image: "/figma/haldi.jpg",
      },
      {
        title: "Baraat",
        body: "The groom's procession arrives with music and dancing. Loud, fun, be ready to move.",
        image: "/figma/baraat.jpg",
      },
      {
        title: "Wedding ceremony",
        body: "The actual vows and rituals. Long & boring.",
        image: "/figma/wedding-ceremony.jpg",
      },
      {
        title: "Reception",
        body: "Dinner for the whole village. Loud & overstimulating — can be skipped. Anna & Shib will be greeting the village.",
        image: "/figma/reception.jpg",
      },
    ],
  },
  {
    id: "departure",
    date: "21st December",
    name: "Departure",
    tone: "cream",
    blocks: [
      { label: "Breakfast", start: 8, end: 11 },
      { label: "Flight to Delhi", start: 14, end: 18 },
    ],
    cards: [
      {
        title: "Goodbye breakfast",
        body: "Let’s gather together to eat well before we all departure.",
        image: "/figma/breakfast.jpg",
      },
      {
        title: "Flight to Delhi",
        body: "In the afternoon, we all fly to Delhi to make sure Anna’s parents are safe & sound on the way back.",
        image: "/figma/taxi-map.jpg",
      },
    ],
  },
];

export const TIMELINE_START = 6;
export const TIMELINE_END = 24;
export const timelineTicks = ["6am", "noon", "6pm", "midnight"];

/* ---------- What to wear — the styling collage ----------
   Rebuilt from the Figma "Outfit widget" (node 3400:7495) + its FitGrid
   component: each occasion is a small carousel of "fits", and each fit is
   a paper-doll collage — garment cut-outs positioned over the watercolour
   bodies, with handwritten notes and hand-drawn arrows.
   All coords are % of the collage stage (portrait, ~5:6). */

export type Piece = {
  src: string;
  /** left / top of the piece box, and width — all % of the stage */
  x: number;
  y: number;
  w: number;
  rotate?: number;
};

export type Note = {
  text: string;
  x: number;
  y: number;
  w: number;
  align?: "left" | "right";
  /** hand-drawn arrow from the note toward a piece */
  arrow?: { src: string; x: number; y: number; w: number; rotate?: number };
};

export type Fit = {
  name: string;
  pieces: Piece[];
  notes: Note[];
};

export type Occasion = {
  id: string;
  day: string;
  labels: string[];
  blurb: string;
  fits: Fit[];
};

const bodies: Piece = { src: "/figma/outfit/bodies.png", x: 6, y: 6, w: 88 };
const A = "/figma/cover/arrow154.svg";
const A2 = "/figma/cover/arrow155.svg";
const A3 = "/figma/cover/arrow156.svg";
// him: torso/legs live around x 8-44; her: x 48-82; feet ~ y 74

export const occasions: Occasion[] = [
  {
    id: "casual",
    day: "Day 1",
    labels: ["Casual"],
    blurb: "Travel days & downtime. Comfortable, breathable, nothing precious.",
    fits: [
      {
        name: "Relaxed",
        pieces: [
          bodies,
          { src: "/figma/outfit/him-shirt-jeans.png", x: 6, y: 15, w: 38 },
          { src: "/figma/outfit/her-white-shirt.png", x: 46, y: 13, w: 36 },
          { src: "/figma/outfit/her-cream-skirt.png", x: 49, y: 40, w: 31 },
          { src: "/figma/outfit/sandals-woven.png", x: 54, y: 74, w: 22 },
          { src: "/figma/outfit/bangles.png", x: 82, y: 34, w: 15 },
        ],
        notes: [
          {
            text: "Impractical, but that’s what all Indian men are wearing. FYI.",
            x: 0,
            y: 4,
            w: 26,
            align: "right",
            arrow: { src: A, x: 20, y: 22, w: 12 },
          },
          {
            text: "Decorative elements & jewellery are always in fashion in India.",
            x: 74,
            y: 3,
            w: 26,
            arrow: { src: A, x: 80, y: 22, w: 11, rotate: 55 },
          },
        ],
      },
      {
        name: "Kurta",
        pieces: [
          bodies,
          { src: "/figma/outfit/him-blue-kurta.png", x: 7, y: 14, w: 36 },
          { src: "/figma/outfit/her-teal-set.png", x: 47, y: 13, w: 36 },
          { src: "/figma/outfit/sandals-pink.png", x: 42, y: 78, w: 20 },
        ],
        notes: [
          {
            text: "No bling bling, less elegant — totally fine.",
            x: 0,
            y: 6,
            w: 24,
            align: "right",
            arrow: { src: A2, x: 18, y: 24, w: 12 },
          },
        ],
      },
    ],
  },
  {
    id: "mehendi",
    day: "Day 2",
    labels: ["Mehendi & Sangeet"],
    blurb: "Colour, pattern and movement. Dress for dancing.",
    fits: [
      {
        name: "Festive",
        pieces: [
          bodies,
          { src: "/figma/outfit/him-white-shirt.png", x: 7, y: 14, w: 36 },
          { src: "/figma/outfit/her-green-kurta.png", x: 46, y: 13, w: 37 },
          { src: "/figma/outfit/bangles.png", x: 82, y: 30, w: 15 },
          { src: "/figma/outfit/potli.png", x: 76, y: 50, w: 16 },
          { src: "/figma/outfit/sandals-pink.png", x: 44, y: 78, w: 19 },
        ],
        notes: [
          {
            text: "Cute bags are great — considered fashionable.",
            x: 72,
            y: 62,
            w: 28,
            arrow: { src: A3, x: 72, y: 55, w: 11, rotate: 20 },
          },
          {
            text: "Decorative elements & jewellery are always in fashion in India.",
            x: 74,
            y: 3,
            w: 26,
            arrow: { src: A, x: 80, y: 22, w: 11, rotate: 55 },
          },
        ],
      },
    ],
  },
  {
    id: "haldi",
    day: "Day 3",
    labels: ["Haldi", "Wedding & Reception"],
    blurb:
      "Haldi turns everything turmeric-yellow — wear what you can stain. Wedding & Reception: your best.",
    fits: [
      {
        name: "Haldi",
        pieces: [
          bodies,
          { src: "/figma/outfit/him-white-shirt.png", x: 7, y: 14, w: 36 },
          { src: "/figma/outfit/her-white-shirt.png", x: 46, y: 13, w: 36 },
          { src: "/figma/outfit/flipflops.png", x: 52, y: 76, w: 22 },
        ],
        notes: [
          {
            text: "Yellow or white you don’t mind ruining.",
            x: 0,
            y: 6,
            w: 24,
            align: "right",
            arrow: { src: A2, x: 18, y: 24, w: 12 },
          },
        ],
      },
      {
        name: "Ceremony",
        pieces: [
          bodies,
          { src: "/figma/outfit/him-white-pants.png", x: 6, y: 13, w: 38 },
          { src: "/figma/outfit/her-teal-set.png", x: 47, y: 13, w: 37 },
          { src: "/figma/outfit/bangles.png", x: 82, y: 32, w: 15 },
          { src: "/figma/outfit/sandals-pink.png", x: 44, y: 78, w: 19 },
        ],
        notes: [
          {
            text: "Bold colour for the ceremony — never white-on-white.",
            x: 74,
            y: 3,
            w: 26,
            arrow: { src: A, x: 80, y: 22, w: 11, rotate: 55 },
          },
        ],
      },
    ],
  },
  {
    id: "casual-2",
    day: "Day 4",
    labels: ["Casual"],
    blurb: "Departure. Back to comfortable — layers for the flight.",
    fits: [
      {
        name: "Travel",
        pieces: [
          bodies,
          { src: "/figma/outfit/him-shirt-jeans.png", x: 6, y: 15, w: 38 },
          { src: "/figma/outfit/her-white-shirt.png", x: 46, y: 13, w: 36 },
          { src: "/figma/outfit/her-cream-skirt.png", x: 49, y: 40, w: 31 },
          { src: "/figma/outfit/flipflops.png", x: 54, y: 76, w: 22 },
        ],
        notes: [
          {
            text: "Whatever’s comfortable on a plane.",
            x: 0,
            y: 6,
            w: 24,
            align: "right",
            arrow: { src: A2, x: 18, y: 24, w: 12 },
          },
        ],
      },
    ],
  },
];

export const wearColors = [
  "#8a38f5",
  "#007cd4",
  "#00c452",
  "#649a00",
  "#f600c5",
  "#ed8235",
  "#ff7b00",
  "#cb8000",
  "#f4cc03",
  "#ffed92",
  "#fdffd9",
  "#8f0a0d",
];
