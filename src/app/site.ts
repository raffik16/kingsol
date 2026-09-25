import type { Metadata } from "next";

// Public origin used for canonical links, the sitemap and social preview URLs.
// Set NEXT_PUBLIC_SITE_URL at build time (e.g. https://example.com); on Vercel the
// production domain is picked up automatically.
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

// Shared Open Graph fields, including the social preview image. A page's `openGraph`
// replaces the layout's entirely, so pages spread this in rather than relying on inheritance.
export const baseOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: "King Sol & The Vibes",
  locale: "en_US",
  images: [
    {
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: "King Sol & The Vibes — Latin Reggae Rock from Los Angeles",
    },
  ],
};
