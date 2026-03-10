import FadeIn from "../components/FadeIn";

const members = [
  {
    name: "Sol",
    role: "Vocals / Guitar",
    bio: "The heart and soul of the band. Born in East LA, raised on cumbia and classic rock. Sol's voice carries the weight of generations and the fire of something new.",
    gradient: "from-sol-gold to-sol-amber",
  },
  {
    name: "Memo",
    role: "Bass / Backing Vocals",
    bio: "The groove architect. Memo lays down bass lines that bridge cumbia's rhythmic heartbeat with modern funk and soul. Originally from Guadalajara.",
    gradient: "from-sol-orange to-red-600",
  },
  {
    name: "Jade",
    role: "Keys / Synths",
    bio: "Jade brings the cosmic textures — warm analog synths, lush pads, and keys that shimmer like California sunsets. Classically trained, soul-driven.",
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    name: "Ricky",
    role: "Drums / Percussion",
    bio: "The engine behind the Vibes. Ricky's percussion blends traditional güira and congas with modern kit work, creating rhythms that make every body move.",
    gradient: "from-sol-amber to-sol-orange",
  },
  {
    name: "Elena",
    role: "Lead Guitar / Accordion",
    bio: "Elena shreds with soul. Her guitar work weaves between psychedelic rock leads and traditional accordion melodies, bridging two worlds seamlessly.",
    gradient: "from-yellow-500 to-sol-gold",
  },
];

const galleryGradients = [
  "from-sol-gold/20 to-sol-dark",
  "from-sol-orange/20 to-sol-dark",
  "from-amber-600/20 to-sol-dark",
  "from-sol-amber/20 via-sol-orange/10 to-sol-dark",
  "from-yellow-600/20 to-sol-dark",
  "from-red-900/20 to-sol-dark",
];

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Band Bio */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <FadeIn>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white uppercase tracking-tight mb-8">
            About
          </h1>
        </FadeIn>
        <FadeIn>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              <span className="text-sol-gold font-semibold">King Sol & the Vibes</span> are an LA-based collective forging a sound that defies easy categorization. Born from the sun-soaked streets of East Los Angeles, the band weaves traditional cumbia rhythms with modern indie rock, soul, and psychedelic textures to create something entirely their own.
            </p>
            <p>
              What started as late-night jam sessions in a Boyle Heights garage has evolved into one of LA&apos;s most exciting emerging acts. Their music pulses with the energy of backyard parties, the intimacy of candlelit rooms, and the raw power of a band that plays like every show could be their last.
            </p>
            <p>
              With tracks like <em>&quot;Cumbia de los Pajaritos&quot;</em> and <em>&quot;Darkside,&quot;</em> King Sol & the Vibes prove that cumbia isn&apos;t just a genre — it&apos;s a feeling. A rhythm that lives in the blood. Mixed with indie sensibilities and soulful delivery, they&apos;re building a bridge between their roots and the future of Latin alternative music.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* The Band */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <FadeIn>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-12 text-center">
            The Band
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <FadeIn key={member.name}>
              <div className="bg-sol-card border border-sol-border rounded-2xl p-6 hover:border-sol-gold/30 transition-all duration-300 group">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                  <span className="font-display text-2xl font-bold text-white/80">{member.name[0]}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white text-center mb-1">{member.name}</h3>
                <p className="text-sol-gold text-sm text-center font-display uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm text-center leading-relaxed">{member.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <FadeIn>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-12 text-center">
            Gallery
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryGradients.map((gradient, i) => (
            <FadeIn key={i}>
              <div className={`aspect-square rounded-xl bg-gradient-to-br ${gradient} border border-sol-border hover:border-sol-gold/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center`}>
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
