import { X } from "lucide-react";

const prices = [
  {
    title: "Phan Rang → Sân bay Cam Ranh ",
    four: "700.000đ",
    seven: "850.000đ",
  },
  {
    title: "Phan Rang → Vĩnh Hy",
    four: "400.000đ",
    seven: "500.000đ",
  },
  {
    title: "Phan Rang → Đà Lạt",
    four: "1.800.000đ",
    seven: "2.200.000đ",
  },
  {
    title: "Phan Rang → Nha Trang",
    four: "1.000.000đ",
    seven: "1.300.000đ",
  },
  {
    title: "Phan Rang → TP Hồ Chí Minh",
    four: "2.200.000đ",
    seven: "2.600.000đ",
  },
];

export default function PricingModal({ open, onClose, setOpenBooking }) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/70 backdrop-blur-sm
        p-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full max-w-4xl
          rounded-3xl
          border border-yellow-500/20
          bg-[#111]
          p-6 md:p-8
          shadow-2xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="
            absolute right-4 top-4
            rounded-full p-2
            text-gray-400
            hover:bg-white/10
            hover:text-white
            transition
          "
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <div className="mb-8">
          <h2
            className="
              text-3xl md:text-4xl
              font-bold
              text-yellow-400
            "
          >
            BẢNG GIÁ DỊCH VỤ
          </h2>

          <p className="mt-2 text-gray-400">
            Giá tham khảo — liên hệ để báo giá chính xác theo thời điểm.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[600px]">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="px-5 py-4 text-left">Tuyến đường</th>
                <th className="px-5 py-4 text-center">Xe 4 chỗ</th>
                <th className="px-5 py-4 text-center">Xe 7 chỗ</th>
              </tr>
            </thead>

            <tbody>
              {prices.map((item, index) => (
                <tr
                  key={index}
                  className="
                    border-t border-white/10
                    bg-black/40
                    hover:bg-white/5
                    transition
                  "
                >
                  <td className="px-5 py-4 text-white">{item.title}</td>

                  <td className="px-5 py-4 text-center text-yellow-400 font-semibold">
                    {item.four}
                  </td>

                  <td className="px-5 py-4 text-center text-yellow-400 font-semibold">
                    {item.seven}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div
          className="
            mt-6 rounded-2xl
            border border-yellow-500/20
            bg-yellow-500/10
            p-4
            text-sm text-gray-300
          "
        >
          ✔ Giá đã bao gồm tài xế <br />
          ✔ Hỗ trợ 24/7 <br />✔ Có xe cưới - xe du lịch - hợp đồng dài ngày
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              onClose();
              setOpenBooking(true);
            }}
            className="
              rounded-xl
              bg-yellow-500
              px-6 py-3
              font-semibold
              text-black
              hover:bg-yellow-400
              transition
            "
          >
            Đặt xe ngay
          </button>
        </div>
      </div>
    </div>
  );
}
