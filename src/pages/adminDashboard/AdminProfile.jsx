import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import ServicePieStats from "../../components/admin/ServicePieStats";
import VehiclePieStats from "../../components/admin/VehiclePieStats";
import TechnicianRolePieStats from "../../components/admin/TechnicianRolePieStats";
import AccessoriesPieStats from "../../components/admin/AccessoriesPieStats";

const AdminProfile = () => {
  const { user } = useAuth();
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => {
          setAdminInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Monitor your platform activity and analytics
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 mb-12 flex items-center gap-8 max-w-4xl">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Admin"
            className="w-24 h-24 rounded-full object-cover border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
            👤
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">
            {adminInfo?.name || user?.displayName}
          </h2>

          <p className="text-gray-500 mt-1">{user?.email}</p>

          <div className="mt-3 flex gap-3 flex-wrap">
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
              {adminInfo?.role || "Admin"}
            </span>

            {adminInfo?.phone && (
              <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                📞 {adminInfo.phone}
              </span>
            )}

            {adminInfo?.address && (
              <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                📍 {adminInfo.address}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ANALYTICS TITLE */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Analytics Overview
        </h2>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
   
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">
            Service Usage
          </h3>
          <div className="flex justify-center">
            <ServicePieStats />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">
            Vehicle Bookings
          </h3>
          <div className="flex justify-center">
            <VehiclePieStats />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">
            Technician Role Distribution
          </h3>
          <div className="flex justify-center">
            <TechnicianRolePieStats />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">
            Accessorie Category Stats
          </h3>
          <div className="flex justify-center">
            <AccessoriesPieStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
