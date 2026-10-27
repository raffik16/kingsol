import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import { getPayload } from "payload";
import bandPhoto from "../../../public/images/band.jpg";
import type { HomePage } from "../../payload-types";
import FadeIn from "./components/FadeIn";
import ContactSection from "./components/ContactSection";
import InstagramFeed from "./components/InstagramFeed";
import ReleaseGrid, { type Release } from "./components/ReleaseGrid";
import { socials } from "./components/SocialLinks";
import { ToastProvider } from "./components/Toast";
import { siteUrl } from "../site";

type Show = NonNullable<HomePage["shows"]["upcoming"]>[number];

const releaseTypes = { album: "AlbumRelease", single: "SingleRelease", ep: "EPRelease" } as const;

// schema.org data so search engines can tie this page to the band and its releases.
const bandJsonLd = (releases: Release[]) => ({
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "King Sol & The Vibes",
  genre: "Latin Reggae Rock",
  foundingDate: "2018",
  foundingLocation: { "@type": "Place", name: "Los Angeles, CA" },
  sameAs: socials.map((s) => s.href),
  album: releases.map((r) => ({
    "@type": "MusicAlbum",
    name: r.title,
    datePublished: r.year,
    albumReleaseType: `https://schema.org/${releaseTypes[r.type]}`,
    url: `https://open.spotify.com/album/${r.spotifyId}`,
  })),
});

// Format in Los Angeles time so the server's timezone can't shift the date or time.
const showDate = (iso: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", ...options }).format(new Date(iso));

// schema.org events make shows eligible for Google's event listings in search.
const showJsonLd = (show: Show) => ({
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  name: `King Sol & The Vibes at ${show.venue}`,
  description: `King Sol & The Vibes bring their high energy Latin Reggae Rock to ${show.venue} in ${show.address.city}, ${show.address.region}.${show.free ? " Free show." : ""}`,
  image: [new URL("/images/band.jpg", siteUrl).href, new URL("/og.png", siteUrl).href],
  startDate: show.start,
  ...(show.end ? { endDate: show.end } : {}),
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: show.venue,
    address: {
      "@type": "PostalAddress",
      streetAddress: show.address.street,
      addressLocality: show.address.city,
      addressRegion: show.address.region,
      postalCode: show.address.postalCode,
      addressCountry: "US",
    },
  },
  performer: { "@type": "MusicGroup", name: "King Sol & The Vibes" },
  organizer: { "@type": "MusicGroup", name: "King Sol & The Vibes", url: siteUrl.href },
  ...(show.free
    ? {
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          url: new URL("/#shows", siteUrl).href,
          price: 0,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      }
    : {}),
});

