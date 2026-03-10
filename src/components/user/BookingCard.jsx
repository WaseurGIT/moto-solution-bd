import { MdOutlineNoteAlt } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../../api/axiosSecure";
import { useEffect, useState } from "react";

const BookingCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const vehicleType = form.vehicleType.value;
    const model = form.model.value;
    const categoryData = JSON.parse(form.category.value);
    const date = form.date.value;
    const address = form.address.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const paymentMethod = form.paymentMethod.value;

    const bookingData = {
      name,
      vehicleType,
      model,
      category: categoryData.name,
      price: categoryData.price,
      date,
      address,
      phone,
      email,
      paymentMethod,
    };

    const result = await axiosSecure.post("/bookings", bookingData);
    if (result.data.insertedId) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Booking successful",
        showConfirmButton: false,
        timer: 2000,
      });
      form.reset();
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to book service. Please try again.",
      });
    }
  };

  const vehicleTypes = ["Car", "Bike", "Electric Scooter"];
  const categories = [
    { name: "Bike Wash", price: "200" },
    { name: "Car Wash", price: "300" },
    { name: "Car Repair", price: "500" },
    { name: "Bike Repair", price: "250" },
    { name: "Master Service", price: "1000" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center gap-4 text-blue-500 mb-8">
          <h1 className="text-3xl font-bold">Book a Service</h1>
          <MdOutlineNoteAlt className="text-4xl" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userInfo?.name}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Type
            </label>
            <select
              type="text"
              name="vehicleType"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select vehicle type</option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <input
              type="text"
              name="model"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Toyota Corolla"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Category
            </label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select service category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={JSON.stringify(cat)}>
                  {cat.name} - BDT {cat.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Payment Method
            </label>
            <select
              name="paymentMethod"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a payment method</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              type="text"
              name="address"
              required
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={userInfo?.phone}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userInfo?.email}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              Book Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingCard;
