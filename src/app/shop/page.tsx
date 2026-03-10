import FadeIn from "../components/FadeIn";

const products = [
  {
    id: "tee-001",
    name: "King Sol Tour Tee",
    price: "35.00",
    description: "Black tee with gold sun logo",
    gradient: "from-sol-gold/20 via-yellow-900/10 to-sol-dark",
    icon: "👕",
  },
  {
    id: "hoodie-001",
    name: "Vibes Hoodie",
    price: "65.00",
    description: "Oversized, embroidered logo",
    gradient: "from-sol-amber/20 via-amber-900/10 to-sol-dark",
    icon: "🧥",
  },
  {
    id: "vinyl-001",
    name: "Cumbia de los Pajaritos Vinyl",
    price: "28.00",
    description: "Limited pressing",
    gradient: "from-sol-orange/20 via-red-900/10 to-sol-dark",
    icon: "💿",
  },
  {
    id: "poster-001",
    name: "Sol Rising Poster",
    price: "20.00",
    description: "18x24 concert poster",
    gradient: "from-yellow-600/20 via-sol-gold/10 to-sol-dark",
    icon: "🖼️",
  },
  {
    id: "stickers-001",
    name: "Vibes Sticker Pack",
    price: "8.00",
    description: "Set of 5 die-cut stickers",
    gradient: "from-amber-500/20 via-sol-amber/10 to-sol-dark",
    icon: "✨",
  },
  {
    id: "pin-001",
    name: "Gold Chain Enamel Pin",
    price: "12.00",
    description: "Hard enamel, gold plated",
    gradient: "from-sol-gold/30 via-yellow-800/10 to-sol-dark",
    icon: "📌",
  },
];

export default function Shop() {
  return (
    <div className="pt-24 pb-16">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <FadeIn>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white uppercase tracking-tight mb-4">
            Shop
          </h1>
          <p className="text-gray-400 text-lg mb-12">Rep the Vibes. Limited runs, made with love.</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <FadeIn key={product.id}>
              <div className="bg-sol-card border border-sol-border rounded-2xl overflow-hidden hover:border-sol-gold/30 transition-all duration-300 group hover:scale-[1.02]">
                {/* Product image placeholder */}
                <div className={`aspect-square bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
                  <span className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity group-hover:scale-110 transform duration-300">
                    {product.icon}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sol-gold font-display text-xl font-bold">${product.price}</span>
                    <button
                      className="snipcart-add-item bg-gradient-to-r from-sol-gold to-sol-amber text-black font-display text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full hover:from-sol-amber hover:to-sol-orange transition-all duration-200"
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
