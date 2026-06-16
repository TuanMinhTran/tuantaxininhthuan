import api from "./api";

export const STATUS_LABELS = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export async function getBookings() {
  const response = await api.get("/bookings");

  return response.data.map((b) => ({
    id: b.id,

    name: b.name,
    phone: b.phone,

    pickup: b.pickup,
    dropoff: b.dropoff,

    date: b.date,
    time: b.time,

    vehicle: b.vehicle,
    tripType: b.tripType,

    note: b.note,

    status: b.status,

    seen: b.seen,

    createdAt: b.createdAt,
  }));
}

export async function createBooking(data) {
  const response = await api.post("/bookings", {
    name: data.name,
    phone: data.phone,

    pickup: data.pickup,
    dropoff: data.dropoff,

    date: data.date,
    time: data.time,

    vehicle: data.vehicle,
    tripType: data.tripType,

    note: data.note,
  });

  return response.data;
}

export async function updateBooking(id, data) {
  const response = await api.put(`/bookings/${id}`, {
    name: data.name,
    phone: data.phone,

    pickup: data.pickup,
    dropoff: data.dropoff,

    date: data.date,
    time: data.time,

    vehicle: data.vehicle,
    tripType: data.tripType,

    note: data.note,
  });

  return response.data;
}

export async function deleteBooking(id) {
  await api.delete(`/bookings/${id}`);
}

export async function updateCancelBooking(id) {
  const response = await api.patch(`/bookings/${id}/cancel`);

  return response.data;
}

export async function markSeen(id) {
  const response = await api.patch(`/bookings/${id}/seen`);

  return response.data;
}

export async function markAllSeen() {
  await api.patch("/bookings/seen-all");
}

export async function updateBookingStatus(id, status) {
  const response = await api.patch(`/bookings/${id}/status?status=${status}`);

  return response.data;
}