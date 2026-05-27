import VietTaxiNavbar from "./components/VietTaxiNavbar";
import Services from "./components/VietTaxiServices";
import VietTaxiDetailSer from "./components/VietTaxiDetailSer";
import WhyUsService from "./components/WhyUsService";
import VietTaxiTestimonials from "./components/VietTaxiTestimonials";
import VietTaxiBookings from "./components/VietTaxiBookings";
import VietTaxiFooter from "./components/VietTaxiFooter";
import ZaloContactButton from "./components/ZaloContactButton";

export default function App() {
  return (
    <div>
      <VietTaxiNavbar />
      <Services />
      <VietTaxiDetailSer />
      <WhyUsService />
      <VietTaxiTestimonials />
      <VietTaxiBookings />
      <VietTaxiFooter />
      <ZaloContactButton zaloId="0827524105" />
    </div>
  );
}
