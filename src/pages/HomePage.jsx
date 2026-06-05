import { useState } from "react";

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
      <BookingPopup open={openBooking} onClose={() => setOpenBooking(false)} />
    </div>
  );
}
