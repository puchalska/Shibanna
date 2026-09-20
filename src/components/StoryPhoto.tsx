"use client";

import { motion } from "motion/react";
import { asset } from "@/lib/asset";

/* The actual night — a beach selfie, warmed to the site's own red/coral
   grading. No frame: it fades up into the page's own red at the top
   instead of stopping at a hard edge. Loose on the page rather than
   fixed in place — like a real photo left on a table, it can be picked
   up and nudged around, and eases back when let go. */

export default function StoryPhoto() {
  return (
    <motion.div
      drag
      dragElastic={0.5}
      dragConstraints={{ top: -40, bottom: 40, left: -60, right: 60 }}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileDrag={{ scale: 1.04, boxShadow: "10px 16px 32px rgba(0,0,0,0.45)", cursor: "grabbing" }}
      className="relative mx-auto mt-8 aspect-[1400/1085] w-full max-w-md touch-none overflow-hidden rounded-[6px] shadow-[0_0_0_rgba(0,0,0,0)]"
      style={{ cursor: "grab" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/together.jpg")}
        alt="Anna & Shib"
        draggable={false}
        className="pointer-events-none size-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(143,10,13,1) 0%, rgba(143,10,13,0) 45%)" }}
      />
    </motion.div>
  );
}
