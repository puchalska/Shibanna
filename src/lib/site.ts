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
        image: "/figma/taxi-map.jpg",
      },
      {
        title: "Grand Siba Hotel",
        body: "Taxi will drive you to the hotel in Sambalpur. We will spend there 2 nights.",
        image: "/figma/hotel.jpg",
      },
      {
        title: "Shopping is optional",
        body: "Another chance of obtaining clothes for ceremony is 19th of December.",
        image: "/figma/shop-anandworld.jpg",
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

/* ---------- What to wear ---------- */

export type Occasion = {
  id: string;
  day: string;
  labels: string[];
  blurb: string;
  him: { src: string; caption: string }[];
  her: { src: string; caption: string }[];
  extras: { src: string; caption: string }[];
  notes: string[];
};

export const occasions: Occasion[] = [
  {
    id: "casual",
    day: "Day 1",
    labels: ["Casual"],
    blurb: "Travel days & downtime. Comfortable, breathable, nothing precious.",
    him: [
      { src: "/figma/outfit-casual-him2.jpg", caption: "Shirt + jeans" },
      { src: "/figma/outfit-casual-him.jpg", caption: "Kurta + linen trousers" },
    ],
    her: [
      { src: "/figma/outfit-skirt.jpg", caption: "Tiered cotton skirt" },
      { src: "/figma/outfit-shirt.jpg", caption: "Oversized shirt" },
    ],
    extras: [
      { src: "/figma/outfit-flipflops.jpg", caption: "Flip flops" },
      { src: "/figma/outfit-sandals-woven.jpg", caption: "Woven mules" },
    ],
    notes: [
      "Impractical but that’s what all Indian men are wearing. FYI.",
      "No bling bling, less elegant — totally fine.",
    ],
  },
  {
    id: "mehendi",
    day: "Day 2",
    labels: ["Mehendi & Sangeet"],
    blurb: "Colour, pattern and movement. Dress for dancing.",
    him: [{ src: "/figma/outfit-casual-him.jpg", caption: "Light kurta" }],
    her: [{ src: "/figma/outfit-mehendi-her.jpg", caption: "Kurta + palazzo" }],
    extras: [
      { src: "/figma/outfit-bangles.jpg", caption: "Bangles" },
      { src: "/figma/outfit-potli.jpg", caption: "Potli bag" },
      { src: "/figma/outfit-sandals-pink.jpg", caption: "Block heels" },
    ],
    notes: ["Decorative elements & jewellery are always in fashion in India."],
  },
  {
    id: "haldi",
    day: "Day 3",
    labels: ["Haldi", "Wedding & Reception"],
    blurb:
      "Haldi = turmeric everywhere, wear something you can throw away. Wedding & Reception = your best.",
    him: [
      { src: "/figma/outfit-shirt2.jpg", caption: "Haldi: old white shirt" },
      { src: "/figma/outfit-pants.jpg", caption: "Wedding: tailored set" },
    ],
    her: [
      { src: "/figma/outfit-wedding-her.jpg", caption: "Wedding: shirt + palazzo" },
    ],
    extras: [
      { src: "/figma/outfit-bangles.jpg", caption: "Bangles" },
      { src: "/figma/outfit-sandals-pink.jpg", caption: "Block heels" },
    ],
    notes: ["Yellow / white for Haldi. Bold colour for the ceremony — never white-on-white."],
  },
  {
    id: "casual-2",
    day: "Day 4",
    labels: ["Casual"],
    blurb: "Departure. Back to comfortable.",
    him: [{ src: "/figma/outfit-casual-him2.jpg", caption: "Shirt + jeans" }],
    her: [{ src: "/figma/outfit-skirt.jpg", caption: "Skirt + shirt" }],
    extras: [{ src: "/figma/outfit-flipflops.jpg", caption: "Flip flops" }],
    notes: ["Travel clothes. Layers for the flight."],
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
