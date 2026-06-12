import { CalendarCheck, Clock, CheckCircle2, XCircle } from "lucide-react";

function Card({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[var(--surface)] p-5 transition hover:border-[var(--brand)]/40">
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground/60">{label}</span>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${accent}1a`, color: accent }}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 text-3xl font-bold">{value}</div>
    </div>
  );
}

export default function DashboardStats({ bookings }) {
  const by = (s) => bookings.filter((b) => b.status === s).length;
  const gold = "#d4a82c";
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card
        icon={CalendarCheck}
        label="Tổng booking"
        value={bookings.length}
        accent={gold}
      />
      <Card
        icon={Clock}
        label="Chờ xác nhận"
        value={by("pending")}
        accent="#f59e0b"
      />
      <Card
        icon={CheckCircle2}
        label="Hoàn thành"
        value={by("completed")}
        accent="#22c55e"
      />
      <Card
        icon={XCircle}
        label="Đã hủy"
        value={by("cancelled")}
        accent="#ef4444"
      />
    </div>
  );
}
