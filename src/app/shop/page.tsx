import ShopSection from "../components/ShopSection";
import { ToastProvider } from "../components/Toast";

export default function Shop() {
  return (
    <div className="pt-24">
      <ToastProvider>
        <ShopSection />
      </ToastProvider>
    </div>
  );
}
