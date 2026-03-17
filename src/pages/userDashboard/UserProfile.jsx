import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  IdentificationIcon,
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon 
} from '@heroicons/react/24/outline';

const UserProfile = () => {
  const { user, role, loading } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const initial = userInfo?.name?.charAt(0)?.toUpperCase();

  const infoCards = [
    {
      icon: IdentificationIcon,
      label: "Full Name",
      value: userInfo?.name || "N/A",
      color: "blue"
    },
    {
      icon: EnvelopeIcon,
      label: "Email Address",
      value: userInfo?.email || "N/A",
      color: "purple"
    },
    {
      icon: PhoneIcon,
      label: "Phone Number",
      value: userInfo?.phone || "Not provided",
      color: "green"
    },
    {
      icon: BriefcaseIcon,
      label: "Account Role",
      value: role || "User",
      color: "orange"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-100",
      purple: "bg-purple-50 text-purple-600 border-purple-100",
      green: "bg-green-50 text-green-600 border-green-100",
      orange: "bg-orange-50 text-orange-600 border-orange-100"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-5xl mx-auto">
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 border border-slate-200">
          
          <div className="relative h-32 sm:h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
          </div>
          
          <div className="relative px-6 pb-6">
            
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 sm:left-8 sm:translate-x-0">
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-white">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl font-bold text-white">
                      {initial}
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
            
            <div className="mt-16 sm:mt-4 sm:ml-36 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    {userInfo?.name}
                  </h1>
                  <p className="text-slate-500 flex items-center justify-center sm:justify-start mt-1">
                    <EnvelopeIcon className="w-4 h-4 mr-1" />
                    {userInfo?.email}
                  </p>
                </div>
                
                <div className="mt-3 sm:mt-0">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
                    {role || "User"}
                  </span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Member Since</p>
                <p className="text-sm font-semibold text-slate-700">
                  {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPinIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Location</p>
                <p className="text-sm font-semibold text-slate-700">Not specified</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BriefcaseIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Account Status</p>
                <p className="text-sm font-semibold text-green-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-700">Profile Information</h2>
            <p className="text-xs text-slate-500 mt-0.5">Your personal details and account settings</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {infoCards.map((item, index) => {
                const Icon = item.icon;
                const colorClasses = getColorClasses(item.color);
                
                return (
                  <div
                    key={index}
                    className="group relative bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-200 hover:border-slate-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2.5 rounded-lg ${colorClasses} border`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                          {item.label}
                        </p>
                        <p className="text-base font-semibold text-slate-700 mt-0.5 break-all">
                          {item.value}
                        </p>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-blue-200 transition-all duration-200 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow">
                  Update Information
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">
            🔒 Your information is protected and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;