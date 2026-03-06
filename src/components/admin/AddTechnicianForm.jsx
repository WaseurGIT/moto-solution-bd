import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosSecure from "../../api/axiosSecure";

const AddTechnicianForm = () => {
  const navigate = useNavigate();
  const handleAddTechnician = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const role = form.role.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const joiningDate = form.joiningDate.value;

    const technicianData = {
      name,
      role,
      email,
      phone,
      address,
      joiningDate,
    };

    axiosSecure
      .post("/technicians", technicianData)
      .then((res) => {
        Swal.fire({
          title: "Technician Added 🎉",
          icon: "success",
          position: "top-right",
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          background: "#f0fdf4",
        });
        form.reset();
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Error adding technician. Please try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="max-w-2xl my-12 mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-center text-blue-500 gap-2 mb-6">
        <h2 className="text-2xl font-semibold">Add New Technician</h2>
        <HiOutlineWrenchScrewdriver className="text-2xl" />
      </div>

      <form className="space-y-5" onSubmit={handleAddTechnician}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter technician name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            name="role"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select role</option>
            <option value="Senior Bike Technician">
              Senior Bike Technician
            </option>
            <option value="Car Repair Specialist">Car Repair Specialist</option>
            <option value="Engine Diagnostic Expert">
              Engine Diagnostic Expert
            </option>
            <option value="Bike Maintenance Technician">
              Bike Maintenance Technician
            </option>
            <option value="Car Washing Specialist">
              Car Washing Specialist
            </option>
            <option value="Electrical System Technician">
              Electrical System Technician
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            name="address"
            placeholder="Enter address"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Joining Date
          </label>
          <input
            type="date"
            name="joiningDate"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 cursor-pointer bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Add Technician
          </button>
          <button
            type="reset"
            className="flex-1 cursor-pointer bg-gray-300 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTechnicianForm;
