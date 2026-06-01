import { useState } from "react";
import VietTaxiNavbar from "./components/VietTaxiNavbar";
import Services from "./components/VietTaxiServices";
import VietTaxiDetailSer from "./components/VietTaxiDetailSer";
import WhyUsService from "./components/WhyUsService";
import VietTaxiTestimonials from "./components/VietTaxiTestimonials";
import VietTaxiBookings from "./components/VietTaxiBookings";
import VietTaxiFooter from "./components/VietTaxiFooter";
import ZaloContactButton from "./components/ZaloContactButton";
import BookingPopup from "./components/VietTaxiPopupBooking";

export default function App() {
  const [openBooking, setOpenBooking] = useState(false);
  return (
    <div>
      <VietTaxiNavbar />
      <Services />
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
