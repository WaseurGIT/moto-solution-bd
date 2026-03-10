import React, { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";

const AllTechnicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/technicians");
      setTechnicians(res.data);
    } catch (error) {
      console.error("Error fetching technicians:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch technicians",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/technicians/${id}`);
          if (res.data.deletedCount > 0) {
            setTechnicians(technicians.filter((tech) => tech._id !== id));
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Technician has been deleted.",
            });
          }
        } catch (error) {
          console.error("Error deleting technician:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete technician",
          });
        }
      }
    });
  };

  if (loading) {
    return <div className="p-6 text-center">Loading technicians...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Technicians</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border border-gray-300 p-3 text-left">#</th>
              <th className="border border-gray-300 p-3 text-left">Name</th>
              <th className="border border-gray-300 p-3 text-left">Role</th>
              <th className="border border-gray-300 p-3 text-left">Image</th>
              <th className="border border-gray-300 p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((technician, index) => (
              <tr key={technician._id} className="hover:bg-gray-100">
                <td className="border p-2">{index + 1}</td>
                <td className="border border-gray-300 p-3">
                  {technician.name}
                </td>
                <td className="border border-gray-300 p-3">
                  {technician.role}
                </td>
                <td className="border border-gray-300 p-3">
                  <img
                    src={technician.img}
                    alt={technician.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                </td>
                <td className="border border-gray-300 p-3 text-center">
                  <button
                    onClick={() => handleDelete(technician._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {technicians.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No technicians found.
        </div>
      )}
    </div>
  );
};

export default AllTechnicians;
