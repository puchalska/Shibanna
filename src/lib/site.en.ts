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
  "We met in Umeå & fell in love in the night of the biggest aurora we’ve ever seen. 7 years, 3 countries, 2 cultures — Polish & Oriya — and countless little pieces finding their way together.";

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
    body: "Flights from Europe typically run 7,000–9,000 NOK. LOT is cheapest; Lufthansa or Finnair have better service — we recommend Lufthansa. Book international to Delhi or Mumbai, then a short domestic hop to Jharsuguda. We recommend buying the Indian domestic flight through Kiwi or another third-party site.",
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

/* "Guides" — a shelf of book covers, one per topic, straight from the
   Figma "Guides" frame. Every cover's `image` is the exact flattened
   render Figma produces for that card (screenshotted node, cropped to
   the interior), title baked in — not a redraw. Two covers (Flight,
   Street Life) have a unique flight-path/animal graphic Figma only
   drew for them; Family Guide has a real photo with its own warm
   overlay.

   `body` is the actual written guide. Most are still the honest
   placeholder — swap guide by guide as the real writing gets done, no
   code changes needed. A guide with real writing that has structure
   (section headings, a checklist, a comparison table) uses a
   `GuideBlock[]` instead of a plain string; OpenBook in Guides.tsx
   renders either. */
export type GuideBlock =
  | { kind: "heading"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] };

export type Guide = { title: string; image: string; body: string | GuideBlock[] };

const notWrittenYet = "This guide hasn't been written yet — check back closer to the date.";

