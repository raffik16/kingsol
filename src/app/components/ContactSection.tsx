"use client";

import { type FormEvent } from "react";
import FadeIn from "./FadeIn";
import { useToast } from "./Toast";

export default function ContactSection() {
  const { showToast } = useToast();

  const handleContact = (e: FormEvent) => {
    e.preventDefault();
    showToast("Message sent! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-[100px] px-6 bg-sol-darker">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn><div className="section-label">Get in Touch</div></FadeIn>
        <FadeIn><h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-tight mb-5">Contact</h2></FadeIn>
        <FadeIn><p className="text-[1.05rem] text-[#888] max-w-[600px] leading-relaxed">For bookings, press inquiries, or just to say what&apos;s up.</p></FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] mt-12">
          {/* Contact Info */}
          <FadeIn>
            <div className="flex flex-col gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-sol-gold/10 flex items-center justify-center text-[1.2rem] flex-shrink-0">
                  &#x1F4E7;
                </div>
                <div>
                  <div className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888] mb-1">Email</div>
                  <div className="font-medium">
                    <a href="mailto:kingsolvibes@gmail.com" className="text-sol-gold hover:opacity-80 transition-opacity">
                      kingsolvibes@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-sol-gold/10 flex items-center justify-center text-[1.2rem] flex-shrink-0">
                  &#x1F4CD;
                </div>
                <div>
                  <div className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888] mb-1">Based In</div>
                  <div className="font-medium">Los Angeles, California</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-sol-gold/10 flex items-center justify-center text-[1.2rem] flex-shrink-0">
                  &#x1F3A4;
                </div>
                <div>
                  <div className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888] mb-1">Booking</div>
                  <div className="font-medium">Available for shows, festivals, and private events</div>
                </div>
              </div>

              <div className="mt-2">
                <div className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888] mb-3">Follow Us</div>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/king_vibes_official/" target="_blank" rel="noopener" className="social-link" title="Instagram">&#x1F4F7;</a>
                  <a href="https://www.facebook.com/kingsolmusic/" target="_blank" rel="noopener" className="social-link" title="Facebook">&#x1F310;</a>
                  <a href="https://open.spotify.com/artist/4iYxgancLoKojQUwbWkIGT" target="_blank" rel="noopener" className="social-link" title="Spotify">&#x1F3B5;</a>
                  <a href="https://soundcloud.com/kingsolvibes" target="_blank" rel="noopener" className="social-link" title="SoundCloud">&#x2601;&#xFE0F;</a>
                  <a href="https://music.apple.com/us/artist/king-sol-the-vibes/1136472387" target="_blank" rel="noopener" className="social-link" title="Apple Music">&#x1F34E;</a>
                  <a href="https://www.tiktok.com/@kingsolvibes" target="_blank" rel="noopener" className="social-link" title="TikTok">&#x1F3AC;</a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn>
            <form onSubmit={handleContact} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888]">Name</label>
                  <input type="text" placeholder="Your name" required className="form-input" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888]">Email</label>
                  <input type="email" placeholder="your@email.com" required className="form-input" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888]">Subject</label>
                <select className="form-input">
                  <option>Booking Inquiry</option>
                  <option>Press / Media</option>
                  <option>Collaboration</option>
                  <option>Merch Question</option>
                  <option>General</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888]">Message</label>
                <textarea placeholder="Tell us what's on your mind..." className="form-input resize-y min-h-[120px]" />
              </div>
              <button type="submit" className="btn btn-primary self-start">
                Send Message
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
