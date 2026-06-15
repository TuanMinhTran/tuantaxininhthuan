import { useEffect, useMemo, useRef, useState } from "react";
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
import { getBookings, STATUS_LABELS } from "../lib/bookings";
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
import { updateBooking } from "@/lib/bookings";

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
        <div className="flex h-10 w-10 items-center justify-center rounded-md font-bold text-[var(--brand-foreground)] border border-[var(--brand)] shadow-[0_0_20px_rgba(250,204,21,0.4)]">
          <img className="rounded-md" src="/image/png/logo-c.png" alt="logo" />
        </div>
        <div>
          <div className="font-bold">TAXI Phan Rang - KH</div>
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
  const [highlightId, setHighlightId] = useState(null);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [allNotifyOpen, setAllNotifyOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const audioRef = useRef(null);
  const LAST_HEARD_KEY = "viettaxi_last_heard_booking";
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const isCancelled = selectedBooking?.status === "cancelled";
  const listRef = useRef(null);

  useEffect(() => {
    const unlockAudio = async () => {
      if (!audioRef.current) return;

      try {
        audioRef.current.muted = true;

        await audioRef.current.play();

        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.muted = false;

        setAudioUnlocked(true);

        console.log("Audio ready");
      } catch (err) {
        console.log("Audio unlock failed:", err);
      }
    };

    unlockAudio();
  }, []);

  useEffect(() => {
    if (!bookings.length || !audioUnlocked) return;

    const latestBookingId = bookings[0]?.id;

    const lastHeard = localStorage.getItem(LAST_HEARD_KEY);

    if (latestBookingId !== lastHeard) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;

        audioRef.current.play().catch((err) => {
          console.log("Audio blocked:", err);
        });
      }

      localStorage.setItem(LAST_HEARD_KEY, latestBookingId);
    }
  }, [bookings, audioUnlocked]);

  useEffect(() => {
    if (!allNotifyOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setAllNotifyOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [allNotifyOpen]);

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

  const scrollToBooking = (booking) => {
    if (!booking?.id) return;
    setQuery("");
    setStatus("all");
    setHighlightId(booking.id);
  };
  useEffect(() => {
    if (!highlightId) return;
    const timeout = window.setTimeout(() => {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const target = document.getElementById(
        `${isMobile ? "mobile-booking" : "desktop-booking"}-${highlightId}`
      );
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => setHighlightId(null), 1400);
    }, 80);
    return () => window.clearTimeout(timeout);
  }, [highlightId]);

  const handleNotificationClick = (bookingId) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, seen: true } : b
    );

    localStorage.setItem("viettaxi_bookings", JSON.stringify(updated));

    setBookings(updated);

    setNotifyOpen(false);
    setAllNotifyOpen(false);

    setHighlightId(bookingId);

    setTimeout(() => {
      const el =
        document.getElementById(`desktop-booking-${bookingId}`) ||
        document.getElementById(`mobile-booking-${bookingId}`);

      if (!el) return;

      const isMobile = window.innerWidth < 1024;

      if (isMobile) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 120;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      } else {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 240;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }

      setTimeout(() => {
        setHighlightId(null);
      }, 2500);
    }, 350);
  };

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
          <header className="sticky top-0 z-60 flex items-center gap-3 border-b border-white/5 bg-background/80 px-4 py-4 backdrop-blur lg:px-8">
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 hover:bg-white/5 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold lg:text-xl">Quản Lý Đặt Xe</h1>
            <div className="ml-auto flex items-center gap-3">
              {/* Notification */}
              <div className="relative">
                <button
                  onClick={() => setNotifyOpen((v) => !v)}
                  className="relative rounded-xl border border-white/10 p-2.5 hover:bg-white/5"
                >
                  <Bell className="h-5 w-5" />

                  {newCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-bold text-black">
                      {newCount}
                    </span>
                  )}
                </button>

                {notifyOpen && (
                  <div
                    className="absolute
                      -left-1
                      -translate-x-1/2
                      mt-3
                      w-[92vw]
                      max-w-[300px]

                      lg:left-auto
                      lg:right-0
                      lg:translate-x-0
                      lg:w-80

                      animate-in
                      fade-in
                      zoom-in-95
                      duration-200

                      rounded-2xl
                      border border-white/10
                      bg-[#111]
                      shadow-2xl
                      overflow-hidden
                      z-50
                    "
                  >
                    <div className="border-b border-white/5 px-4 py-3 font-semibold text-yellow-400">
                      Thông Báo Bookings
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {bookings.length === 0 ? (
                        <div className="p-4 text-sm text-gray-400">
                          Chưa có booking nào
                        </div>
                      ) : (
                        bookings.slice(0, 5).map((b) => (
                          <button
                            key={b.id}
                            onClick={() => handleNotificationClick(b.id)}
                            className="w-full border-b border-white/5 px-4 py-3 text-left hover:bg-white/5 transition"
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{b.name}</div>

                              {!b.seen && (
                                <span className="rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-bold text-black">
                                  MỚI
                                </span>
                              )}
                            </div>

                            <div className="mt-1 text-sm text-gray-400">
                              {b.pickup} → {b.dropoff}
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                    <div className="border-t border-white/5 p-3">
                      <button
                        onClick={() => {
                          setNotifyOpen(false);
                          setAllNotifyOpen(true);
                        }}
                        className="w-full rounded-xl bg-white/5 py-2 text-sm hover:bg-white/10 transition"
                      >
                        Xem tất cả booking
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={() => {
                  localStorage.removeItem("admin_auth");
                  window.location.reload();
                }}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20"
              >
                Đăng xuất
              </button>
            </div>
          </header>
          <div className="space-y-6 p-4 lg:p-8">
            <DashboardStats bookings={bookings} />
            <div
              className="
                sticky
                top-[74px]
                z-20

                mt-6
                mb-6

                rounded-2xl
                border border-white/10
                bg-[#0b0b0b]/50
                backdrop-blur-xl

                p-3

                shadow-[0_10px_40px_rgba(0,0,0,0.35)]
              "
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm theo tên hoặc số điện thoại"
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
                  <BookingTable
                    bookings={filtered}
                    highlightId={highlightId}
                    onSelectBooking={scrollToBooking}
                  />
                </div>
                <div className="space-y-3 lg:hidden" ref={listRef}>
                  {filtered.map((b) => (
                    <BookingCardMobile
                      key={b.id}
                      booking={b}
                      highlightId={highlightId}
                      onSelectBooking={scrollToBooking}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {allNotifyOpen && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
              onClick={() => setAllNotifyOpen(false)}
            >
              <div
                className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                  <h2 className="text-lg font-bold text-yellow-400">
                    Lịch Sử Thông Báo
                  </h2>

                  <button
                    onClick={() => setAllNotifyOpen(false)}
                    className="rounded-lg bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
                  >
                    Đóng
                  </button>
                </div>

                {/* Body */}
                <div className="max-h-[70vh] overflow-y-auto">
                  {bookings.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">
                      Chưa có thông báo nào
                    </div>
                  ) : (
                    bookings.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => handleNotificationClick(b.id)}
                        className="w-full border-b border-white/5 px-5 py-4 text-left hover:bg-white/5 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-white">{b.name}</div>

                          {!b.seen && (
                            <span className="rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-bold text-black">
                              MỚI
                            </span>
                          )}
                        </div>

                        <div className="mt-1 text-sm text-gray-400">
                          {b.pickup} → {b.dropoff}
                        </div>

                        <div className="mt-1 text-xs text-gray-500">
                          {b.phone}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
          {selectedBooking && (
            <div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
              onClick={() => setSelectedBooking(null)}
            >
              <div
                className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-yellow-400">
                    Chi Tiết/Cập nhật Booking
                  </h2>

                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="rounded-lg bg-white/5 px-3 py-1.5 hover:bg-white/10"
                  >
                    Đóng
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-5 text-sm">
                  <EditField
                    label="Khách hàng"
                    value={selectedBooking.name}
                    disabled={isCancelled}
                    onChange={(val) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        name: val,
                      })
                    }
                  />

                  <EditField
                    label="Số điện thoại"
                    value={selectedBooking.phone}
                    disabled={isCancelled}
                    onChange={(val) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        phone: val,
                      })
                    }
                  />

                  <EditField
                    label="Điểm đón"
                    value={selectedBooking.pickup}
                    disabled={isCancelled}
                    onChange={(val) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        pickup: val,
                      })
                    }
                  />

                  <EditField
                    label="Điểm đến"
                    value={selectedBooking.dropoff}
                    disabled={isCancelled}
                    onChange={(val) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        dropoff: val,
                      })
                    }
                  />

                  <EditField
                    label="Ngày đi"
                    value={selectedBooking.date}
                    disabled={isCancelled}
                    onChange={(val) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        date: val,
                      })
                    }
                  />

                  <EditField
                    label="Giờ đi"
                    value={selectedBooking.time}
                    disabled={isCancelled}
                    onChange={(val) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        time: val,
                      })
                    }
                  />
                  <EditField
                    label="Loại xe"
                    value={selectedBooking.vehicle}
                    disabled={isCancelled}
                    onChange={(val) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        dropoff: val,
                      })
                    }
                  />

                  <EditField
                    label="Loại chuyến"
                    value={selectedBooking.tripType}
                    disabled={isCancelled}
                    onChange={(val) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        date: val,
                      })
                    }
                  />

                  <EditField
                    label="Trạng thái"
                    value={selectedBooking.status}
                    disabled={isCancelled}
                    onChange={(val) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        time: val,
                      })
                    }
                  />
                </div>

                <div className="mt-5">
                  <div className="mb-2 text-xs text-gray-400">Ghi chú</div>

                  <textarea
                    value={selectedBooking.note || ""}
                    disabled={isCancelled}
                    onChange={(e) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        note: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Nhập ghi chú..."
                    className="
                      w-full
                      rounded-xl
                      border border-white/10
                      bg-white/5
                      p-4
                      text-sm text-white
                      outline-none
                      resize-none
                      focus:border-yellow-400
                    "
                  />
                </div>
                {selectedBooking.status !== "cancelled" && (
                  <div className="mt-2 flex justify-center">
                    <button
                      onClick={() => {
                        updateBooking(selectedBooking.id, selectedBooking);
                        setSelectedBooking(null);
                      }}
                      className="
                        rounded-xl
                        bg-yellow-400
                        px-8 py-3
                        text-sm font-bold
                        text-black
                        transition-all
                        hover:scale-105
                        hover:opacity-80
                        cursor-pointer
                      "
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <audio ref={audioRef} src="/sounds/notification.mp3" preload="auto" />
        </main>
      </div>
    </div>
  );
}

function EditField({ label, value, onChange, disabled }) {
  return (
    <div>
      <div className="mb-2 text-xs text-gray-400">{label}</div>

      <input
        value={value || ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full
          rounded-xl
          border border-white/10
          px-3 py-2
          text-sm text-white
          outline-none
          focus:border-yellow-400
          ${
            disabled
              ? "bg-gray-800 opacity-50 cursor-not-allowed"
              : "bg-white/5"
          }
        `}
      />
    </div>
  );
}