export default async function Home() {
  const payload = await getPayload({ config });
  const { about, music, shows: showsSection, contact } = await payload.findGlobal({ slug: "home-page" });
  const releases = music.releases ?? [];
  const shows = (showsSection.upcoming ?? []).toSorted((a, b) => a.start.localeCompare(b.start));

  return (
    <ToastProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([bandJsonLd(releases), ...shows.map(showJsonLd)]).replace(/</g, "\\u003c"),
        }}
      />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-[120px] pb-[60px] relative overflow-hidden"
      >
        {/* Radial gradient background */}
        <div className="absolute inset-0 hero-radial pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 border border-sol-gold/30 rounded-full text-[0.75rem] font-semibold tracking-[2px] uppercase text-sol-gold mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-rasta-green animate-pulse-dot" />
            Latin Reggae Rock &bull; Los Angeles
          </div>

          {/* Title */}
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-[-2px] mb-2">
            KING <span className="text-sol-gold">SOL</span>
            <br />
            <span className="font-accent italic text-[#888] text-[0.6em]">&amp;</span> THE VIBES
          </h1>

          <p className="text-[clamp(1rem,2vw,1.3rem)] text-[#888] font-light tracking-[4px] uppercase mb-12">
            Love &bull; Truth &bull; Freedom
          </p>

          {/* Spotify Player */}
          <div className="w-full max-w-[660px] mb-10 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/artist/4iYxgancLoKojQUwbWkIGT?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="#music" className="btn btn-primary">
              &#9654;&ensp;Explore Music
            </a>
            <a href="#shows" className="btn btn-outline">
              Upcoming Shows
            </a>
          </div>
        </div>
      </section>

      <div className="rasta-divider" />

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section id="about" className="pt-12 pb-[100px] lg:pt-[100px] px-6 bg-gradient-to-b from-sol-dark to-[#080808]">
        <div className="max-w-[1200px] mx-auto">
          {/* Band photo: full width so the landscape shot reads well; desktop trims only the top of the wall */}
          <FadeIn>
            <div className="relative rounded-2xl overflow-hidden aspect-[3/2] lg:aspect-[16/9] bg-sol-card">
              <Image
                src={bandPhoto}
                alt="King Sol & The Vibes, five band members sitting on a vintage couch in front of a weathered white wooden wall"
                fill
                sizes="(min-width: 1248px) 1200px, calc(100vw - 48px)"
                placeholder="blur"
                className="object-cover object-bottom"
              />
              <div className="absolute inset-0 border border-sol-gold/15 rounded-2xl pointer-events-none" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-20 mt-12 lg:mt-16">
            <FadeIn>
              <div className="flex flex-col gap-6">
                <div className="section-label">About the Band</div>
                <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight">{about.heading}</h2>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="flex flex-col gap-6">
                <RichText
                  data={about.bio}
                  className="flex flex-col gap-6 text-[#888] text-[1.05rem] leading-relaxed [&_strong]:text-[#f0f0f0] [&_strong]:font-semibold"
                />
                <div className="grid grid-cols-3 gap-6 mt-4 pt-8 border-t border-sol-border">
                  {about.stats?.map((stat) => (
                    <div key={stat.id}>
                      <div className="font-display text-[1.6rem] text-sol-gold">{stat.value}</div>
                      <div className="text-[0.75rem] text-[#888] tracking-[1px] uppercase mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="rasta-divider" />

      {/* ═══════════════════ MUSIC ═══════════════════ */}
      <section id="music" className="py-[100px] px-6 bg-sol-darker">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn><div className="section-label">Discography</div></FadeIn>
          <FadeIn><h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight mb-5">Our Music</h2></FadeIn>
          <FadeIn><p className="text-[1.05rem] text-[#888] max-w-[600px] leading-relaxed">{music.intro}</p></FadeIn>

          <ReleaseGrid releases={releases} />
        </div>
      </section>

      <div className="rasta-divider" />

      {/* ═══════════════════ SHOWS ═══════════════════ */}
      <section id="shows" className="py-[100px] px-6 bg-sol-dark">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn><div className="section-label">Live</div></FadeIn>
          <FadeIn><h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight mb-5">Upcoming Shows</h2></FadeIn>
          <FadeIn><p className="text-[1.05rem] text-[#888] max-w-[600px] leading-relaxed">{showsSection.intro}</p></FadeIn>

          <div className="flex flex-col gap-0.5 mt-12">
            {shows.map((show) => (
              <FadeIn key={show.id}>
                <div className="show-item">
                  <div className="text-center">
                    <div className="text-[0.7rem] font-semibold tracking-[2px] uppercase text-sol-gold">
                      {showDate(show.start, { month: "short" })}
                    </div>
                    <div className="font-display text-[2rem] leading-none">{showDate(show.start, { day: "2-digit" })}</div>
                    <div className="text-[0.7rem] font-semibold tracking-[2px] uppercase text-[#888] mt-1">
                      {showDate(show.start, { weekday: "short" })}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-[1.05rem]">{show.venue}</div>
                    <div className="text-[0.85rem] text-[#888] mt-0.5">
                      {show.address.street}, {show.address.city}, {show.address.region} {show.address.postalCode}
                    </div>
                    <div className="text-[0.85rem] font-semibold text-sol-gold mt-1">
                      {[showDate(show.start, { hour: "numeric", minute: "2-digit" }), show.free && "Free show"]
                        .filter(Boolean)
                        .join(" \u2022 ")}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="rasta-divider" />

      {/* ═══════════════════ INSTAGRAM ═══════════════════ */}
      <section id="instagram" className="py-[100px] px-6 bg-sol-darker">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="section-label" style={{ justifyContent: "center" }}>@king_vibes_official</div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight">Follow the Vibes</h2>
            <a
              href="https://www.instagram.com/king_vibes_official/"
              target="_blank"
              rel="noopener"
              className="mt-5 px-7 py-3 rounded-full text-[0.85rem] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(131,58,180,0.3)]"
              style={{ background: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)" }}
            >
              Follow on Instagram
            </a>
          </div>

          <InstagramFeed />
        </div>
      </section>

      <div className="rasta-divider" />

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <ContactSection {...contact} />
    </ToastProvider>
  );
}
