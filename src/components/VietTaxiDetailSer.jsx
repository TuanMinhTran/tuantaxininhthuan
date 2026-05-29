import { Plane, MapPin, Heart, Car } from "lucide-react";
const detailServices = [
  {
    icon: Plane,
    title: "Đưa Đón Sân Bay",
    desc: "Dịch vụ đưa đón sân bay chuyên nghiệp, đúng giờ với giá cố định. Chúng tôi theo dõi chuyến bay để đón bạn kịp thời.",
    active: true,
  },
  {
    icon: MapPin,
    title: "Thuê Xe Đường Dài",
    desc: "Thuê xe đi tỉnh, du lịch với tài xế kinh nghiệm. Xe đời mới, máy lạnh, wifi miễn phí trên mọi chuyến đi.",
  },
  {
    icon: Heart,
    title: "Xe Cưới Cao Cấp",
    desc: "Dịch vụ xe cưới sang trọng với đội xe được trang trí đẹp mắt. Tài xế lịch sự, đúng giờ cho ngày trọng đại của bạn.",
  },
  {
    icon: Car,
    title: "Xe 4 & 7 Chỗ",
    desc: "Đa dạng loại xe từ 4 chỗ đến 7 chỗ phù hợp với mọi nhu cầu. Từ công tác đến gia đình, chúng tôi đều đáp ứng.",
  },
];
export default function VietTaxiDetailSer() {
  return (
    <section className="bg-[var(--surface-2)] text-white py-20">
      <div className="mx-auto max-w-7xl px-10">
        <div className="text-center">
          <p className="text-sm md:text-lg font-semibold tracking-[0.2em] text-[var(--brand)]">
            DỊCH VỤ CỦA CHÚNG TÔI
          </p>
          <h2 className="mt-4 text-lg md:text-3xl font-bold text-foreground">
            Giải Pháp Di Chuyển An toàn - Toàn Diện
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-foreground/60">
            Từ đưa đón sân bay đến xe cưới, chúng tôi cung cấp đa dạng dịch vụ
            vận chuyển cao cấp đáp ứng mọi nhu cầu của bạn.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {detailServices.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`rounded-2xl border border-[var(--brand-2)]/30 bg-[var(--surface)] p-6 transition hover:border-[var(--brand)] hover:text-[var(--brand)]`}
              >
                <div className="flex flex-row gap-3 items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand)]/15">
                    <Icon className="h-6 w-6 text-[var(--brand)]" />
                  </div>
                  <h3 className={`text-base font-bold`}>{s.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
