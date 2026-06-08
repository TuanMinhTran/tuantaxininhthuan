import { X } from "lucide-react";
import { useEffect } from "react";

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
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const prevTouch = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouch;
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/70 backdrop-blur-sm
        p-4
        backdrop-blur-sm 
        animate-[fadeIn_.25s_ease-out]
      "
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            flex flex-col

            w-full max-w-4xl
            h-[85vh]

            rounded-3xl
            border border-yellow-500/20

            bg-[#111]/95
            backdrop-blur-xl

            p-6 md:p-8

            shadow-[0_25px_80px_rgba(0,0,0,0.65)]

            max-h-[90vh]
            overflow-y-auto

            transform-gpu
            will-change-transform

            animate-[modalSmooth_.45s_cubic-bezier(0.22,1,0.36,1)]
                  "
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="
            absolute right-4 top-4
            rounded-full p-2
            text-gray-400
            z-30
            hover:bg-white/10
            hover:text-white
            transition
          "
          >
            <X size={22} />
          </button>

          {/* Heading */}
          <div
            className="
              sticky top-0 z-20
              bg-[#111]/95 backdrop-blur-xl

              pb-5 mb-5
              border-b border-white/10
            "
          >
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
          <div
            className="
              flex-1
              rounded-2xl
              border border-white/10
              overflow-hidden
              bg-black/40
            "
          >
            <div
              className="
                h-full
                overflow-y-auto
                overflow-x-auto
              "
            >
              <table className="w-full min-w-[600px]">
                <thead className="sticky top-0 z-10 bg-yellow-500 text-black">
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
          <div
            className="
              sticky bottom-0
              mt-5 pt-5

              bg-[#111]/95
              backdrop-blur-xl

              border-t border-white/10

              flex justify-center
            "
          >
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

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              backdrop-filter: blur(0px);
            }

            to {
              opacity: 1;
              backdrop-filter: blur(4px);
            }
          }

          @keyframes modalSmooth {
            0% {
              opacity: 0;
              transform: translateY(40px) scale(0.92);
              filter: blur(8px);
            }

            60% {
              opacity: 1;
              transform: translateY(-4px) scale(1.01);
              filter: blur(0px);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
        `}
      </style>
    </>
  );
}
