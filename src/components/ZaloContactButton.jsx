import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
export function ZaloContactButton({
  zaloId,
  qrImageUrl,
  label = "Quét mã để chat Zalo",
}) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);
  const zaloLink = `https://zalo.me/${zaloId}`;
  const qrSrc =
    qrImageUrl ??
    `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
      zaloLink
    )}`;
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  return (
    <div className="fixed bottom-6 right-6 z-50" ref={popoverRef}>
      {open && (
        <div className="absolute bottom-20 right-0 w-64 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Đóng"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="mb-3 pr-6 text-center text-sm font-medium text-gray-800">
            {label}
          </p>
          <div className="flex justify-center rounded-lg bg-white p-2 ring-1 ring-gray-100">
            <img src={qrSrc} alt="Zalo QR" className="h-40 w-40" />
          </div>
          <a
            href={zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-full rounded-lg bg-[#0068FF] py-2 text-center text-sm font-semibold text-white hover:bg-[#0052cc]"
          >
            Mở Zalo
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg shadow-blue-500/40 transition-transform hover:scale-110"
        aria-label="Liên hệ Zalo"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#0068FF] opacity-30" />
        <MessageCircle className="h-7 w-7 fill-white" strokeWidth={0} />
        <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-yellow-400" />
      </button>
    </div>
  );
}
export default ZaloContactButton;
