import ContactSection from "../components/ContactSection";
import { ToastProvider } from "../components/Toast";

export default function Contact() {
  return (
    <div className="pt-24">
      <ToastProvider>
        <ContactSection />
      </ToastProvider>
    </div>
  );
}
