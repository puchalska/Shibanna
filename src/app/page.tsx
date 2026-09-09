import Hero from "@/components/Hero";
import Invitation from "@/components/Invitation";
import Story from "@/components/Story";
import Schedule from "@/components/Schedule";
import WhatToWear from "@/components/WhatToWear";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Invitation />
      <Story />
      <Schedule />
      <WhatToWear />
      <Footer />
    </main>
  );
}
