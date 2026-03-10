import FadeIn from "../components/FadeIn";

const members = [
  {
    name: "Sol",
    role: "Vocals / Guitar",
    bio: "The heart and soul of the band. Born in East LA, raised on reggae, cumbia, and classic rock. Sol's voice carries the weight of generations and the fire of something new.",
    colors: ["#CD2026", "#FFD700"],
  },
  {
    name: "Memo",
    role: "Bass / Backing Vocals",
    bio: "The groove architect. Memo lays down bass lines that bridge reggae's rhythmic heartbeat with cumbia, funk, and soul. Originally from Guadalajara.",
    colors: ["#FFD700", "#009B3A"],
  },
  {
    name: "Jade",
    role: "Keys / Synths",
    bio: "Jade brings the cosmic textures — warm analog synths, lush pads, and keys that shimmer like California sunsets. Classically trained, soul-driven.",
    colors: ["#009B3A", "#CD2026"],
  },
  {
    name: "Ricky",
    role: "Drums / Percussion",
    bio: "The engine behind the Vibes. Ricky's percussion blends traditional güira and congas with modern kit work, creating rhythms that make every body move.",
    colors: ["#CD2026", "#009B3A"],
  },
  {
    name: "Elena",
    role: "Lead Guitar / Accordion",
    bio: "Elena shreds with soul. Her guitar work weaves between ska-punk leads and traditional accordion melodies, bridging two worlds seamlessly.",
    colors: ["#FFD700", "#CD2026"],
  },
];

const galleryGradients = [
  "from-rasta-red/20 via-rasta-gold/10 to-sol-dark",
  "from-rasta-gold/20 via-rasta-green/10 to-sol-dark",
  "from-rasta-green/20 via-rasta-gold/10 to-sol-dark",
  "from-rasta-gold/20 via-rasta-red/10 to-sol-dark",
  "from-rasta-red/20 via-rasta-green/10 to-sol-dark",
  "from-rasta-green/20 via-rasta-red/10 to-sol-dark",
];

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Band Bio */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <FadeIn>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white uppercase tracking-tight mb-2">
            About
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-rasta-red via-rasta-gold to-rasta-green rounded-full mb-8" />
        </FadeIn>
        <FadeIn>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              <span className="gradient-text font-semibold">King Sol & the Vibes</span> are an LA-based <span className="text-rasta-gold font-medium">reggae/ska/cumbia</span> collective forging a sound that defies easy categorization. Born from the sun-soaked streets of East Los Angeles, the band weaves traditional reggae rhythms with cumbia, ska, and psychedelic rock to create high-energy Latin rock that moves bodies and opens hearts.
            </p>
            <p>
              Catch them every week at their <span className="text-rasta-green font-medium">Reggae Sunday residency at Rock &amp; Roll Pizza Bar</span>, or at their legendary On the Boardwalk sessions, Malibu Music Second Saturdays, and packed-out shows at The Regent Theater. From backyard parties to festival stages, King Sol &amp; the Vibes bring the same raw, communal energy everywhere they go.
            </p>
            <p>
              With releases like <em className="text-rasta-gold">&quot;Plea To Humanity&quot;</em> and <em className="text-rasta-gold">&quot;Cumbia de los Pajaritos,&quot;</em> they prove that reggae isn&apos;t just a genre — it&apos;s a feeling. Connected to the <span className="text-rasta-red">Spaghetti Cumbia</span> and <span className="text-rasta-green">Brass Roots Riot</span> crews, they&apos;re part of a vibrant LA Latin alternative scene that&apos;s impossible to ignore.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* The Band */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <FadeIn>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-2 text-center">
            The Band
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-rasta-red via-rasta-gold to-rasta-green rounded-full mb-12 mx-auto" />
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, i) => (
            <FadeIn key={member.name} delay={i * 100}>
              <div className="rasta-border-card rounded-2xl bg-sol-card p-6 card-lift group">
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${member.colors[0]}, ${member.colors[1]})` }}
                >
                  <span className="font-display text-2xl font-bold text-white/90">{member.name[0]}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white text-center mb-1">{member.name}</h3>
                <p className="text-rasta-gold text-sm text-center font-display uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm text-center leading-relaxed">{member.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <FadeIn>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-2 text-center">
            Gallery
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-rasta-red via-rasta-gold to-rasta-green rounded-full mb-12 mx-auto" />
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryGradients.map((gradient, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className={`aspect-square rounded-xl bg-gradient-to-br ${gradient} border border-sol-border hover:border-rasta-gold/30 card-lift flex items-center justify-center`}>
                <svg className="w-12 h-12 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
