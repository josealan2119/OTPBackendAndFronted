import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ResgisterPage from './pages/RegisterPage';
import OtpPage from "./pages/OtpPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<ResgisterPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}
