"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="relative">
      {sent && (
        <div className="fixed top-20 right-4 z-50 bg-sol-gold text-black px-6 py-3 rounded-lg font-semibold shadow-lg animate-fade-in-up">
          ✓ Message sent!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2 font-display uppercase tracking-wider">Name</label>
          <input
            type="text"
            required
            className="w-full bg-sol-card border border-sol-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sol-gold transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2 font-display uppercase tracking-wider">Email</label>
          <input
            type="email"
            required
            className="w-full bg-sol-card border border-sol-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sol-gold transition-colors"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2 font-display uppercase tracking-wider">Subject</label>
          <select
            required
            className="w-full bg-sol-card border border-sol-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sol-gold transition-colors"
          >
            <option value="">Select a subject</option>
            <option value="booking">Booking</option>
            <option value="press">Press</option>
            <option value="general">General</option>
            <option value="merch">Merch</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2 font-display uppercase tracking-wider">Message</label>
          <textarea
            required
            rows={5}
            className="w-full bg-sol-card border border-sol-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sol-gold transition-colors resize-none"
            placeholder="What's on your mind?"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-sol-gold to-sol-amber text-black font-display font-bold uppercase tracking-wider py-3 rounded-lg hover:from-sol-amber hover:to-sol-orange transition-all duration-300 hover:scale-[1.02]"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