export const guides: Guide[] = [
  { title: "Hotels", image: "/figma/guides/hotels.png", body: notWrittenYet },
  { title: "Flight", image: "/figma/guides/flight.png", body: notWrittenYet },
  { title: "Events", image: "/figma/guides/events.png", body: notWrittenYet },
  {
    title: "Street Life",
    image: "/figma/guides/street-life.png",
    body: [
      { kind: "heading", text: "How to enjoy India" },
      {
        kind: "p",
        text: "India can be incredibly welcoming, generous and chaotic at the same time. Some perfectly normal Indian interactions can feel strange coming from Europe: someone may offer to carry your bag, help you use an ATM, arrange a taxi, show you where to go, recommend a shop, ask where you're from, ask for a photo, or offer to “help” with something you weren't struggling with. Some people push this with real intensity — looking at you, New Delhi — and the pushy sales tactics in touristy areas annoy most people, not just tourists.",
      },
      {
        kind: "p",
        text: "This doesn't automatically mean something is wrong. India has a much more hands-on, service-oriented culture than most of Europe, and some people make a living from small services, commissions and tips you may not be used to. The trick is telling apart “someone is being helpful” from “I've just accepted a service I'm now expected to pay for.”",
      },
      {
        kind: "p",
        text: "You're allowed to say no. You're also allowed to ask “Is there a charge for this?” before accepting anything — one sentence, and it saves a lot of awkwardness. A firm “no, thank you” (a raised hand works too) is fine. The more mellow you are normally, the more exaggerated that “no” might need to be.",
      },
      { kind: "heading", text: "The most important rule about money" },
      { kind: "p", text: "If you didn't agree to pay for it, don't assume you have to pay for it. This matters most with tours." },
      {
        kind: "p",
        text: "Say you book a Delhi → Agra day trip online and pay the full package upfront. It might include a private car, driver, guide, hotel pickup, entrance tickets, lunch, parking and tolls — but not necessarily gratuities. Being prepaid doesn't mean every person involved has been tipped. And a guide saying “tip is customary” doesn't mean you've acquired a mandatory extra charge.",
      },
      {
        kind: "p",
        text: "Sometimes a new person appears, suddenly “involved” in your trip and expecting to be paid. Ask “Who is this?” and “Is there a charge for this?” Tipping in India is generally discretionary, though common in tourism and hospitality.",
      },
      { kind: "p", text: "Before booking a tour, ask exactly what's included, and get it confirmed in writing where you can:" },
      {
        kind: "list",
        items: [
          "🚗 Transport",
          "👨‍✈️ Driver",
          "🧑‍🏫 Guide",
          "🎫 Entrance tickets",
          "🍛 Meals",
          "🛣️ Tolls",
          "🅿️ Parking",
          "⛽ Fuel",
          "🧳 Luggage",
          "🏨 Hotel pickup/drop-off",
          "💸 Taxes",
          "💰 Tips/gratuities",
        ],
      },
      {
        kind: "p",
        text: "Then you know exactly what you're paying for. If someone says there's no charge and later changes their mind, they lied — push back. That's usually enough for them to let it go.",
      },
      { kind: "heading", text: "The shopping stop" },
      {
        kind: "p",
        text: "On organised trips, guides and taxi drivers may recommend particular shops. Sometimes it's a genuine recommendation; most often the guide or driver gets a commission and it's a tourist trap — pricier for sure, not necessarily a scam. You don't have to buy anything.",
      },
      {
        kind: "p",
        text: "“Thank you, we'll have a look” or simply “No thank you, we're not shopping today” both work — then keep walking. You don't owe someone a purchase because they drove you somewhere; that they're waiting is their risk, not your obligation. The same dynamic shows up with drivers suggesting “alternative” hotels or shops.",
      },
      {
        kind: "list",
        items: [
          "“No thank you, I'm okay.”",
          "“No thank you, we're just looking.”",
          "“No, we're not buying anything.”",
          "“No, it's okay, we've already arranged everything.”",
        ],
      },
      { kind: "heading", text: "Tipping" },
      {
        kind: "p",
        text: "Tipping is fairly intuitive. Restaurants: add 10% or more if you're happy, same as Poland or Norway — optional, not required. Anything hospitality-adjacent, like carrying bags, is a service worth a small tip.",
      },
      {
        kind: "table",
        headers: ["Situation", "What to do"],
        rows: [
          ["Street shop / supermarket", "No tip"],
          ["Chai / casual counter service", "No tip expected"],
          ["Auto-rickshaw", "No tip required; rounding up is fine"],
          ["App taxi", "Optional"],
          ["Airport/hotel porter", "Small cash tip if they carry your bags"],
          ["Housekeeping", "Optional"],
          ["Private driver", "Tip at the end if you were happy"],
          ["Private guide", "Tip at the end if you were happy"],
          ["Restaurant", "Check the bill first, then tip if you like"],
          ["Exceptional personal service", "Tip if you genuinely want to"],
        ],
      },
      {
        kind: "table",
        headers: ["Amount", "What it means"],
        rows: [
          ["₹20–50", "Tiny thank-you / rounding up / very small service"],
          ["₹100", "A normal small gesture"],
          ["₹200–500", "A meaningful tip for someone who genuinely helped you"],
        ],
      },
    ],
  },
  { title: "Family Guide", image: "/figma/guides/family-guide.png", body: notWrittenYet },
  {
    title: "Mental prep",
    image: "/figma/guides/mental-prep.png",
    body: [
      { kind: "heading", text: "Paying in India" },
      {
        kind: "p",
        text: "Worth knowing before you land, since Europe has gone cashless enough that it's easy to assume your phone will do everything. India has a huge digital payment system called UPI, working through QR codes — you'll see it everywhere, even a tiny shop scanning ₹40 off a QR code.",
      },
      {
        kind: "p",
        text: "The catch: UPI isn't as simple for a visitor as it is for an Indian resident. NPCI offers “UPI One World” for international visitors through authorised partner apps, but it needs onboarding/KYC first and is built for merchant payments, not a stand-in for an Indian bank account.",
      },
      { kind: "p", text: "So: bring a card, carry some rupees, and don't depend on your phone alone." },
      {
        kind: "list",
        items: [
          "💳 Card → hotels, larger restaurants, shops",
          "💵 Cash → small shops, tips, transport, unexpected situations",
          "📱 UPI → great if you've actually set it up",
        ],
      },
      { kind: "p", text: "And you don't need to arrive with €500 in cash either — you don't need that much." },
      { kind: "heading", text: "Your little emergency wallet" },
      {
        kind: "p",
        text: "Worth arriving with a small amount of rupees in small denominations — handing someone ₹2,000 for a ₹100 service is awkward when they don't have change. Keep ₹100/₹200/₹500 notes separate from your main wallet, for a porter, a small tip, tea, a small shop, a driver, a temple donation if you want to make one, or any unexpected small expense.",
      },
      { kind: "heading", text: "Rough price comparison" },
      {
        kind: "table",
        headers: ["", "Delhi", "Sambalpur"],
        rows: [
          ["Local meal", "₹300–400 (30–40 NOK / 12–16 PLN)", "₹150–250 (15–25 NOK / 6–10 PLN)"],
          ["Coffee", "~₹220 (22 NOK / 9 PLN)", "~₹110 (11 NOK / 4 PLN)"],
          ["Nice meal for 2", "~₹2,000 (200 NOK / 80 PLN)", "~₹550–1,100 (55–110 NOK / 22–44 PLN)"],
          ["Local transport", "~₹40 (4 NOK / 1.6 PLN)", "~₹30 (3 NOK / 1 PLN)"],
          ["Hotel/night", "~₹6,500–9,000 (650–900 NOK / 260–360 PLN)", "~₹2,000–4,000 (200–400 NOK / 80–160 PLN)"],
        ],
      },
      { kind: "heading", text: "If something goes wrong" },
      { kind: "list", items: ["Hotel", "Airline", "Airport help desk", "Tourist helpline — 1363", "Emergency — 112"] },
    ],
  },
  {
    title: "Culture",
    image: "/figma/guides/culture.png",
    // placeholder copy so the open-book layout is visible with real
    // paragraph flow — swap for the actual guide whenever it's written
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    title: "New Delhi",
    image: "/figma/guides/new-delhi.png",
    body: [
      { kind: "heading", text: "Delhi: if your flight connects there" },
      {
        kind: "p",
        text: "This is probably the thing you'll Google at 2AM before the trip, so here's the short version. First, check what kind of connection you actually have — there are three very different situations.",
      },
      { kind: "heading", text: "Europe → Delhi → elsewhere in India" },
      {
        kind: "p",
        text: "Example: Warsaw → Delhi → Jharsuguda. You're entering India in Delhi, which means immigration → baggage → customs → domestic connection. Delhi Airport is explicit that international passengers connecting to a domestic flight must clear immigration, collect baggage and go through customs there — even with one boarding pass all the way to your final stop, don't assume your suitcase continues without you. IndiGo, for example, requires passengers on international-to-domestic connections to collect their bag at the first Indian airport and drop it again for the domestic leg.",
      },
      { kind: "heading", text: "Delhi → Europe" },
      {
        kind: "p",
        text: "The reverse: your domestic flight lands in Delhi and you continue internationally. All international departures are from Terminal 3 — depending on where your domestic flight arrives and whether bags are checked through, you may need to change terminals and check in again.",
      },
      { kind: "heading", text: "International → international" },
      {
        kind: "p",
        text: "Example: Frankfurt → Delhi → Bangkok. These transfers stay within Terminal 3 — follow the orange signs. You may still need security screening, and it's worth checking in advance whether your specific itinerary needs a transit visa.",
      },
      { kind: "heading", text: "Delhi Airport's colour system" },
      { kind: "p", text: "Worth knowing before you land — it makes the airport far less intimidating." },
      {
        kind: "list",
        items: [
          "🟡 Yellow = domestic transfer — arriving internationally and continuing to an Indian domestic flight: immigration → baggage → customs → follow yellow signs.",
          "🟠 Orange = international transfer — transferring between international flights: follow orange signs.",
        ],
      },
      { kind: "heading", text: "Changing terminals" },
      {
        kind: "p",
        text: "Delhi has T1, T2 and T3 — don't panic. A free inter-terminal shuttle runs 24/7, roughly every 20 minutes; bring your boarding pass and follow the airport's own signs to it. Don't follow a random person offering to “take you to Terminal 3” — follow the signs, and if you need help, ask an airport employee or a help desk.",
      },
      { kind: "heading", text: "Long layover — should I leave the airport?" },
      {
        kind: "list",
        items: [
          "2–4 hours: stay at the airport. A short connection is already immigration, security, baggage and terminal logistics — don't try to “see Delhi” on top of it.",
          "5–8 hours: you can leave, but skip ambitious sightseeing. If you're wiped from a long-haul flight, get a hotel, eat, shower and reset.",
          "Overnight / 12–24 hours: this is when staying in Delhi properly makes sense. For a first visit, pick where to stay based on what's next, not just “the best hotel.”",
        ],
      },
      { kind: "heading", text: "Where to stay in Delhi" },
      { kind: "subheading", text: "Aerocity — easiest for a connection" },
      {
        kind: "p",
        text: "If you're sleeping in Delhi because of an early flight, stay in Aerocity — the hotel district right by the airport, which Delhi Airport itself recommends for longer layovers. Holiday Inn New Delhi Int'l Airport, Novotel New Delhi Aerocity and Lemon Tree Premier Delhi Airport are all options — not that you need one specifically, just that Aerocity is the easy call when the airport is the priority.",
      },
      { kind: "subheading", text: "Connaught Place — if you actually want to see Delhi" },
      {
        kind: "p",
        text: "With a full day or two, staying centrally makes more sense — Connaught Place is one of the city's main hubs, with metro connections, restaurants, and a common base for first-time visitors. Radisson Blu Marina Hotel Connaught Place, The Connaught (IHCL SeleQtions) and The Lalit New Delhi are all in the area.",
      },
      { kind: "subheading", text: "South Delhi — calmer" },
      {
        kind: "p",
        text: "If sensory overload is already a worry, South Delhi is a calmer base than the busiest parts of the city. The trade-off is relying more on cars and the metro than walking everywhere.",
      },
      { kind: "heading", text: "“Your hotel is closed”" },
      {
        kind: "p",
        text: "If a taxi driver tells you your hotel is closed, there's a protest, the road is blocked, they know a better hotel, or to come to “this tourist office” — don't just believe them. Call your hotel, check Google Maps, check your booking. Delhi Airport has official prepaid taxis, plus app-based options like Uber and Ola.",
      },
      {
        kind: "p",
        text: "This exact “your hotel is closed / I know another hotel” scenario shows up in traveller reports, sometimes ending at a business that pays for the diversion. It doesn't mean taxi drivers are dangerous — it means you already have a hotel, and you don't need a stranger to find you another one.",
      },
    ],
  },
];

