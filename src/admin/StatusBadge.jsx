import { STATUS_LABELS } from "@/lib/bookings";

const STYLES = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap items-center rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
