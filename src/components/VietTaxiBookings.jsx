import { Phone, ArrowRight } from "lucide-react";

export default function VietTaxiBookings({ setOpenBooking }) {
  return (
    <section id="booking" className="bg-[var(--surface)] py-16">
      <div className="mx-auto max-w-7xl px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--brand)] to-[oklch(0.78_0.16_75)] p-10 md:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="text-[var(--brand-foreground)]">
              <h2 className="text-xl md:text-3xl font-bold">
                ĐẶT XE NGAY HÔM NAY
              </h2>
              <p className="mt-4 max-w-xl text-[var(--brand-foreground)]/80">
                Gọi hotline hoặc đặt xe trực tuyến để được phục vụ nhanh chóng.
                Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="tel:0827524105">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition hover:bg-black/90">
                    <Phone className="h-4 w-4" /> Gọi 0827 524 105
                  </button>
                </a>
                <button
                  onClick={() => setOpenBooking(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition hover:text-[var(--brand)]"
                >
                  Đặt xe online <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <a href="tel:0827524105">
              <div className="rounded-2xl border border-[var(--brand-foreground)]/20 bg-[var(--brand-foreground)]/10 p-8 text-center backdrop-blur-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-foreground)]/20">
                  <Phone className="h-7 w-7 text-[var(--brand-foreground)]" />
                </div>
                <p className="mt-4 text-sm text-[var(--brand-foreground)]/70">
                  Hotline 24/7
                </p>
                <p className="mt-1 text-2xl md:text-3xl font-bold text-[var(--brand-foreground)]">
                  0827 524 105
                </p>
                <p className="mt-2 text-xs text-[var(--brand-foreground)]/70">
                  Tư Vấn Miễn Phí
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
