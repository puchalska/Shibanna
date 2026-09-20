import Hero from "@/components/Hero";
import Invitation from "@/components/Invitation";
import Nav from "@/components/Nav";
import Story from "@/components/Story";
import Preparation from "@/components/Preparation";
import Guides from "@/components/Guides";
import Schedule from "@/components/Schedule";
import WhatToWear from "@/components/WhatToWear";
import Footer from "@/components/Footer";

/* Shared between both locale routes (src/app/page.tsx = English,
   src/app/pl/page.tsx = Polish) — each wraps this in its own
   LocaleProvider, so it's the exact same tree rendering different
   content rather than two separate page implementations. */
export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <Invitation />
      <Story />
      <Preparation />
      <Guides />
      <Schedule />
      <WhatToWear />
      <Footer />
    </main>
  );
}
