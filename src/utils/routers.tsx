import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin/Admin";
import AdminHome from "../pages/Admin/AdminHome";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "admin/home",
        element: <AdminHome />,
      },
    ],
  },
]);
