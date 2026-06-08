import { Routes, Route, BrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Terms from "./components/Terms";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToHash from "./components/ScrollToHash";

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dieu-khoan-su-dung" element={<Terms />} />
        <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}
