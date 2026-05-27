import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#home", label: "Trang chủ" },
  { href: "#booking", label: "Đặt xe" },
  { href: "#pricing", label: "Bảng giá" },
  { href: "#contact", label: "Liên hệ" },
];
export function VietTaxiNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-yellow-400/20"
          : "bg-gradient-to-b from-black/70 to-black/30 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10 py-3">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <span className="grid h-10 w-10 place-items-center rounded-lg text-black font-extrabold text-sm shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-transform group-hover:scale-105">
            <img
              className="rounded-md"
              src="/image/png/logo-c.png"
              alt="logo"
            />
          </span>
          <span className="font-bold text-xl tracking-wide text-white">
            TAXI <span className="text-yellow-400">Ninh Thuận</span>
          </span>
        </a>
        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-10 text-base font-medium text-gray-300">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative py-2 transition-colors hover:text-yellow-400 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Right side: phone + CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:0827524105"
            className="flex items-center gap-2 text-yellow-400 font-semibold text-sm hover:text-yellow-300 transition-colors"
          >
            <Phone className="h-4 w-4 fill-yellow-400" />
            0827 524 105
          </a>
          <Button
            asChild
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg px-5 shadow-[0_0_20px_rgba(250,204,21,0.35)] hover:shadow-[0_0_28px_rgba(250,204,21,0.55)] transition-all"
          >
            <a href="#booking">Đặt xe ngay</a>
          </Button>
        </div>
        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid h-10 w-10 place-items-center rounded-lg bg-white/5 border border-white/10 text-white"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mx-4 mb-3 rounded-xl bg-black/90 backdrop-blur-md border border-yellow-400/20 p-4">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-gray-200 hover:bg-yellow-400/10 hover:text-yellow-400 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2 mt-2 border-t border-white/10">
              <a
                href="tel:0827524105"
                className="flex items-center gap-2 px-3 py-2 text-yellow-400 font-semibold"
              >
                <Phone className="h-4 w-4 fill-yellow-400" />
                0827 524 105
              </a>
            </li>
            <li>
              <Button
                asChild
                className="w-full mt-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg"
              >
                <a href="#booking" onClick={() => setOpen(false)}>
                  Đặt xe ngay
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
export default VietTaxiNavbar;
