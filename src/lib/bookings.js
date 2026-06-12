const KEY = "viettaxi_bookings";

export function getBookings() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
export function saveBookings(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("bookings:updated"));
}
export function addBooking(data) {
  const list = getBookings();
  const booking = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
    seen: false,
    ...data,
  };
  list.unshift(booking);
  saveBookings(list);
  return booking;
}
export function updateBooking(id, patch) {
  const list = getBookings().map((b) => (b.id === id ? { ...b, ...patch } : b));
  saveBookings(list);
}
export function deleteBooking(id) {
  saveBookings(getBookings().filter((b) => b.id !== id));
}
export function updateCancelBooking(id) {
  const updated = getBookings().map((b) =>
    b.id === id
      ? {
          ...b,
          status: "cancelled",
        }
      : b
  );

  saveBookings(updated);
}
export function markAllSeen() {
  saveBookings(getBookings().map((b) => ({ ...b, seen: true })));
}
export const STATUS_LABELS = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};
