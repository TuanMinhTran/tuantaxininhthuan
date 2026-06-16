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
import PricingModal from "@/components/PricingModal";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const [openBooking, setOpenBooking] = useState(false);
  const [toast, setToast] = useState(null);
  const [openPricing, setOpenPricing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("pricing") === "true") {
      setOpenPricing(true);
    }
  }, [location.search]);

  return (
    <div>
      <VietTaxiNavbar setOpenPricing={setOpenPricing} />
      <VietTaxiServices />
      <VietTaxiDetailSer />
      <WhyUsService />
      <VietTaxiTestimonials />
      <VietTaxiBookings setOpenBooking={setOpenBooking} />
      <VietTaxiFooter setOpenPricing={setOpenPricing} />
      <ZaloContactButton zaloId="0827524105" />
      <BookingPopup
        open={openBooking}
        onClose={() => setOpenBooking(false)}
        setToast={setToast}
      />
      <PricingModal
        open={openPricing}
        onClose={() => setOpenPricing(false)}
        setOpenBooking={setOpenBooking}
      />
      {toast && (
        <div
          className={`
            fixed

            top-4 left-1/2 -translate-x-1/2
            sm:top-5 sm:right-5 sm:left-auto sm:translate-x-0

            z-[9999]

            w-[calc(100%-32px)]
            sm:w-auto
            sm:min-w-[320px]

            rounded-xl
            px-5 py-4

            text-sm sm:text-base
            text-white

            shadow-2xl
            backdrop-blur-md

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
