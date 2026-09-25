import type { Metadata } from "next";
import { baseOpenGraph } from "../site";
import ContactSection from "../components/ContactSection";
import { ToastProvider } from "../components/Toast";

const description =
  "Contact King Sol & The Vibes for bookings, press inquiries, or just to say what's up.";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { ...baseOpenGraph, title: "Contact & Booking", description, url: "/contact" },
};

export default function Contact() {
  return (
    <div className="pt-24">
      <ToastProvider>
        <ContactSection />
      </ToastProvider>
    </div>
  );
}
