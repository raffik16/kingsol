import FadeIn from "./components/FadeIn";
import HeroBackground from "./components/HeroBackground";
import Link from "next/link";

const tracks = [
  { num: 1, name: "Cumbia de los Pajaritos", duration: "4:28" },
  { num: 2, name: "Darkside", duration: "4:28" },
  { num: 3, name: "Colder Than Me", duration: "3:06" },
  { num: 4, name: "Personal Ecstasy", duration: "5:32", explicit: true },
  { num: 5, name: "Noble Devil", duration: "1:45" },
];

const shows = [
  { date: "APR 12", venue: "The Echo", city: "Los Angeles, CA", link: "#" },
  { date: "APR 26", venue: "Constellation Room", city: "Santa Ana, CA", link: "#" },
  { date: "MAY 10", venue: "Casbah", city: "San Diego, CA", link: "#" },
  { date: "MAY 24", venue: "Rickshaw Stop", city: "San Francisco, CA", link: "#" },
];

export default function Home() {
  return (
    <>
      {/* Hero with Spotify Player + LiquidEther background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* LiquidEther WebGL fluid sim background */}
        <HeroBackground />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-sol-dark to-transparent z-[1]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24">
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-4 leading-none">
            KING SOL
            <span className="block text-3xl sm:text-4xl md:text-5xl text-gray-400 mt-2">&amp; THE VIBES</span>
          </h1>
          <p className="gradient-text font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-wider mb-8">
            Cumbia. Soul. Fire.
          </p>

          {/* Spotify Player in Hero */}
          <div className="max-w-2xl mx-auto mb-8">
            <iframe
              src="https://open.spotify.com/embed/artist/4iYxgancLoKojQUwbWkIGT?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://open.spotify.com/artist/4iYxgancLoKojQUwbWkIGT"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sol-gold to-sol-amber text-black font-display font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:from-sol-amber hover:to-sol-orange transition-all duration-300 animate-pulse-glow"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              Open in Spotify
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 border-2 border-sol-gold/50 text-sol-gold font-display font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:bg-sol-gold/10 transition-all duration-300"
            >
              Shop Merch
            </Link>
          </div>
        </div>
      </section>

      {/* Top Tracks */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <FadeIn>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-8">
            Top Tracks
          </h2>
        </FadeIn>
        <div className="space-y-1">
          {tracks.map((track) => (
            <FadeIn key={track.num}>
              <a
                href="https://open.spotify.com/artist/4iYxgancLoKojQUwbWkIGT"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-sol-card transition-all duration-200 group"
              >
                <span className="text-gray-600 font-mono text-sm w-6 text-right">{track.num}</span>
                <div className="flex-1">
                  <span className="text-white group-hover:text-sol-gold transition-colors font-medium">
                    {track.name}
                  </span>
                  {track.explicit && (
                    <span className="ml-2 text-[10px] bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded uppercase">E</span>
                  )}
                </div>
                <span className="text-gray-500 text-sm font-mono">{track.duration}</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Latest Release */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <FadeIn>
          <div className="bg-sol-card border border-sol-border rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row gap-8 items-center">
            {/* Placeholder album art */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl bg-gradient-to-br from-sol-gold/30 via-sol-orange/20 to-sol-dark flex-shrink-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-sol-gold/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            </div>
            <div>
              <p className="text-sol-gold font-display text-sm uppercase tracking-widest mb-2">Latest Release</p>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">Cumbia de los Pajaritos</h3>
              <p className="text-gray-400 mb-6">The latest single blending traditional cumbia rhythms with modern indie production. 4:28 of pure fire.</p>
              <div className="flex gap-3">
                <a
                  href="https://open.spotify.com/artist/4iYxgancLoKojQUwbWkIGT"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 bg-[#1DB954] text-white font-display text-sm font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-[#1ed760] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                  Spotify
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FC3C44] to-[#FA2D48] text-white font-display text-sm font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  Apple Music
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Upcoming Shows */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <FadeIn>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-8">
            Upcoming Shows
          </h2>
        </FadeIn>
        <div className="space-y-3">
          {shows.map((show) => (
            <FadeIn key={show.date + show.venue}>
              <div className="bg-sol-card border border-sol-border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-sol-gold/30 transition-colors">
                <div className="font-display text-2xl font-bold text-sol-gold w-24 flex-shrink-0">{show.date}</div>
                <div className="flex-1">
                  <p className="text-white font-semibold">{show.venue}</p>
                  <p className="text-gray-500 text-sm">{show.city}</p>
                </div>
                <a
                  href={show.link}
                  className="font-display text-sm uppercase tracking-wider border border-sol-gold/50 text-sol-gold px-5 py-2 rounded-full hover:bg-sol-gold hover:text-black transition-all duration-200"
                >
                  Tickets
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              @king_vibes_official
            </h2>
            <a
              href="https://www.instagram.com/king_vibes_official/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-sol-gold font-display text-sm uppercase tracking-wider hover:text-sol-amber transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Follow on IG
            </a>
          </div>
        </FadeIn>
        {/* Instagram Embed Grid - 6 recent posts via oEmbed iframes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "https://www.instagram.com/king_vibes_official/embed",
          ].map((url, i) => (
            <FadeIn key={i}>
              <div className="col-span-2 md:col-span-3">
                <iframe
                  src={url}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="yes"
                  allowTransparency={true}
                  className="rounded-xl border border-sol-border bg-sol-card"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href="https://www.instagram.com/king_vibes_official/"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-display font-bold uppercase tracking-wider px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            See More on Instagram
          </a>
        </div>
      </section>

      {/* Social Links */}
      <section className="border-t border-sol-border">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-tight mb-8">Follow the Vibes</h2>
            <div className="flex justify-center gap-6">
              <a href="https://open.spotify.com/artist/4iYxgancLoKojQUwbWkIGT" target="_blank" rel="noopener" className="text-gray-400 hover:text-sol-gold transition-colors hover:scale-110 transform duration-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              </a>
              <a href="https://www.instagram.com/king_vibes_official/" target="_blank" rel="noopener" className="text-gray-400 hover:text-sol-gold transition-colors hover:scale-110 transform duration-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.instagram.com/king_vibes_official/" target="_blank" rel="noopener" className="text-gray-400 hover:text-sol-gold transition-colors hover:scale-110 transform duration-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.instagram.com/king_vibes_official/" target="_blank" rel="noopener" className="text-gray-400 hover:text-sol-gold transition-colors hover:scale-110 transform duration-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://www.instagram.com/king_vibes_official/" target="_blank" rel="noopener" className="text-gray-400 hover:text-sol-gold transition-colors hover:scale-110 transform duration-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.104 1.594-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.335-2.22-1.163-.4-.786-.196-1.81.556-2.348.376-.27.81-.41 1.263-.49.39-.07.783-.12 1.174-.18.39-.058.7-.225.87-.596.06-.13.09-.276.09-.42V8.89c0-.317-.076-.397-.39-.345l-4.66.874c-.026.005-.05.013-.076.02-.243.065-.324.163-.338.41-.003.06 0 .12 0 .18v7.22c0 .404-.048.803-.215 1.178-.27.605-.74.997-1.378 1.192-.336.104-.683.16-1.037.182-.986.06-1.864-.283-2.312-1.143-.426-.82-.18-1.878.63-2.432.37-.254.793-.39 1.23-.464.418-.07.837-.128 1.254-.19.36-.053.657-.2.834-.54.08-.153.12-.322.12-.49V7.254c0-.253.024-.503.1-.746.127-.41.42-.642.827-.727.192-.04.387-.07.58-.1l5.1-.94c.3-.055.603-.107.907-.145.258-.032.39.06.425.32.01.078.014.158.014.236v5.073z"/></svg>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
