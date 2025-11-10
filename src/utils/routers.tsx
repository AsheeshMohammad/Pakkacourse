import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin/Admin";
import AdminHome from "../pages/Admin/AdminHome";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="admin" element={<Admin />} />
        <Route path="admin/home" element={<AdminHome />} />
      </Route>
    </Routes>
  </Router>
);
