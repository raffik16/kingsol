import FadeIn from "../components/FadeIn";

const members = [
  {
    name: "Sol",
    role: "Vocals / Guitar",
    bio: "The heart and soul of the band. Born in East LA, raised on reggae, cumbia, and classic rock. Sol's voice carries the weight of generations and the fire of something new.",
    colors: ["#E4312B", "#F5A623"],
  },
  {
    name: "Memo",
    role: "Bass / Backing Vocals",
    bio: "The groove architect. Memo lays down bass lines that bridge reggae's rhythmic heartbeat with cumbia, funk, and soul. Originally from Guadalajara.",
    colors: ["#F5A623", "#2D9B42"],
  },
  {
    name: "Jade",
    role: "Keys / Synths",
    bio: "Jade brings the cosmic textures — warm analog synths, lush pads, and keys that shimmer like California sunsets. Classically trained, soul-driven.",
    colors: ["#2D9B42", "#E4312B"],
  },
  {
    name: "Ricky",
    role: "Drums / Percussion",
    bio: "The engine behind the Vibes. Ricky's percussion blends traditional güira and congas with modern kit work, creating rhythms that make every body move.",
    colors: ["#E4312B", "#2D9B42"],
  },
  {
    name: "Elena",
    role: "Lead Guitar / Accordion",
    bio: "Elena shreds with soul. Her guitar work weaves between ska-punk leads and traditional accordion melodies, bridging two worlds seamlessly.",
    colors: ["#F5A623", "#E4312B"],
  },
];

export default function About() {
  return (
    <div className="pt-24 pb-16">
      <section className="max-w-[1200px] mx-auto px-6 py-[100px]">
        <FadeIn>
          <div className="section-label">About the Band</div>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-8">
            Born From the Streets of LA
          </h1>
        </FadeIn>
        <FadeIn>
          <div className="space-y-6 text-[#888] text-[1.05rem] leading-relaxed max-w-3xl">
            <p>
              <strong className="text-[#f0f0f0] font-semibold">King Sol & The Vibes</strong> is a high-energy Latin Reggae Rock band straight out of Los Angeles. Fronted by <strong className="text-[#f0f0f0] font-semibold">King Sol</strong>, whose musical roots trace back to Guadalajara, Jalisco, the band delivers an electrifying fusion of reggae, rock, and Latin rhythms that gets every crowd on their feet.
            </p>
            <p>
              Growing up in a family of musicians, King Sol was performing with professional bands by his early teens. After moving to America, he connected with co-founder <strong className="text-[#f0f0f0] font-semibold">Willy Will</strong> and together they built something powerful &mdash; music that carries messages of rebellion, social justice, love, and freedom.
            </p>
            <p>
              Their dedicated fanbase, known as the <strong className="text-[#f0f0f0] font-semibold">&ldquo;Vibeaholics,&rdquo;</strong> continues to grow across all ages and nationalities, united by the universal language of rhythm and conscious lyrics.
            </p>
          </div>
        </FadeIn>
      </section>

      <div className="rasta-divider" />

      <section className="max-w-[1200px] mx-auto px-6 py-[100px]">
        <FadeIn>
          <div className="section-label">The Band</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight mb-12">Meet the Vibes</h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, i) => (
            <FadeIn key={member.name} delay={i * 100}>
              <div className="bg-sol-card border border-sol-border rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sol-gold/30 group">
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${member.colors[0]}, ${member.colors[1]})` }}
                >
                  <span className="font-display text-2xl font-bold text-white/90">{member.name[0]}</span>
                </div>
                <h3 className="font-display text-xl text-center mb-1">{member.name}</h3>
                <p className="text-sol-gold text-sm text-center font-display uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-[#888] text-sm text-center leading-relaxed">{member.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
