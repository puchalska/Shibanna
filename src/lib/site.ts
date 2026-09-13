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

export const anniversaryNote =
  "If you can’t make it this year, save the date — 30.12.2027 — for our 1st anniversary in Sri Lanka.";

/* "What you need to prepare" — pulled from the guest-info doc. Practical,
   pre-trip logistics (visa, flights, insurance, gift, hotels), distinct
   from What to Wear's per-occasion styling. */
export const preparation = {
  visa: {
    body: "Most guests will need an Indian e-tourist visa. Apply once you’ve booked your flights — approval usually takes about a week, but apply a month ahead just in case. We’ll send detailed instructions closer to the date.",
    cost: "$35",
    link: "https://indianvisaonline.gov.in/evisa/Registration",
    linkLabel: "Apply for the e-visa",
  },
  insurance:
    "Travel insurance is recommended — check whether your credit card already covers it. We'd highly recommend getting a credit card and topping it up to a higher bracket just in case. Check your benefits for access to airport lounges — might come in handy.",
  vaccine:
    "No vaccination is mandatory for European travellers, however you will be entering a malaria threat zone. Some vaccines take a couple of doses, so it's nice to get prepared in advance.",
  medication:
    "Bring enough of any prescription medication for the whole trip plus a few spare days, kept in its original labeled packaging in your carry-on. Ask your doctor about malaria prophylaxis before you go. A small travel kit — something for an upset stomach, painkillers, and rehydration salts — covers most of what actually comes up.",
  flights: {
    body: "Flights from Europe typically run 7,000–9,000 NOK. LOT is cheapest; Lufthansa or Finnair have better service — we recommend Lufthansa. Book international to Delhi or Mumbai, then a short domestic hop to Jharsuguda.",
    example: "e.g. Lufthansa Frankfurt–Delhi, then IndiGo Delhi–Jharsuguda.",
  },
  payments:
    "Cards are widely accepted in hotels, restaurants and shops in cities, but carry some cash for small vendors, markets and tips — Sambalpur isn’t as card-friendly as Delhi or Mumbai. UPI (India’s dominant payment app) needs an Indian bank account, so it’s not usable by most guests. Tell your bank you’re travelling so your card doesn’t get blocked, and expect a foreign-transaction fee unless your card waives it.",
  esim:
    "Get an e-SIM before you fly — apps like Airalo or Holafly let you buy an India data plan and activate it as soon as you land, no physical SIM swap needed. Keep your home SIM active (even just for incoming texts) so you can still receive OTP codes for banking and 2FA. A local physical SIM is an alternative, but needs ID and can take longer to set up.",
  packing:
    "Light, breathable fabrics — expect around 30°C. See What to Wear for outfit details per event.",
  gift: "Only your blessings and letters.",
  mentalPrep:
    "Sambalpur isn’t a tourist destination — it’s a real, local, working city, not a polished one. Before you go, pull it up on Google Maps and have a walk through Street View. Seeing the streets, the traffic, the pace ahead of time makes it feel like part of the adventure instead of a surprise.",
};

export type Hotel = { name: string; dates: string; link: string };

export const hotels: Hotel[] = [
  {
    name: "Grand Siba Hotel",
    dates: "17–19 December",
    link: "https://www.tripadvisor.in/Hotel_Review-g1213781-d12335313-Reviews-Hotel_The_Grand_Siba-Sambalpur_Sambalpur_District_Odisha.html",
  },
  {
    name: "The Royal Retreat",
    dates: "20 December · wedding venue",
    link: "https://royalretreathotel.com",
  },
];

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

/* the "Block" header variants, taken from the Figma component:
   Arrival / Departure  → transparent fill, coral #ff9595 dashed border, coral text
   Prewedding / Wedding  → orange #ed8235 fill+border, dark #642526 text
   Recovery              → cream #efe4ce fill+border, dark #642526 text
   (a thick dashed border in the fill colour lets the red page show through
   the gaps — the "perforated" edge) */
export type DayHeader = { fill: string; border: string; text: string };

const HEADER = {
  coral: { fill: "transparent", border: "#ff9595", text: "#ff9595" },
  orange: { fill: "#ed8235", border: "#ed8235", text: "#642526" },
  cream: { fill: "#efe4ce", border: "#efe4ce", text: "#642526" },
} satisfies Record<string, DayHeader>;

export type Day = {
  id: string;
  date: string;
  name: string;
  header: DayHeader;
  blocks: TimelineBlock[];
  cards: EventCard[];
};

