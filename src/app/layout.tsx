import type { Metadata } from "next";
import { Tiro_Devanagari_Hindi, Arimo } from "next/font/google";
import { asset } from "@/lib/asset";
import "./globals.css";

const serif = Tiro_Devanagari_Hindi({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const label = Arimo({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anna & Shib — 17–20 December 2026, Sambalpur",
  description:
    "Anna & Shib are getting married in Sambalpur, India, 17–20 December 2026. Schedule, travel and what to wear.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${label.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div
          id="bg"
          style={{ backgroundImage: `url(${asset("/figma/bg-red.jpg")})` }}
        />
        {children}
      </body>
    </html>
  );
}
