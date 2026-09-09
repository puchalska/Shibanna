import type { NextConfig } from "next";

// For GitHub Pages project sites the app is served from https://<user>.github.io/<repo>/,
// so the build needs a basePath. The deploy workflow sets NEXT_PUBLIC_BASE_PATH="/<repo>".
// Local `next dev` / `next build` leave it empty and serve from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export", // static HTML export -> ./out, hostable on GitHub Pages
  trailingSlash: true, // emit /about/index.html so paths resolve without a server
  images: { unoptimized: true }, // no Image Optimization server on Pages
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
