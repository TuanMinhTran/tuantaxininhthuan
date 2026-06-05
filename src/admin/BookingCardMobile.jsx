import { Phone, MapPin, Calendar, Car } from "lucide-react";
import StatusBadge from "./StatusBadge";
import BookingActions from "./BookingActions";
const fmt = (iso) => new Date(iso).toLocaleString("vi-VN");
export default function BookingCardMobile({ booking: b }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[var(--surface)] p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            {b.name}
            {!b.seen && (
              <span className="rounded-full bg-[var(--brand)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--brand-foreground)]">
                MỚI
              </span>
            )}
          </div>
          <a
            href={`tel:${b.phone}`}
            className="mt-1 inline-flex items-center gap-1.5 text-sm text-foreground/70"
          >
            <Phone className="h-3.5 w-3.5" /> {b.phone}
          </a>
        </div>
        <StatusBadge status={b.status} />
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-[var(--brand)]" />
          <span>
            {b.pickup} → {b.dropoff || "—"}
          </span>
        </div>
        <div className="flex gap-2">
          <Calendar className="h-4 w-4 shrink-0 text-[var(--brand)]" />
          <span>
            {b.date || "—"} {b.time && `· ${b.time}`}
          </span>
        </div>
        <div className="flex gap-2">
          <Car className="h-4 w-4 shrink-0 text-[var(--brand)]" />
          <span>
            {b.vehicle} · {b.tripType}
          </span>
        </div>
        {b.note && (
          <div className="rounded-lg bg-[var(--surface-2)] p-2 text-xs text-foreground/70">
            {b.note}
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
        <span className="text-xs text-foreground/50">{fmt(b.createdAt)}</span>
        <BookingActions booking={b} />
      </div>
    </div>
  );
}
