import { Check, CheckCheck, Trash2, XCircle, Pencil } from "lucide-react";

import {
  updateBooking,
  deleteBooking,
  updateCancelBooking,
} from "@/lib/bookings";

export default function BookingActions({ booking, onEdit }) {
  return (
    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
      {booking.status === "pending" && (
        <button
          onClick={() =>
            updateBooking(booking.id, {
              status: "confirmed",
            })
          }
          className="inline-flex items-center gap-1 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/20"
        >
          <Check className="h-3.5 w-3.5" />
          Xác nhận
        </button>
      )}

      {booking.status !== "completed" && booking.status !== "cancelled" && (
        <button
          onClick={() =>
            updateBooking(booking.id, {
              status: "completed",
            })
          }
          className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20"
        >
          <CheckCheck className="h-3.5 w-3.5" />
          Hoàn thành
        </button>
      )}
      {booking.status !== "cancelled" && (
        <button
          onClick={() => onEdit(booking)}
          className="inline-flex items-center gap-1 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-400 hover:bg-yellow-500/20"
        >
          <Pencil className="h-3.5 w-3.5" />
          Sửa
        </button>
      )}
      {/* NÚT HỦY */}
      {booking.status !== "cancelled" ? (
        <button
          onClick={() => {
            if (confirm("Hủy booking này?")) {
              updateCancelBooking(booking.id);
            }
          }}
          className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
        >
          <XCircle className="h-3.5 w-3.5" />
          Hủy
        </button>
      ) : (
        <button
          onClick={() => {
            if (confirm("Xóa vĩnh viễn booking này?")) {
              deleteBooking(booking.id);
            }
          }}
          className="inline-flex items-center gap-1 rounded-lg border border-red-600/30 bg-red-600/10 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-600/20"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Xóa
        </button>
      )}
    </div>
  );
}
