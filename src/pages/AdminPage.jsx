import { useState } from "react";
import AdminDashboard from "../admin/AdminDashboard";
import AdminLogin from "../admin/AdminLogin";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("admin_auth") === "true"
  );

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  return <AdminDashboard />;
}
