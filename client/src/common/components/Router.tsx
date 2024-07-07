import Login from "@/auth/pages/Login";
import Register from "@/auth/pages/Register";
import Overview from "@/overview/Overview";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestrictedRoute from "./RestrictedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RestrictedRoute>
        <Login />
      </RestrictedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <RestrictedRoute>
        <Register />
      </RestrictedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <RestrictedRoute private>
        <Overview />
      </RestrictedRoute>
    ),
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
