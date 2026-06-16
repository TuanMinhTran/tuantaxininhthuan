import StatusBadge from "./StatusBadge";
import BookingActions from "./BookingActions";

const fmt = (iso) => new Date(iso).toLocaleString("vi-VN");

export default function BookingTable({
  bookings,
  highlightId,
  onSelectBooking,
  refreshBookings,
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[var(--surface)]">
      <table className="w-full text-sm">
        <thead className="border-b border-white/5 text-left text-xs text-yellow-400 uppercase text-foreground/50 ">
          <tr>
            <th className="px-4 py-3">Khách hàng</th>
            <th className="px-4 py-3">Hành trình</th>
            <th className="px-4 py-3">Thời gian</th>
            <th className="px-4 py-3">Xe / Chuyến</th>
            <th className="px-4 py-3">Ghi chú</th>
            <th className="px-4 py-3">Tạo lúc</th>
            <th className="px-4 py-3">Trạng thái</th>
            <th className="px-4 py-3 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr
              key={b.id}
              id={`desktop-booking-${b.id}`}
              onClick={(e) => {
                if (
                  e.target.closest("button") ||
                  e.target.closest("[role='combobox']") ||
                  e.target.closest("select")
                ) {
                  return;
                }

                onSelectBooking(b);
              }}
              className={`
                border-b border-white/5
                transition-all duration-700
                ${
                  highlightId === b.id
                    ? "flash-booking bg-yellow-400/10"
                    : "hover:bg-white/[0.02]"
                }
              `}
            >
              <td className="px-4 py-4 w-[130px]">
                <div className="flex items-center gap-2 font-medium">
                  {b.name}
                  {!b.seen && (
                    <span className="rounded-full bg-[var(--brand)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--brand-foreground)]">
                      MỚI
                    </span>
                  )}
                </div>
                <div className="text-xs text-foreground/60">{b.phone}</div>
              </td>
              <td className="px-4 py-4 max-w-xs w-[110px]">
                <div className="text-foreground/90">{b.pickup}</div>
                <div className="text-xs text-foreground/50">
                  → {b.dropoff || "—"}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {b.date || "—"}
                <div className="text-xs text-foreground/60">
                  {b.time || "—"}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {b.vehicle}
                <div className="text-xs text-foreground/60">{b.tripType}</div>
              </td>
              <td className="px-4 py-4 max-w-[200px] text-xs text-foreground/70">
                {b.note || "—"}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-xs text-foreground/60">
                {fmt(b.createdAt)}
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={b.status} />
              </td>
              <td
                className="px-4 py-4 text-right min-w-[250px] lg:min-w-[300px]"
                onClick={(e) => e.stopPropagation()}
              >
                <BookingActions
                  booking={b}
                  onSelectBooking={onSelectBooking}
                  refreshBookings={refreshBookings}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        @keyframes flashRow {
          0% {
            background: rgba(250, 204, 21, 0.35);
          }
          100% {
            background: rgba(250, 204, 21, 0.08);
          }
        }

        .flash-booking {
          animation: flashRow 1.2s ease;
        }
      `}</style>
    </div>
  );
}