/* "The Guest Journey" — the full trip broken into its smallest actual
   steps, deliberately over-explicit (nothing bundled, nothing assumed).
   Each group's href points at whichever existing section actually has
   the detail — Preparation for pre-trip logistics, Timeline for the
   day-of schedule. */
export type JourneyGroup = { label?: string; href: string; steps: string[] };
export type JourneyPhase = { date: string; name: string; accent: "orange" | "red"; groups: JourneyGroup[] };

export const journey: JourneyPhase[] = [
  {
    date: "Before you fly",
    name: "Get ready",
    accent: "orange",
    groups: [
      {
        label: "Flights",
        href: "#prepare",
        steps: [
          "Check your passport expiry (6mo+ validity)",
          "Compare flight prices",
          "Book your flights",
          "Save your booking confirmation",
          "Add flight numbers to your calendar",
          "Send us your flight details for pickup",
        ],
      },
      {
        label: "Visa",
        href: "#prepare",
        steps: [
          "Go to the e-visa website",
          "Fill out the application",
          "Pay the $35 fee",
          "Save your visa approval PDF",
          "Print a paper copy as backup",
        ],
      },
      {
        label: "Insurance",
        href: "#prepare",
        steps: [
          "Check if your card already covers travel insurance",
          "Buy insurance if it doesn't",
          "Save your policy number somewhere accessible",
          "Check if your card tier includes lounge access",
        ],
      },
      {
        label: "Vaccinations",
        href: "#prepare",
        steps: [
          "Check which vaccines are recommended",
          "Book a vaccination appointment",
          "Get your first dose",
          "Get your second dose (if needed)",
        ],
      },
      {
        label: "Medication",
        href: "#prepare",
        steps: [
          "Count out prescriptions for the full trip + spares",
          "Keep meds in original labeled packaging",
          "Pack medication in your carry-on",
          "Ask your doctor about malaria prophylaxis",
          "Buy a small travel health kit",
        ],
      },
      {
        label: "Money",
        href: "#prepare",
        steps: [
          "Call your bank — tell them you're travelling",
          "Check your card's foreign transaction fee",
          "Withdraw or exchange some cash",
        ],
      },
      {
        label: "Connectivity",
        href: "#prepare",
        steps: [
          "Download Airalo or Holafly",
          "Buy an India e-SIM data plan",
          "Confirm your home SIM stays active for OTPs",
        ],
      },
      {
        label: "Packing",
        href: "#what-to-wear",
        steps: [
          "Read What to Wear for each event",
          "Pack light, breathable fabrics (~30°C)",
          "Pack for Haldi separately (stainable clothes)",
          "Set aside a blessing or letter — skip the gift",
        ],
      },
      {
        label: "Mindset",
        href: "#prepare",
        steps: ["Look up Sambalpur on Google Maps Street View", "Read the full day-by-day below once"],
      },
    ],
  },
  {
    date: "17th December",
    name: "Arrival",
    accent: "red",
    groups: [
      {
        href: "#schedule",
        steps: [
          "You land",
          "Clear immigration & customs",
          "Find your taxi",
          "Drive to Grand Siba Hotel",
          "Check in",
          "Drop your bags in your room",
          "Optional shopping (3–7PM)",
          "Evening — free",
        ],
      },
    ],
  },
  {
    date: "18th December",
    name: "Engagement, Mehendi & Dinner",
    accent: "red",
    groups: [
      {
        href: "#schedule",
        steps: [
          "Morning — free",
          "Get dressed for Engagement",
          "Engagement ceremony (12–3PM)",
          "Change outfit for Mehendi/Dinner",
          "Mehendi (from 4PM)",
          "Let your henna dry before touching anything",
          "Dinner (evening)",
          "Night winds down",
        ],
      },
    ],
  },
  {
    date: "19th December",
    name: "Recovery",
    accent: "red",
    groups: [
      {
        href: "#schedule",
        steps: [
          "Morning — recover",
          "Decide: safari or shopping",
          "Safari / shopping (10AM–6PM)",
          "Repack your bags",
          "Check out of Grand Siba",
          "Transfer to The Royal Retreat",
          "Check in",
          "Lay out tomorrow's Haldi outfit",
          "Early night",
        ],
      },
    ],
  },
  {
    date: "20th December",
    name: "Wedding Day",
    accent: "red",
    groups: [
      {
        href: "#schedule",
        steps: [
          "Wear clothes you don't mind staining",
          "Haldi (8–11AM)",
          "Shower off the turmeric",
          "Midday reset / rest",
          "Get dressed for the wedding",
          "Baraat (from 3PM)",
          "Find your seat for the ceremony",
          "Wedding ceremony",
          "Reception (8PM–midnight)",
          "Say hello to Anna & Shib if you catch them",
          "Duck out whenever you're done",
        ],
      },
    ],
  },
  {
    date: "21st December",
    name: "Departure",
    accent: "red",
    groups: [
      {
        href: "#schedule",
        steps: [
          "Slow morning",
          "Pack your bags",
          "Check out",
          "Decide: fly to Delhi or go direct",
          "Optional flight to Delhi (2–6PM)",
          "Onward travel home",
          "Goodbye",
        ],
      },
    ],
  },
];

