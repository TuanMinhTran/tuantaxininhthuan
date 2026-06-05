import { Check, CheckCheck, Trash2 } from "lucide-react";
import { updateBooking, deleteBooking } from "@/lib/bookings";
export default function BookingActions({ booking }) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {booking.status === "pending" && (
        <button
          onClick={() => updateBooking(booking.id, { status: "confirmed" })}
          className="inline-flex items-center gap-1 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/20"
        >
          <Check className="h-3.5 w-3.5" /> Xác nhận
        </button>
      )}
      {booking.status !== "completed" && booking.status !== "cancelled" && (
        <button
          onClick={() => updateBooking(booking.id, { status: "completed" })}
          className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20"
        >
          <CheckCheck className="h-3.5 w-3.5" /> Hoàn thành
        </button>
      )}
      <button
        onClick={() => {
          if (confirm("Xóa booking này?")) deleteBooking(booking.id);
        }}
        className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
