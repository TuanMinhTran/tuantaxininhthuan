import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Search,
  Bell,
  Home,
  Menu,
  X,
} from "lucide-react";
import { getBookings, markAllSeen, STATUS_LABELS } from "../lib/bookings";
import DashboardStats from "./DashboardStats";
import BookingTable from "./BookingTable";
import BookingCardMobile from "./BookingCardMobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function NavItem({ icon: Icon, active, children }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium cursor-pointer ${
        active
          ? "bg-[var(--brand)]/10 text-[var(--brand)]"
          : "text-foreground/70 hover:bg-white/5"
      }`}
    >
      <Icon className="h-4 w-4" /> {children}
    </div>
  );
}
function Sidebar({ count }) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/5 bg-[var(--surface)] p-6">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand)] font-bold text-[var(--brand-foreground)]">
          VT
        </div>
        <div>
          <div className="font-bold">VietTaxi</div>
          <div className="text-xs text-foreground/50">Admin Panel</div>
        </div>
      </Link>
      <nav className="mt-10 space-y-1">
        <NavItem icon={LayoutDashboard} active>
          Dashboard
        </NavItem>
        <NavItem icon={CalendarCheck}>
          <span className="flex w-full items-center">
            Bookings
            <span className="ml-auto rounded-full bg-[var(--brand)] px-2 text-xs font-bold text-[var(--brand-foreground)]">
              {count}
            </span>
          </span>
        </NavItem>
        <Link
          to="/"
          className="mt-6 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/60 hover:bg-white/5"
        >
          <Home className="h-4 w-4" /> Về trang chủ
        </Link>
      </nav>
    </aside>
  );
}
export default function AdminDashboard() {
  useEffect(() => {
    document.title = "Admin Dashboard - DVDL";
  }, []);

  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const sync = () => setBookings(getBookings());
    sync();
    window.addEventListener("bookings:updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bookings:updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const newCount = bookings.filter((b) => !b.seen).length;
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (status !== "all" && b.status !== status) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) || b.phone.toLowerCase().includes(q)
      );
    });
  }, [bookings, query, status]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <div className="hidden lg:block sticky top-0 h-screen">
          <Sidebar count={bookings.length} />
        </div>
        {menuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full">
              <Sidebar count={bookings.length} />
            </div>
          </div>
        )}
        <main className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/5 bg-background/80 px-4 py-4 backdrop-blur lg:px-8">
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 hover:bg-white/5 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold lg:text-xl">Quản lý đặt xe</h1>
            <button
              onClick={markAllSeen}
              className="relative ml-auto rounded-xl border border-white/10 p-2.5 hover:bg-white/5"
              title="Đánh dấu đã xem"
            >
              <Bell className="h-5 w-5" />
              {newCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--brand)] px-1 text-[10px] font-bold text-[var(--brand-foreground)]">
                  {newCount}
                </span>
              )}
            </button>
          </header>
          <div className="space-y-6 p-4 lg:p-8">
            <DashboardStats bookings={bookings} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm theo tên hoặc số điện thoại..."
                  className="w-full rounded-xl border border-white/10 bg-[var(--surface)] py-3 pl-10 pr-4 text-sm outline-none focus:border-[var(--brand)]"
                />
              </div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger
                  className="
      w-[220px]
      h-12
      p-[22px]

      rounded-xl
      border border-white/10
      bg-[var(--surface)]

      px-4
      text-sm
      text-white

      transition-all duration-200

      hover:border-[var(--brand)]
      hover:bg-white/5

      focus:border-[var(--brand)]
      focus:ring-0
      focus:ring-offset-0
    "
                >
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  align="start"
                  sideOffset={6}
                  className="
      w-[220px]

      rounded-xl
      border border-white/10
      bg-[#111]
      text-white

      overflow-hidden
    "
                >
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>

                  {Object.entries(STATUS_LABELS).map(([k, v]) => (
                    <SelectItem
                      key={k}
                      value={k}
                      className="
          cursor-pointer
          transition-colors

          hover:bg-[var(--brand)]
          hover:text-black

          focus:bg-[var(--brand)]
          focus:text-black
        "
                    >
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-[var(--surface)] p-16 text-center animate-fade-in">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--brand)]/10">
                  <CalendarCheck className="h-7 w-7 text-[var(--brand)]" />
                </div>
                <h3 className="mt-4 font-semibold">Chưa có booking nào</h3>
                <p className="mt-1 text-sm text-foreground/60">
                  Booking mới từ khách hàng sẽ xuất hiện ở đây.
                </p>
              </div>
            ) : (
              <>
                <div className="hidden lg:block">
                  <BookingTable bookings={filtered} />
                </div>
                <div className="space-y-3 lg:hidden">
                  {filtered.map((b) => (
                    <BookingCardMobile key={b.id} booking={b} />
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
