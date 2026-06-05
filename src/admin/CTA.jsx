import { useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import BookingFormModal from "./BookingFormModal";
export default function CTA() {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <button className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition hover:bg-black/90">
          <Phone className="h-4 w-4" /> Gọi 1900 XXXX
        </button>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition hover:bg-black/90"
        >
          Đặt xe online <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <BookingFormModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
