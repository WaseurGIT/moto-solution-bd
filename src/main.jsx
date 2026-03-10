import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/public/Home.jsx";
import Root from "./routes/Root.jsx";
import ErrorPage from "./components/shared/ErrorPage.jsx";
import About from "./pages/public/About.jsx";
import Contact from "./pages/public/Contact.jsx";
import Login from "./pages/public/Login.jsx";
import Register from "./pages/public/Register.jsx";
import ReviewForm from "./components/user/ReviewForm.jsx";
import AddTechnicianForm from "./components/admin/AddTechnicianForm.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import BookingCard from "./components/user/BookingCard.jsx";
import Vehicles from "./pages/public/Vehicles.jsx";
import VehicleDetails from "./pages/public/VehicleDetails.jsx";
import VehicleBooking from "./pages/public/VehicleBooking.jsx";
import Accessories from "./pages/public/Accessories.jsx";
import UserDashboard from "./pages/userDashboard/UserDashboard.jsx";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import DashboardLayout from "./routes/DashboardLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/vehicles",
        element: <Vehicles />,
      },
      {
        path: "/vehicles/:id",
        element: <VehicleDetails />,
      },
      {
        path: "/vehicleBooking/:id",
        element: <VehicleBooking />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/accessories",
        element: <Accessories />,
      },
      {
        path: "/reviewForm",
        element: <ReviewForm />,
      },
      {
        path: "/addTechnician",
        element: <AddTechnicianForm />,
      },
      {
        path: "/addBooking",
        element: <BookingCard />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "user",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
