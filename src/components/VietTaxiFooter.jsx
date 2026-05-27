import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Trang chủ", href: "#" },
  { label: "Đặt xe", href: "#" },
  { label: "Bảng giá", href: "#" },
  { label: "Liên hệ", href: "#" },
];
const serviceLinks = [
  { label: "Đưa đón sân bay" },
  { label: "Thuê xe đường dài" },
  { label: "Xe cưới" },
  { label: "Xe 4 chỗ" },
  { label: "Xe 7 chỗ" },
];

export default function VietTaxiFooter() {
  return (
    <footer className="bg-[var(--surface-2)] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-10 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] rounded-lg bg-[var(--brand)] font-bold text-black">
                <img
                  className="rounded-md"
                  src="/image/png/logo-c.png"
                  alt="logo"
                />
              </div>
              <span className="text-xl font-bold">
                TAXI <span className="text-[var(--brand)]">Ninh Thuận</span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Dịch vụ taxi cao cấp hàng đầu Việt Nam. Chúng tôi cam kết mang đến
              trải nghiệm di chuyển an toàn, thoải mái và đẳng cấp.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Liên kết nhanh</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[var(--brand)]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Dịch vụ</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <span>
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Liên hệ</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
                <a href="#" className="hover:text-[var(--brand)]">
                  Hotline: 0827 524 105
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
                <a href="#" className="hover:text-[var(--brand)]">
                  tranminhtuan1002@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
                <span>Tổ Dân Phố 20, Phường Đông Hải, Tỉnh Khánh Hòa</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© 2026 TAXI Ninh Thuận. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[var(--brand)]">
              Điều khoản sử dụng
            </a>
            <a href="#" className="hover:text-[var(--brand)]">
              Chính sách bảo mật
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