// folded into Guides as its own card (see `guides` above) instead of
// staying a separate top-level nav destination — same content, reusing
// the phase/group structure directly rather than duplicating any of it
guides.push({
  title: "Guest Journey",
  image: "/figma/guides/journey.png",
  body: journey.flatMap((phase): GuideBlock[] => [
    { kind: "heading", text: `${phase.name} — ${phase.date}` },
    ...phase.groups.flatMap((g): GuideBlock[] => [
      ...(g.label ? [{ kind: "subheading", text: g.label } as GuideBlock] : []),
      { kind: "list", items: g.steps },
    ]),
  ]),
});

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
      { label: "Mehendi / Henna & Dinner", start: 16, end: 23 },
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
        title: "Dinner",
        body: "European dinner. We chat and dance and enjoy. Not a part of the official ceremony. Elegant casual.",
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

// the wardrobe grid's per-look slots — always in this order, always in
// this position. "outfit" is for a photo that was never shot piece by
// piece (a ghost-mannequin combo, a tunic that doesn't have a clean
// waist seam to crop at): it merges the top+bottom position into one
// panel instead of pretending to split it. Cropping one photo to fill
// two of these slots (e.g. a combined shot cropped once for "bottom"
// and again, tighter, for "shoes") is fine — the Figma reference itself
// does this — but the crop is baked into its own image file ahead of
// time (see public/figma/outfit/garments), not computed at render time.
// "layers" is the sari-specific case: a blouse + petticoat photographed
// together as the pieces worn under a sari, distinct from the sari's
// own drape (which is "outfit") and from jewelry/shoes/bag
export type GarmentCategory = "top" | "bottom" | "shoes" | "bag" | "jewelry" | "layers" | "outfit";

