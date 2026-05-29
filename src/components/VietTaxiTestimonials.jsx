import { Quote, Star } from "lucide-react";
const testimonials = [
  {
    text: "Dịch vụ tuyệt vời! Tài xế rất chuyên nghiệp và đúng giờ. Xe sạch sẽ, sang trọng. Tôi rất hài lòng và sẽ tiếp tục sử dụng.",
    name: "Nguyễn Văn An",
    role: "Doanh nhân",
    initial: "A",
  },
  {
    text: "Đã sử dụng dịch vụ đưa đón sân bay nhiều lần, luôn đúng giờ và phục vụ chu đáo. Giá cả hợp lý, không phát sinh chi phí.",
    name: "Trần Thị Bình",
    role: "Giám đốc Marketing",
    initial: "B",
  },
  {
    text: "Thuê xe đi Đà Lạt cuối tuần vừa rồi, trải nghiệm rất tốt. Tài xế am hiểu đường, xe đời mới chạy êm. Recommend!",
    name: "Lê Hoàng Nam",
    role: "Kỹ sư IT",
    initial: "N",
  },
  {
    text: "Dịch vụ xe cưới của VietTaxi rất chuyên nghiệp. Xe được trang trí đẹp, tài xế lịch sự. Ngày cưới của tôi thật hoàn hảo!",
    name: "Phạm Thu Hằng",
    role: "Cô dâu",
    initial: "H",
  },
];
function Card({ t }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[var(--surface)] p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-[var(--brand)] text-[var(--brand)]"
            />
          ))}
        </div>
        <Quote className="h-6 w-6 text-[var(--brand)]/70" />
      </div>
      <p className="text-sm text-white/70 leading-relaxed flex-1">"{t.text}"</p>
      <div className="flex items-center gap-3 pt-2">
        <div className="h-10 w-10 rounded-full bg-[var(--brand)]/15 text-[var(--brand)] flex items-center justify-center font-semibold">
          {t.initial}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{t.name}</div>
          <div className="text-xs text-white/50">{t.role}</div>
        </div>
      </div>
    </div>
  );
}
export default function VietTaxiTestimonials() {
  return (
    <section className="bg-[var(--surface-2)] text-white py-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="text-center mb-14">
          <div className="text-sm md:text-lg font-bold tracking-[0.2em] text-[var(--brand)] mb-4">
            ĐÁNH GIÁ KHÁCH HÀNG
          </div>
          <h2 className="text-lg md:text-3xl font-bold text-white mb-4">
            Khách Hàng Nói Gì Về Chúng Tôi ?
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Hơn 5000 đánh giá 5 sao từ khách hàng là minh chứng cho chất lượng
            dịch vụ của VietTaxi Premium.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
