"use client";

import { useState, type FormEvent } from "react";
import { useToast } from "./Toast";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnpnzldr";

// Reports the result through a toast, so render it inside a ToastProvider.
export default function ContactForm() {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleContact = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      showToast("Message sent! We'll get back to you soon.");
      form.reset();
    } catch {
      showToast("Something went wrong. Please email kingsol420@gmail.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleContact} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888]">Name</label>
          <input type="text" name="name" placeholder="Your name" required className="form-input" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888]">Email</label>
          <input type="email" name="email" placeholder="your@email.com" required className="form-input" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888]">Subject</label>
        <select name="_subject" className="form-input">
          <option>Booking Inquiry</option>
          <option>Press / Media</option>
          <option>Collaboration</option>
          <option>Merch Question</option>
          <option>General</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.75rem] font-semibold tracking-[1.5px] uppercase text-[#888]">Message</label>
        <textarea name="message" required placeholder="Tell us what's on your mind..." className="form-input resize-y min-h-[120px]" />
      </div>
      <button type="submit" disabled={submitting} className="btn btn-primary self-start disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
