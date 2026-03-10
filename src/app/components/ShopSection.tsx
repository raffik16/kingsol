"use client";

import { useState, useCallback } from "react";
import FadeIn from "./FadeIn";
import { useToast } from "./Toast";

type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  emoji: string;
  badge: string;
};

const products: Product[] = [
  { id: 1, name: "Vibeaholics Tee", desc: "Premium cotton, rasta-colored logo", price: 30, emoji: "\u{1F455}", badge: "Best Seller" },
  { id: 2, name: "Three Worlds Vinyl", desc: "Limited press, 180g vinyl with insert", price: 35, emoji: "\u{1F4BF}", badge: "New" },
  { id: 3, name: "Crown Dad Hat", desc: "Embroidered gold crown on black", price: 28, emoji: "\u{1F9E2}", badge: "" },
  { id: 4, name: "Rasta Patch Hoodie", desc: "Heavyweight fleece, back print", price: 55, emoji: "\u{1F9E5}", badge: "" },
  { id: 5, name: "Reggae Blues Poster", desc: '18"x24" signed art print', price: 15, emoji: "\u{1F5BC}\uFE0F", badge: "" },
  { id: 6, name: "Sticker Pack (6)", desc: "Die-cut band logo & album art", price: 8, emoji: "\u{1F31F}", badge: "" },
];

type CartItem = Product & { qty: number };

export default function ShopSection() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { showToast } = useToast();

  const addToCart = useCallback((id: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  }, [showToast]);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + delta } : item
      );
      return updated.filter((item) => item.qty > 0);
    });
  }, []);

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* Shop Section */}
      <section id="shop" className="py-[100px] px-6 bg-sol-dark">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn><div className="section-label">Merch</div></FadeIn>
          <FadeIn><h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight mb-5">Official Shop</h2></FadeIn>
          <FadeIn><p className="text-[1.05rem] text-[#888] max-w-[600px] leading-relaxed">Rep the Vibes. All proceeds support independent music.</p></FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {products.map((p) => (
              <FadeIn key={p.id}>
                <div className="bg-sol-card border border-sol-border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-sol-gold/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                  <div className="aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center text-5xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-rasta-red/15 via-rasta-yellow/10 to-rasta-green/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {p.badge && <div className="product-badge">{p.badge}</div>}
                    <span>{p.emoji}</span>
                  </div>
                  <div className="p-5">
                    <div className="font-semibold text-[0.95rem] mb-1">{p.name}</div>
                    <div className="text-[0.85rem] text-[#888] mb-3">{p.desc}</div>
                    <div className="flex items-center justify-between">
                      <div className="font-display text-[1.2rem] text-sol-gold">${p.price}</div>
                      <button
                        onClick={() => addToCart(p.id)}
                        className="px-5 py-2.5 rounded-full text-[0.75rem] font-semibold tracking-[1px] uppercase bg-sol-gold text-sol-dark hover:bg-sol-gold-dark hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Button (shows count) */}
      {totalItems > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-[1999] bg-sol-gold text-sol-dark w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg hover:bg-sol-gold-dark transition-all"
          aria-label="Open cart"
        >
          &#x1F6D2;
          <span className="absolute -top-1 -right-1 bg-rasta-red text-white text-[0.65rem] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}

      {/* Cart Overlay */}
      <div
        className={`cart-overlay ${cartOpen ? "open" : ""}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <div className="flex items-center justify-between p-6 border-b border-sol-border">
          <h3 className="font-display text-[1.1rem]">&#x1F6D2; Your Cart</h3>
          <button
            onClick={() => setCartOpen(false)}
            className="text-[#888] text-2xl p-1 hover:text-[#f0f0f0] transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#888] gap-3">
              <div className="text-5xl opacity-30">&#x1F6D2;</div>
              <p>Your cart is empty</p>
              <p className="text-[0.8rem]">Add some merch to get started!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 border-b border-sol-border">
                <div className="w-16 h-16 rounded-lg bg-sol-card flex items-center justify-center text-3xl flex-shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[0.9rem]">{item.name}</div>
                  <div className="text-[0.8rem] text-[#888]">One size</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-sol-border rounded-md overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-[#f0f0f0] hover:bg-sol-card transition-colors"
                      >
                        &minus;
                      </button>
                      <span className="w-9 text-center text-[0.85rem] font-semibold">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#f0f0f0] hover:bg-sol-card transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold text-sol-gold">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[0.75rem] text-rasta-red mt-1 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-sol-border">
            <div className="flex justify-between text-[0.9rem] mb-2">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-[1.1rem] mb-5 pt-3 border-t border-sol-border">
              <span>Total</span>
              <span className="text-sol-gold">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={() => showToast("Demo checkout! In production, this redirects to Snipcart / Shopify.")}
              className="w-full py-4 rounded-full text-[0.85rem] font-bold tracking-[1px] uppercase bg-sol-gold text-sol-dark hover:bg-sol-gold-dark transition-all"
            >
              Proceed to Checkout
            </button>
            <div className="text-center text-[0.75rem] text-[#888] mt-3">
              Demo cart &mdash; no real payment processed
            </div>
          </div>
        )}
      </div>
    </>
  );
}