export const days: Day[] = [
  {
    id: "arrival",
    date: "17th December",
    name: "Arrival",
    header: HEADER.coral,
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
    header: HEADER.orange,
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
    header: HEADER.cream,
    blocks: [
      {
        label: "(Optional) Safari or / and Shopping",
        start: 10,
        end: 18,
        optional: true,
      },
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
    header: HEADER.orange,
    blocks: [
      { label: "Haldi", start: 8, end: 11 },
      { label: "Barat & Wedding", start: 15, end: 20 },
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
    header: HEADER.coral,
    blocks: [
      { label: "Flight to Delhi", start: 14, end: 18, optional: true },
    ],
    cards: [
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

/* ---------- What to wear ----------
   Full outfit photography (guest-styling shoot) — 3 alternate "looks" per
   occasion, each a photo pair (him + her, background removed) plus a
   short styling note per person. Replaces the earlier hand-assembled
   paper-doll collage (individual garment cut-outs positioned by guessed
   x/y/rotate) now that real composed photography exists for every
   occasion. Notes were originally baked into the photos as handwritten
   captions; they're transcribed here as plain text instead, so they're
   editable without re-exporting an image. The "Next outfit" button still
   cycles through an occasion's `fits`. */

export type Fit = {
  name: string;
  image: string;
  notes: { him: string; her: string };
};

export type Occasion = {
  id: string;
  day: string;
  labels: string[];
  fits: Fit[];
  colors: string[];
};

// per-occasion colour chips — sampled from that occasion's own garment
// photos, then normalised to a clean swatch presentation (real fabric
// colours read as muddy under photo shading; this keeps the hue/identity
// but lifts saturation/lightness into "paint chip" range).
const casualColors = [
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
const mehendiColors = [
  "#8c8c4d",
  "#8c1c1c",
  "#468c46",
  "#5d8c2e",
  "#8c661c",
  "#4d8c4d",
  "#a8a85c",
];
const haldiColors = [
  "#d87676",
  "#e5c37e",
  "#d8d876",
  "#8c1c1c",
  "#a87730",
  "#f4cc03",
  "#fdffd9",
];
const weddingColors = [
  "#8c5438",
  "#d87860",
  "#8c4646",
  "#901c1c",
  "#8c8c46",
  "#c09048",
  "#8c541c",
];

const casualFits: Fit[] = [
  {
    name: "Look 1",
    image: "/figma/outfit/looks/casual-1.webp",
    notes: {
      him: "Impractical, but that’s what all Indian men are wearing. FYI.",
      her: "Decorative elements & jewellery are always in fashion in India.",
    },
  },
  {
    name: "Look 2",
    image: "/figma/outfit/looks/casual-2.webp",
    notes: {
      him: "Very reasonable.",
      her: "Cute bags are great, considered fashionable.",
    },
  },
  {
    name: "Look 3",
    image: "/figma/outfit/looks/casual-3.webp",
    notes: {
      him: "No bling bling, less elegant.",
      her: "The more bling bling, the more elegant it is.",
    },
  },
];

export const occasions: Occasion[] = [
  {
    id: "casual",
    day: "Day 1",
    labels: ["Casual"],
    fits: casualFits,
    colors: casualColors,
  },
  {
    id: "mehendi",
    day: "Day 2",
    labels: ["Mehendi & Sangeet"],
    fits: [
      {
        name: "Look 1",
        image: "/figma/outfit/looks/mehendi-1.webp",
        notes: {
          him: "Long kurta with lot of details. Max elegance.",
          her: "Long kurti with dupatta. Max elegance.",
        },
      },
      {
        name: "Look 2",
        image: "/figma/outfit/looks/mehendi-2.webp",
        notes: {
          him: "Long kurta with less details.",
          her: "Long kurti with dupatta.",
        },
      },
      {
        name: "Look 3",
        image: "/figma/outfit/looks/mehendi-3.webp",
        notes: {
          him: "Long kurta with less details.",
          her: "Long kurti with dupatta.",
        },
      },
    ],
    colors: mehendiColors,
  },
  {
    id: "haldi",
    day: "Day 3",
    labels: ["Haldi"],
    fits: [
      {
        name: "Look 1",
        image: "/figma/outfit/looks/haldi-1.webp",
        notes: {
          him: "Yellow kurta + white linen pants are great.",
          her: "White simple salwar suit + yellow shawl.",
        },
      },
      {
        name: "Look 2",
        image: "/figma/outfit/looks/haldi-2.webp",
        notes: {
          him: "More details = considered as more elegant.",
          her: "More sheen is also nice. Salwar suit + dupatta.",
        },
      },
      {
        name: "Look 3",
        image: "/figma/outfit/looks/haldi-3.webp",
        notes: {
          him: "Longer kurta + white pants.",
          her: "Anarkali with some shiny bits.",
        },
      },
    ],
    colors: haldiColors,
  },
  {
    id: "wedding",
    day: "Day 3",
    labels: ["Wedding & Reception"],
    fits: [
      {
        name: "Look 1",
        image: "/figma/outfit/looks/wedding-1.webp",
        notes: {
          him: "European suit is a great idea.",
          her: "Shiny sari.",
        },
      },
      {
        name: "Look 2",
        image: "/figma/outfit/looks/wedding-2.webp",
        notes: {
          him: "Beaded kurta. Very elegant.",
          her: "Lehenga set (top + skirt) with dupatta.",
        },
      },
      {
        name: "Look 3",
        image: "/figma/outfit/looks/wedding-3.webp",
        notes: {
          him: "Kurta with beading.",
          her: "Sari in a vibrant color.",
        },
      },
    ],
    colors: weddingColors,
  },
  {
    id: "casual-2",
    day: "Day 4",
    labels: ["Casual"],
    fits: casualFits,
    colors: casualColors,
  },
];
