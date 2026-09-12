import Hero from "@/components/Hero";
import Invitation from "@/components/Invitation";
import Nav from "@/components/Nav";
import Story from "@/components/Story";
import Schedule from "@/components/Schedule";
import WhatToWear from "@/components/WhatToWear";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Invitation />
      <Story />
      <Schedule />
      <WhatToWear />
      <Footer />
    </main>
  );
}
