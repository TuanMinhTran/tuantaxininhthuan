import { useEffect, useState } from "react";

export default function BookingPopup({ open, onClose, onSubmit }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const initialForm = {
    name: "",
    phone: "",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    vehicle: "4-cho",
    tripType: "1-chieu",
    note: "",
  };

  const [form, setForm] = useState(initialForm);

  const handleClose = () => {
    setError("");
    setForm(initialForm);
    onClose?.();
  };
  // Đóng khi nhấn ESC + khóa scroll body khi mở
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && handleClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, handleClose]);
  if (!open) return null;
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.pickup.trim() ||
      !form.dropoff.trim()
    ) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc (*)");
      return;
    }
    if (!/^[0-9+\-\s]{8,15}$/.test(form.phone.trim())) {
      setError("Số điện thoại không hợp lệ");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmit?.(form);
      handleClose?.();
      setForm({
        name: "",
        phone: "",
        pickup: "",
        dropoff: "",
        date: "",
        time: "",
        vehicle: "4-cho",
        tripType: "1-chieu",
        note: "",
      });
    }, 600);
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_.2s_ease-out]"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vt-popup-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--brand-3)] shadow-2xl animate-[slideUp_.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              {/* Car icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 17H3v-5l2-5h14l2 5v5h-2" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
            <div>
              <h2
                id="vt-popup-title"
                className="text-xl font-bold text-white-900"
              >
                ĐẶT XE HỢP ĐỒNG
              </h2>
              <p className="text-sm text-red-500">
                Điền thông tin, chúng tôi sẽ liên hệ ngay.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
            aria-label="Đóng"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Họ và tên *">
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Nguyễn Văn A"
                maxLength={100}
                className={inputCls}
              />
            </Field>
            <Field label="Số điện thoại *">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="0393 939 393"
                maxLength={15}
                className={inputCls}
              />
            </Field>
          </div>
          <Field label="Điểm đón *">
            <input
              type="text"
              value={form.pickup}
              onChange={(e) => update("pickup", e.target.value)}
              placeholder="VD: Sân bay Cam Ranh"
              maxLength={200}
              className={inputCls}
            />
          </Field>
          <Field label="Điểm đến *">
            <input
              type="text"
              value={form.dropoff}
              onChange={(e) => update("dropoff", e.target.value)}
              placeholder="VD: TP. Phan Rang"
              maxLength={200}
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Ngày đi">
              <input
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className={`${inputCls} cursor-pointer`}
                onClick={(e) => e.target.showPicker?.()}
              />
            </Field>
            <Field label="Giờ đón">
              <input
                type="time"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                className={`${inputCls} cursor-pointer`}
                onClick={(e) => e.target.showPicker?.()}
              />
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Loại xe">
              <select
                value={form.vehicle}
                onChange={(e) => update("vehicle", e.target.value)}
                className={`${inputCls} cursor-pointer`}
              >
                <option value="4-cho">Xe 4 chỗ</option>
                <option value="7-cho">Xe 7 chỗ</option>
              </select>
            </Field>
            <Field label="Loại chuyến">
              <select
                value={form.tripType}
                onChange={(e) => update("tripType", e.target.value)}
                className={`${inputCls} cursor-pointer`}
              >
                <option value="1-chieu">Một chiều</option>
                <option value="khu-hoi">Khứ hồi</option>
                <option value="theo-ngay">Thuê theo ngày</option>
              </select>
            </Field>
          </div>
          <Field label="Ghi chú">
            <textarea
              value={form.note}
              onChange={(e) => update("note", e.target.value)}
              placeholder="Yêu cầu thêm (nếu có)"
              maxLength={500}
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </Field>
          {/* Footer actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-white-700 hover:bg-gray-50 transition hover:text-yellow-800 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {submitting ? "Đang gửi..." : "Xác nhận đặt xe"}
            </button>
          </div>
        </form>
      </div>
      {/* Keyframes (Tailwind arbitrary animate-[] reference these) */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(.98) }
          to   { opacity: 1; transform: translateY(0)    scale(1) }
        }
      `}</style>
    </div>
  );
}
/* ---------- helpers ---------- */
const inputCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition";
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-white-700">
        {label}
      </span>
      {children}
    </label>
  );
}
