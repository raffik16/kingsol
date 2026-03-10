import FadeIn from "./components/FadeIn";
import ShopSection from "./components/ShopSection";
import ContactSection from "./components/ContactSection";
import { ToastProvider } from "./components/Toast";

const releases = [
  { title: "Three Worlds", year: "2023", type: "album", emoji: "\u{1F3B6}" },
  { title: "Mass Shooting", year: "2023", type: "single", emoji: "\u{1F525}" },
  { title: "Broken History", year: "2021", type: "single", emoji: "\u{1F4A5}" },
  { title: "Corona Panic", year: "2021", type: "single", emoji: "\u{1F30D}" },
  { title: "Ooh Baby", year: "2021", type: "single", emoji: "\u2764\uFE0F" },
  { title: "We Will Rise EP", year: "2020", type: "ep", emoji: "\u270A" },
  { title: "Political Brother", year: "2020", type: "single", emoji: "\u{1F3F4}" },
  { title: "Reggae Blues", year: "2018", type: "single", emoji: "\u{1F3B5}" },
];

const shows = [
  { month: "MAR", day: "15", venue: "The Pike Restaurant & Bar", location: "Long Beach, CA \u2022 4-7 PM" },
  { month: "MAR", day: "22", venue: "Reggae Sunday @ Rock & Roll Pizza", location: "Los Angeles, CA \u2022 3-9 PM" },
  { month: "APR", day: "05", venue: "DiPiazza's", location: "Long Beach, CA \u2022 8 PM" },
  { month: "APR", day: "19", venue: "Malibu Music Second Saturdays", location: "Malibu, CA \u2022 6 PM" },
];

const igItems = [
  { emoji: "\u{1F3B6}", gradient: "from-[#E4312B33] to-[#F8D12F22]" },
  { emoji: "\u{1F3A4}", gradient: "from-[#2D9B4233] to-[#F5A62322]" },
  { emoji: "\u{1F525}", gradient: "from-[#F5A62333] to-[#E4312B22]" },
  { emoji: "\u{1F3B5}", gradient: "from-[#F8D12F33] to-[#2D9B4222]" },
  { emoji: "\u270A", gradient: "from-[#2D9B4233] to-[#E4312B22]" },
  { emoji: "\u{1F451}", gradient: "from-[#E4312B33] to-[#2D9B4222]" },
  { emoji: "\u2600\uFE0F", gradient: "from-[#F5A62333] to-[#F8D12F22]" },
  { emoji: "\u{1F30A}", gradient: "from-[#F8D12F33] to-[#E4312B22]" },
];

export default function Home() {
  return (
    <ToastProvider>
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {releases.map((r) => (
              <FadeIn key={r.title}>
                <div className="bg-sol-card border border-sol-border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-sol-gold/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                  <div className="aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center text-5xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-rasta-red/15 via-rasta-yellow/10 to-rasta-green/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{r.emoji}</span>
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-[0.95rem] mb-1">{r.title}</div>
                    <div className="text-[0.8rem] text-[#888]">{r.year}</div>
                    <span className={`release-type ${r.type}`}>{r.type}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
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
              <FadeIn key={show.day + show.venue}>
                <div className="show-item">
                  <div className="text-center">
                    <div className="text-[0.7rem] font-semibold tracking-[2px] uppercase text-sol-gold">{show.month}</div>
                    <div className="font-display text-[2rem] leading-none">{show.day}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[1.05rem]">{show.venue}</div>
                    <div className="text-[0.85rem] text-[#888] mt-0.5">{show.location}</div>
                  </div>
                  <div className="show-btn-cell">
                    <a
                      href="#"
                      className="px-6 py-2.5 border border-white/15 rounded-full text-[0.75rem] font-semibold tracking-[1px] uppercase text-[#f0f0f0] hover:border-sol-gold hover:text-sol-gold transition-all whitespace-nowrap"
                    >
                      RSVP
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="rasta-divider" />

      {/* ═══════════════════ INSTAGRAM ═══════════════════ */}
      <section id="instagram" className="py-[100px] px-6 bg-sol-darker text-center">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center mb-12">
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

          {/* IG Grid */}
          <div className="ig-grid">
            {igItems.map((item, i) => (
              <a
                key={i}
                className="ig-item"
                href="https://www.instagram.com/king_vibes_official/"
                target="_blank"
                rel="noopener"
              >
                <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-[2.5rem]`}>
                  {item.emoji}
                </div>
                <div className="ig-overlay">
                  <span className="text-[0.85rem] font-semibold">View Post</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 max-w-[800px] mx-auto p-8 bg-sol-card border border-sol-border rounded-2xl text-center">
            <p className="text-[#888] mb-5 text-[1rem]">
              &#x1F4F8; For a live Instagram feed, add the <strong className="text-[#f0f0f0]">Elfsight</strong> or{" "}
              <strong className="text-[#f0f0f0]">Curator.io</strong> widget to your production site &mdash; both offer free tiers and plug
              directly into Next.js.
            </p>
            <a
              href="https://www.instagram.com/king_vibes_official/"
              target="_blank"
              rel="noopener"
              className="btn btn-outline inline-flex"
            >
              Visit Our Instagram
            </a>
          </div>
        </div>
      </section>

      <div className="rasta-divider" />

      {/* ═══════════════════ SHOP ═══════════════════ */}
      <ShopSection />

      <div className="rasta-divider" />

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <ContactSection />
    </ToastProvider>
  );
}
