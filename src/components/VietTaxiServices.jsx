import { Phone, ArrowRight, Shield, Clock, Star } from "lucide-react";
function Stat({ value, label }) {
  return (
    <div className="px-4 text-center">
      <div className="text-3xl font-bold text-[var(--brand)]">{value}</div>
      <div className="mt-1 text-xs text-foreground/60">{label}</div>
    </div>
  );
}
export default function VietTaxiServices() {
  return (
    <main className="min-h-screen bg-[var(--surface)] text-white">
      <section className="mx-auto max-w-7xl px-10 pt-16 pb-20 lg:pt-30">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/30 bg-[var(--surface-2)] px-4 py-2 text-sm text-[var(--brand)]">
              <Star className="h-4 w-4 fill-[var(--brand)]" />
              Du lịch - Taxi - Xe hợp đồng - Đám cưới
            </div>
            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Di chuyển <span className="text-[var(--brand)]">sang</span>
              <br />
              <span className="text-[var(--brand)]">trọng</span> và{" "}
              <span className="text-[var(--brand)]">an toàn</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-white/60 leading-relaxed">
              VietTaxi Premium mang đến trải nghiệm di chuyển đẳng cấp với đội
              xe cao cấp, tài xế chuyên nghiệp và dịch vụ khách hàng tận tâm
              24/7.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-6 py-3.5 font-semibold text-[var(--brand-foreground)] transition hover:brightness-110">
                Đặt xe ngay <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-[var(--brand)] hover:text-black">
                <Phone className="h-4 w-4" /> Gọi 0827 524 105
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
              <div className="inline-flex items-center gap-2">
                <Shield className="h-4 w-4 text-[var(--brand)]" /> Bảo hiểm đầy
                đủ
              </div>
              <div className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--brand)]" /> Hỗ trợ 24/7
              </div>
              <div className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 text-[var(--brand)] fill-[var(--brand)]" />{" "}
                5000+ đánh giá 5 sao
              </div>
            </div>
          </div>
          {/* Right card */}
          <div className="relative">
            <div className="absolute -top-4 right-4 rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-foreground)] shadow-lg">
              Giảm 10% chuyến đầu
            </div>
            <div className="rounded-3xl border border-[var(--brand-2)] bg-[var(--surface)] p-6 shadow-[0_0_80px_oklch(0.82_0.17_85/0.15)]">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--surface-2)] via-[var(--surface)] to-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.82_0.17_85/0.15),transparent_60%)]" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[var(--brand)] text-3xl font-bold text-[var(--brand-foreground)] shadow-[0_0_60px_oklch(0.82_0.17_85/0.5)]">
                    TT
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">TAXI Ninh Thuận</h3>
                  <p className="mt-1 text-white/60">
                    Đẳng cấp trong từng chuyến đi
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[var(--brand-2)] text-white/60">
                <Stat value="10+" label="Năm kinh nghiệm" />
                <Stat value="50K+" label="Khách hàng" />
                <Stat value="200+" label="Xe cao cấp" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
