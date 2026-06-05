import { useState } from "react";
import { X, Send } from "lucide-react";
import { addBooking } from "@/lib/bookings";
const VEHICLES = ["Xe 4 chỗ", "Xe 7 chỗ", "Xe 16 chỗ", "Xe Limousine"];
const TRIPS = ["Một chiều", "Khứ hồi", "Theo giờ", "Đưa đón sân bay"];
const initial = {
  name: "",
  phone: "",
  pickup: "",
  dropoff: "",
  date: "",
  time: "",
  vehicle: VEHICLES[0],
  tripType: TRIPS[0],
  note: "",
};
export default function BookingFormModal({ open, onClose }) {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);
  if (!open) return null;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.pickup.trim()) return;
    addBooking(form);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm(initial);
      onClose();
    }, 1400);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[var(--brand)]/30 bg-[var(--surface)] p-6 md:p-8 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-foreground/60 hover:bg-white/5 hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-2xl font-bold">Đặt xe online</h3>
        <p className="mt-1 text-sm text-foreground/60">
          Điền thông tin, chúng tôi sẽ liên hệ xác nhận trong ít phút.
        </p>
        {sent ? (
          <div className="mt-8 rounded-2xl border border-[var(--brand)]/40 bg-[var(--brand)]/10 p-6 text-center text-[var(--brand)]">
            Đặt xe thành công! Chúng tôi sẽ liên hệ lại ngay.
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Họ tên *" value={form.name} onChange={set("name")} />
            <Field
              label="Số điện thoại *"
              value={form.phone}
              onChange={set("phone")}
              type="tel"
            />
            <Field
              label="Điểm đón *"
              value={form.pickup}
              onChange={set("pickup")}
              className="md:col-span-2"
            />
            <Field
              label="Điểm đến"
              value={form.dropoff}
              onChange={set("dropoff")}
              className="md:col-span-2"
            />
            <Field
              label="Ngày"
              value={form.date}
              onChange={set("date")}
              type="date"
            />
            <Field
              label="Giờ"
              value={form.time}
              onChange={set("time")}
              type="time"
            />
            <Select
              label="Loại xe"
              value={form.vehicle}
              onChange={set("vehicle")}
              options={VEHICLES}
            />
            <Select
              label="Loại chuyến"
              value={form.tripType}
              onChange={set("tripType")}
              options={TRIPS}
            />
            <div className="md:col-span-2">
              <label className="text-sm text-foreground/70">Ghi chú</label>
              <textarea
                value={form.note}
                onChange={set("note")}
                rows={3}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]"
              />
            </div>
            <button
              type="submit"
              className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-6 py-3.5 font-semibold text-[var(--brand-foreground)] transition hover:brightness-110"
            >
              <Send className="h-4 w-4" /> Gửi yêu cầu đặt xe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
function Field({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="text-sm text-foreground/70">{label}</label>
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]"
      />
    </div>
  );
}
function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm text-foreground/70">{label}</label>
      <select
        {...props}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-[var(--surface-2)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[var(--surface-2)]">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