// one garment photo for one look's wardrobe grid slot. Every slot in the
// grid is a fixed size (see LookGrid) and every image fills it via
// object-fit: cover, so there's nothing to pass but the image itself.
export type Garment = {
  person: "him" | "her";
  category: GarmentCategory;
  label: string;
  image: string;
};

export type Fit = {
  name: string;
  image: string;
  notes: { him: string; her: string };
  // most looks put her in a distinct top + bottom; a one-piece sari/lehenga
  // drape doesn't split cleanly, so the wardrobe overlay shows it as a
  // single bigger compartment instead of guessing a seam that isn't there
  herStyle?: "sari";
  // isolated per-garment cutouts for the wardrobe grid's fixed top/bottom/
  // shoes/bag slots, recovered from the site's earlier paper-doll
  // prototype plus new photography from the Figma reference. Only
  // populated where real source photos exist for a look — other fits
  // fall back to the flattened photo + notes treatment.
  garments?: Garment[];
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
    garments: [
      // one combined photo, pre-cropped three ways — no separate
      // shirt/jeans/shoe photos exist for this look
      { person: "him", category: "top", label: "Shirt", image: "/figma/outfit/garments/him-look1-shirt.png" },
      { person: "him", category: "bottom", label: "Jeans", image: "/figma/outfit/garments/him-look1-jeans.png" },
      { person: "him", category: "shoes", label: "Shoes", image: "/figma/outfit/garments/him-look1-shoes.png" },
      { person: "her", category: "top", label: "Shirt", image: "/figma/outfit/garments/her-white-shirt.png" },
      { person: "her", category: "bottom", label: "Skirt", image: "/figma/outfit/garments/her-look1-skirt.png" },
      { person: "her", category: "shoes", label: "Sandals", image: "/figma/outfit/garments/sandals-woven.png" },
      { person: "her", category: "bag", label: "Bag", image: "/figma/outfit/garments/potli.png" },
      { person: "her", category: "bag", label: "Patchwork Bag", image: "/figma/outfit/garments/her-casual1-bag2.png" },
      { person: "her", category: "jewelry", label: "Bangles", image: "/figma/outfit/garments/bangles.png" },
    ],
  },
  {
    name: "Look 2",
    image: "/figma/outfit/looks/casual-2.webp",
    notes: {
      him: "Very reasonable.",
      her: "Cute bags are great, considered fashionable.",
    },
    garments: [
      { person: "him", category: "top", label: "Shirt", image: "/figma/outfit/garments/him-white-shirt.png" },
      { person: "him", category: "bottom", label: "Pants", image: "/figma/outfit/garments/him-look2-pants.png" },
      // same on-model photo, pre-cropped down to just the shoes at the ankle
      { person: "him", category: "shoes", label: "Shoes", image: "/figma/outfit/garments/him-look2-shoes.png" },
      { person: "her", category: "top", label: "Kurta", image: "/figma/outfit/garments/her-look2-kurta.png" },
      { person: "her", category: "bottom", label: "Pants", image: "/figma/outfit/garments/her-look2-pants.png" },
      { person: "her", category: "shoes", label: "Flip-flops", image: "/figma/outfit/garments/flipflops.png" },
      { person: "her", category: "bag", label: "Bag", image: "/figma/outfit/garments/potli.png" },
      { person: "her", category: "jewelry", label: "Earrings", image: "/figma/outfit/garments/her-casual2-jewelry.png" },
    ],
  },
  {
    name: "Look 3",
    image: "/figma/outfit/looks/casual-3.webp",
    notes: {
      him: "No bling bling, less elegant.",
      her: "The more bling bling, the more elegant it is.",
    },
    garments: [
      // the tunic drapes asymmetrically with no clean waist seam to crop
      // at — same reasoning as a sari, so it stays one outfit panel
      { person: "him", category: "outfit", label: "Outfit", image: "/figma/outfit/garments/him-tunic-pants.png" },
      { person: "him", category: "shoes", label: "Sandals", image: "/figma/outfit/garments/him-sandals-tan.png" },
      { person: "her", category: "top", label: "Tunic", image: "/figma/outfit/garments/her-look3-tunic.png" },
      { person: "her", category: "bottom", label: "Pants", image: "/figma/outfit/garments/her-look3-pants.png" },
      { person: "her", category: "shoes", label: "Sandals", image: "/figma/outfit/garments/her-sandals-coral.png" },
      { person: "her", category: "bag", label: "Tote", image: "/figma/outfit/garments/her-tote-black.png" },
      { person: "her", category: "jewelry", label: "Earring", image: "/figma/outfit/garments/her-casual3-jewelry.png" },
    ],
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
    labels: ["Engagement & Mehendi & Dinner"],
    fits: [
      {
        name: "Look 1",
        image: "/figma/outfit/looks/mehendi-1.webp",
        notes: {
          him: "Green kurta + white pants. Easy, breathable.",
          her: "Mustard kurta set, striped dupatta, beaded clutch.",
        },
        garments: [
          // long kurta drapes past the waist with no seam to crop at,
          // same reasoning as Haldi/Casual's tunic looks
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-mehendi1-outfit.png" },
          { person: "her", category: "outfit", label: "Kurta & Dupatta", image: "/figma/outfit/garments/her-mehendi1-outfit.png" },
          { person: "her", category: "bag", label: "Clutch", image: "/figma/outfit/garments/her-mehendi1-bag.png" },
          { person: "her", category: "shoes", label: "Sandals", image: "/figma/outfit/garments/her-mehendi1-shoes.png" },
        ],
      },
      {
        name: "Look 2",
        image: "/figma/outfit/looks/mehendi-2.webp",
        notes: {
          him: "Printed kurta, more pattern.",
          her: "Sage kurta with a sheer dupatta drape.",
        },
        garments: [
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-mehendi2-outfit.png" },
          { person: "her", category: "outfit", label: "Kurta & Dupatta", image: "/figma/outfit/garments/her-mehendi2-outfit.png" },
          { person: "her", category: "jewelry", label: "Earrings", image: "/figma/outfit/garments/her-mehendi2-jewelry.png" },
          { person: "her", category: "bag", label: "Clutch", image: "/figma/outfit/garments/her-mehendi2-bag.png" },
          { person: "her", category: "shoes", label: "Sandals", image: "/figma/outfit/garments/her-mehendi2-shoes.png" },
        ],
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
        garments: [
          // the kurta drapes long over the pants with no waist seam to
          // crop at, same reasoning as Casual Look 3's tunic
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-haldi1-outfit.png" },
          { person: "him", category: "shoes", label: "Sandals", image: "/figma/outfit/garments/him-haldi1-shoes.png" },
          { person: "her", category: "outfit", label: "Outfit", image: "/figma/outfit/garments/her-haldi1-outfit.png" },
          { person: "her", category: "jewelry", label: "Earrings", image: "/figma/outfit/garments/her-haldi1-jewelry.png" },
          { person: "her", category: "shoes", label: "Sandals", image: "/figma/outfit/garments/her-haldi1-shoes.png" },
          { person: "her", category: "bag", label: "Bag", image: "/figma/outfit/garments/her-haldi1-bag.png" },
        ],
      },
      {
        name: "Look 2",
        image: "/figma/outfit/looks/haldi-2.webp",
        notes: {
          him: "More details = considered as more elegant.",
          her: "More sheen is also nice. Salwar suit + dupatta.",
        },
        garments: [
          // shoes are baked into this photo already (visible at the hem) —
          // no separate shoe shot exists for him in this look
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-haldi2-outfit.png" },
          { person: "her", category: "outfit", label: "Outfit", image: "/figma/outfit/garments/her-haldi2-outfit.png" },
          { person: "her", category: "jewelry", label: "Bracelet", image: "/figma/outfit/garments/her-haldi2-jewelry.png" },
          { person: "her", category: "shoes", label: "Sandals", image: "/figma/outfit/garments/her-haldi2-shoes.png" },
          { person: "her", category: "bag", label: "Bag", image: "/figma/outfit/garments/her-haldi2-bag.png" },
        ],
      },
      {
        name: "Look 3",
        image: "/figma/outfit/looks/haldi-3.webp",
        notes: {
          him: "Longer kurta + white pants.",
          her: "Anarkali with some shiny bits.",
        },
        garments: [
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-haldi3-outfit.png" },
          { person: "her", category: "outfit", label: "Outfit", image: "/figma/outfit/garments/her-haldi3-outfit.png" },
          { person: "her", category: "jewelry", label: "Necklace", image: "/figma/outfit/garments/her-haldi3-jewelry.png" },
          { person: "her", category: "shoes", label: "Sandals", image: "/figma/outfit/garments/her-haldi3-shoes.png" },
          { person: "her", category: "bag", label: "Bag", image: "/figma/outfit/garments/her-haldi3-bag.png" },
        ],
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
        herStyle: "sari",
        garments: [
          { person: "him", category: "outfit", label: "Suit", image: "/figma/outfit/garments/him-wedding1-outfit.png" },
          { person: "her", category: "outfit", label: "Sari", image: "/figma/outfit/garments/her-wedding1-outfit.png" },
          // the blouse + petticoat worn under the sari — a real separate
          // photo, not part of the draped sari shot itself
          { person: "her", category: "layers", label: "Blouse & Petticoat", image: "/figma/outfit/garments/her-wedding1-layers.png" },
          { person: "her", category: "shoes", label: "Flats", image: "/figma/outfit/garments/her-wedding1-shoes.png" },
        ],
      },
      {
        name: "Look 2",
        image: "/figma/outfit/looks/wedding-2.webp",
        notes: {
          him: "Beaded kurta. Very elegant.",
          her: "Lehenga set (top + skirt) with dupatta.",
        },
        garments: [
          { person: "her", category: "outfit", label: "Sari", image: "/figma/outfit/garments/her-wedding2-outfit.png" },
          { person: "her", category: "shoes", label: "Sandals", image: "/figma/outfit/garments/her-wedding2-shoes.png" },
        ],
      },
      {
        name: "Look 3",
        image: "/figma/outfit/looks/wedding-3.webp",
        notes: {
          him: "Kurta with beading.",
          her: "Sari in a vibrant color.",
        },
        herStyle: "sari",
        garments: [
          // no separate layers/shoes photos exist for this look — the
          // lehenga is complete as shown, nothing underneath to isolate
          { person: "him", category: "outfit", label: "Kurta", image: "/figma/outfit/garments/him-wedding3-outfit.png" },
          { person: "her", category: "outfit", label: "Lehenga", image: "/figma/outfit/garments/her-wedding3-outfit.png" },
        ],
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
