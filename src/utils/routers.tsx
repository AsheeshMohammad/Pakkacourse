import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home';
import Admin from '../pages/Admin/Admin';
import AdminHome from '../pages/Admin/AdminHome';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/home",
    element: <AdminHome />,
  },
]);