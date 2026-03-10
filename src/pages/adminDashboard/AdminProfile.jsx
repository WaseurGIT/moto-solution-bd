import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import ServicePieStats from "../../components/admin/ServicePieStats";
import VehiclePieStats from "../../components/admin/VehiclePieStats";

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
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900 tracking-tight">
            Admin Profile
          </h1>
          <div className="w-12 h-1 bg-gray-900 mt-4"></div>
        </div>

        <div className="border border-gray-200 rounded-lg p-12 mb-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Admin"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-4xl text-gray-400">👤</span>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Full Name
              </p>
              <p className="text-lg text-gray-900">
                {adminInfo?.name || user?.displayName || "Not Available"}
              </p>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Email
              </p>
              <p className="text-lg text-gray-900">{user?.email}</p>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Role
              </p>
              <p className="text-lg text-gray-900 capitalize">
                {adminInfo?.role || "Admin"}
              </p>
            </div>

            {adminInfo?.phone && (
              <div className="border-b border-gray-100 pb-4">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Phone
                </p>
                <p className="text-lg text-gray-900">{adminInfo.phone}</p>
              </div>
            )}

            {adminInfo?.address && (
              <div className="border-b border-gray-100 pb-4">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Address
                </p>
                <p className="text-lg text-gray-900">{adminInfo.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Service Stats</h1>
          <ServicePieStats />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Vehicle Stats</h1>
            <VehiclePieStats />
          </div>
      </div>
    </div>
  );
};

export default AdminProfile;
