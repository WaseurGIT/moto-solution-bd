import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { role, loading } = useAuth();

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="flex">
      <aside className="w-70 bg-gray-300">
        <h3>Dashboard Menu</h3>

        <ul>
          {role === "admin" ? (
            <>
              <li>
                <NavLink to="/dashboard/admin">Admin Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addTechnician">Add Technician</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageVehicles">
                  Manage Vehicles
                </NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/user">User Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myBookings">My Bookings</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reviews">My Reviews</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </>
          )}
        </ul>
      </aside>

      <main style={{ padding: "20px", flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
