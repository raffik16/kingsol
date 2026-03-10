import FadeIn from "../components/FadeIn";

const products = [
  {
    id: "tee-001",
    name: "King Sol Tour Tee",
    price: "35.00",
    description: "Black tee with gold sun logo",
    gradient: "from-rasta-gold/20 via-rasta-red/10 to-sol-dark",
    icon: "👕",
  },
  {
    id: "hoodie-001",
    name: "Vibes Hoodie",
    price: "65.00",
    description: "Oversized, embroidered logo",
    gradient: "from-rasta-green/20 via-rasta-gold/10 to-sol-dark",
    icon: "🧥",
  },
  {
    id: "vinyl-001",
    name: "Plea To Humanity Vinyl",
    price: "28.00",
    description: "Limited pressing",
    gradient: "from-rasta-red/20 via-rasta-gold/10 to-sol-dark",
    icon: "💿",
  },
  {
    id: "poster-001",
    name: "Reggae Sunday Poster",
    price: "20.00",
    description: "18x24 concert poster",
    gradient: "from-rasta-gold/20 via-rasta-green/10 to-sol-dark",
    icon: "🖼️",
  },
  {
    id: "stickers-001",
    name: "Vibes Sticker Pack",
    price: "8.00",
    description: "Set of 5 die-cut stickers",
    gradient: "from-rasta-green/20 via-rasta-red/10 to-sol-dark",
    icon: "✨",
  },
  {
    id: "pin-001",
    name: "Gold Chain Enamel Pin",
    price: "12.00",
    description: "Hard enamel, gold plated",
    gradient: "from-rasta-gold/30 via-rasta-green/10 to-sol-dark",
    icon: "📌",
  },
];

export default function Shop() {
  return (
    <div className="pt-24 pb-16">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <FadeIn>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white uppercase tracking-tight mb-2">
            Shop
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-rasta-red via-rasta-gold to-rasta-green rounded-full mb-4" />
          <p className="text-gray-400 text-lg mb-12">Rep the Vibes. Limited runs, made with love. 🇯🇲🔥</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={i * 80}>
              <div className="bg-sol-card border border-sol-border rounded-2xl overflow-hidden card-lift gold-glow group">
                {/* Product image placeholder */}
                <div className={`aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
                  <span className="text-6xl opacity-30 group-hover:opacity-60 transition-opacity group-hover:scale-110 transform duration-300">
                    {product.icon}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-rasta-gold font-display text-xl font-bold">${product.price}</span>
                    <button
                      className="snipcart-add-item btn-rasta bg-rasta-gold text-black font-display text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full hover:bg-rasta-green hover:text-white transition-all duration-200 min-h-[44px]"
                      data-item-id={product.id}
                      data-item-name={product.name}
                      data-item-price={product.price}
                      data-item-url="/shop"
                      data-item-description={product.description}
                      data-item-image="/placeholder.png"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
