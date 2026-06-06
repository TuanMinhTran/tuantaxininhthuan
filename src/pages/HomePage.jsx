import { useEffect, useState } from "react";

import VietTaxiDetailSer from "@/components/VietTaxiDetailSer";
import WhyUsService from "@/components/WhyUsService";
import VietTaxiTestimonials from "@/components/VietTaxiTestimonials";
import VietTaxiBookings from "@/components/VietTaxiBookings";
import VietTaxiFooter from "@/components/VietTaxiFooter";
import ZaloContactButton from "@/components/ZaloContactButton";
import BookingPopup from "@/components/VietTaxiPopupBooking";
import VietTaxiNavbar from "@/components/VietTaxiNavbar";
import VietTaxiServices from "@/components/VietTaxiServices";

export default function HomePage() {
  const [openBooking, setOpenBooking] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);
  return (
    <div>
      <VietTaxiNavbar />
      <VietTaxiServices />
      <VietTaxiDetailSer />
      <WhyUsService />
      <VietTaxiTestimonials />
      <VietTaxiBookings setOpenBooking={setOpenBooking} />
      <VietTaxiFooter />
      <ZaloContactButton zaloId="0827524105" />
      <BookingPopup
        open={openBooking}
        onClose={() => setOpenBooking(false)}
        setToast={setToast}
      />
      {toast && (
        <div
          className={`
              fixed top-5 right-5 z-[9999]
              min-w-[320px]
              rounded-xl px-5 py-4
              text-white shadow-2xl
              animate-[slideUp_.25s_ease-out]

              ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}
          `}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
