import { Shield, Clock, Award, Users, Car, Headphones } from "lucide-react";
const features = [
  {
    icon: Shield,
    title: "An toàn tuyệt đối",
    desc: "Xe được bảo dưỡng định kỳ, trang bị đầy đủ thiết bị an toàn và bảo hiểm toàn diện.",
  },
  {
    icon: Clock,
    title: "Đúng giờ 100%",
    desc: "Cam kết đúng giờ trong mọi chuyến đi. Chúng tôi theo dõi giao thông để luôn có mặt kịp thời.",
  },
  {
    icon: Award,
    title: "Tài xế chuyên nghiệp",
    desc: "Đội ngũ tài xế được đào tạo bài bản, lịch sự, am hiểu địa bàn và có nhiều năm kinh nghiệm.",
  },
  {
    icon: Users,
    title: "Phục vụ tận tâm",
    desc: "Đặt sự hài lòng của khách hàng lên hàng đầu với dịch vụ chăm sóc khách hàng chu đáo.",
  },
  {
    icon: Car,
    title: "Xe đời mới cao cấp",
    desc: "Đội xe được cập nhật thường xuyên với các dòng xe đời mới, tiện nghi và sang trọng.",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    desc: "Tổng đài hỗ trợ hoạt động 24/7, sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn.",
  },
];
const stats = [
  { value: "98%", label: "Khách hài lòng" },
  { value: "500K+", label: "Chuyến xe" },
  { value: "15+", label: "Tỉnh thành" },
];
export default function WhyUsService() {
  return (
    <section className="bg-[var(--surface)] text-white py-20 ">
      <div className="mx-auto max-w-7xl px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] text-[var(--brand)]">
              TẠI SAO CHỌN CHÚNG TÔI
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-foreground">
              Hơn 10 năm phục vụ
              <br />
              khách hàng Việt Nam
            </h2>
            <p className="mt-6 max-w-xl text-white/60 leading-relaxed">
              VietTaxi Premium tự hào là đơn vị tiên phong trong lĩnh vực taxi
              cao cấp tại Việt Nam. Với đội xe hiện đại và tài xế chuyên nghiệp,
              chúng tôi cam kết mang đến trải nghiệm di chuyển tuyệt vời nhất
              cho mọi khách hàng.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/5 bg-[var(--surface)] px-4 py-6 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[var(--brand)]">
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm text-white/60">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right */}
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-[var(--brand-2)]/30 bg-[var(--surface)] p-6 transition hover:border-[var(--brand)]/40"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand)]/15">
                    <Icon className="h-5 w-5 text-[var(--brand)]" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
