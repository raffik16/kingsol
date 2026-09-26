import Link from "next/link";
import FadeIn from "./components/FadeIn";
import ContactSection from "./components/ContactSection";
import InstagramFeed from "./components/InstagramFeed";
import ReleaseGrid, { type Release } from "./components/ReleaseGrid";
import { socials } from "./components/SocialLinks";
import { ToastProvider } from "./components/Toast";

const releases: Release[] = [
  { title: "\u00A1Que Se Vaya ICE!", year: "2026", type: "single", spotifyId: "0tXM2mSzWHF6OPe7LgD83R" },
  { title: "Good Thing", year: "2025", type: "single", spotifyId: "0gDhp3vackt0nXE7mr1B7x" },
  { title: "Three Worlds", year: "2023", type: "album", spotifyId: "6OGLYQmslVZqEll8tJ2CUe" },
  { title: "Mass Shooting", year: "2023", type: "single", spotifyId: "7lP5kjR95aolNdOqQAFmdn" },
  { title: "Broken History", year: "2021", type: "single", spotifyId: "0YSzWUhJMvBs3cREbUIcDw" },
  { title: "Corona Panic", year: "2021", type: "single", spotifyId: "3h3akaefagUFT17JtdmoNG" },
  { title: "Ooh Baby", year: "2021", type: "single", spotifyId: "22Wzgk4Gwsxry6EPby4IMO" },
  { title: "We Will Rise", year: "2020", type: "ep", spotifyId: "3uAKjmkuCzXDClELGzFosN" },
  { title: "Political Brother", year: "2020", type: "single", spotifyId: "1kgUOgPEA7LlbIQDcrGDwj" },
  { title: "Reggae Blues", year: "2018", type: "single", spotifyId: "4FQJsefH4y315GhJ6zekcv" },
];

const releaseTypes = { album: "AlbumRelease", single: "SingleRelease", ep: "EPRelease" } as const;

// schema.org data so search engines can tie this page to the band and its releases.
const bandJsonLd = {
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
};

// Start times carry their UTC offset (-07:00 is Pacific Daylight Time, -08:00 Standard).
const shows = [
  {
    start: "2026-10-23T20:30:00-07:00",
    venue: "The Pike Restaurant & Bar",
    address: { street: "1836 E 4th St", city: "Long Beach", region: "CA", postalCode: "90802" },
    free: true,
  },
];

// Format in Los Angeles time so the build machine's timezone can't shift the date or time.
const showDate = (iso: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", ...options }).format(new Date(iso));

// schema.org events make shows eligible for Google's event listings in search.
const showsJsonLd = shows.map((show) => ({
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  name: `King Sol & The Vibes at ${show.venue}`,
  startDate: show.start,
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
  ...(show.free
    ? {
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD", availability: "https://schema.org/InStock" },
      }
    : {}),
}));

export default function Home() {
  return (
    <ToastProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([bandJsonLd, ...showsJsonLd]).replace(/</g, "\\u003c"),
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
      <section id="about" className="py-[100px] px-6 bg-gradient-to-b from-sol-dark to-[#080808]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-[60px]">
            {/* Image placeholder */}
            <FadeIn>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-sol-card">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(228,49,43,0.2), rgba(248,209,47,0.15), rgba(45,155,66,0.2))",
                  }}
                >
                  <div className="text-center">
                    <div className="text-[5rem] mb-4">&#x1F451;&#x2600;&#xFE0F;</div>
                    <div className="font-display text-[1.4rem] text-sol-gold">KING SOL</div>
                    <div className="font-display text-[1rem] text-[#888]">& THE VIBES</div>
                  </div>
                </div>
                <div className="absolute inset-0 border border-sol-gold/15 rounded-2xl pointer-events-none" />
              </div>
            </FadeIn>

            {/* Content */}
            <FadeIn>
              <div className="flex flex-col gap-6">
                <div className="section-label">About the Band</div>
                <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight">Born From the Streets of LA</h2>
                <p className="text-[#888] text-[1.05rem] leading-relaxed">
                  <strong className="text-[#f0f0f0] font-semibold">King Sol & The Vibes</strong> is a high-energy Latin Reggae Rock band
                  straight out of Los Angeles. Fronted by <strong className="text-[#f0f0f0] font-semibold">King Sol</strong>, whose musical
                  roots trace back to Guadalajara, Jalisco, the band delivers an electrifying fusion of reggae, rock, and Latin rhythms
                  that gets every crowd on their feet.
                </p>
                <p className="text-[#888] text-[1.05rem] leading-relaxed">
                  Growing up in a family of musicians, King Sol was performing with professional bands by his early teens. After moving to
                  America, he connected with co-founder <strong className="text-[#f0f0f0] font-semibold">Willy Will</strong> and together they
                  built something powerful &mdash; music that carries messages of rebellion, social justice, love, and freedom.
                </p>
                <p className="text-[#888] text-[1.05rem] leading-relaxed">
                  Their dedicated fanbase, known as the <strong className="text-[#f0f0f0] font-semibold">&ldquo;Vibeaholics,&rdquo;</strong>{" "}
                  continues to grow across all ages and nationalities, united by the universal language of rhythm and conscious lyrics.
                </p>
                <div className="grid grid-cols-3 gap-6 mt-4 pt-8 border-t border-sol-border">
                  <div>
                    <div className="font-display text-[1.6rem] text-sol-gold">2018</div>
                    <div className="text-[0.75rem] text-[#888] tracking-[1px] uppercase mt-1">Since</div>
                  </div>
                  <div>
                    <div className="font-display text-[1.6rem] text-sol-gold">LA</div>
                    <div className="text-[0.75rem] text-[#888] tracking-[1px] uppercase mt-1">Based</div>
                  </div>
                  <div>
                    <div className="font-display text-[1.6rem] text-sol-gold">10+</div>
                    <div className="text-[0.75rem] text-[#888] tracking-[1px] uppercase mt-1">Releases</div>
                  </div>
                </div>
                <Link href="/about" className="btn btn-outline self-start">
                  Meet the Band
                </Link>
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
          <FadeIn><p className="text-[1.05rem] text-[#888] max-w-[600px] leading-relaxed">Stream our latest tracks and albums on every major platform.</p></FadeIn>

          <ReleaseGrid releases={releases} />
        </div>
      </section>

      <div className="rasta-divider" />

      {/* ═══════════════════ SHOWS ═══════════════════ */}
      <section id="shows" className="py-[100px] px-6 bg-sol-dark">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn><div className="section-label">Live</div></FadeIn>
          <FadeIn><h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight mb-5">Upcoming Shows</h2></FadeIn>
          <FadeIn><p className="text-[1.05rem] text-[#888] max-w-[600px] leading-relaxed">Catch us live at a venue near you. Come feel the vibes in person.</p></FadeIn>

          <div className="flex flex-col gap-0.5 mt-12">
            {shows.map((show) => (
              <FadeIn key={show.start + show.venue}>
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
      <ContactSection />
    </ToastProvider>
  );
}
