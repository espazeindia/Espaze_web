import React, { useState } from "react";

const OperationsOnboarding = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    pan: "",
    password: "",
    warehouse: "",
  });

  const warehouses = ["Warehouse A", "Warehouse B", "Warehouse C"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent text in phone number field
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Operations Onboarding Submitted: ", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-10">
        
        {/* Image Holder */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 bg-purple-200 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-purple-700 font-bold text-xl">Logo</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-purple-800">
            Operations Onboarding
          </h2>
          <p className="text-gray-500 mt-1">Register your details below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              maxLength="10"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Enter 10-digit number"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              placeholder="Address Line 1"
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Address Line 2"
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <input
              type="text"
              name="addressLine3"
              value={formData.addressLine3}
              onChange={handleChange}
              placeholder="Address Line 3"
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* PAN */}
          <div>
            <label className="block text-gray-700 font-medium">PAN</label>
            <input
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Warehouse Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium">Select Warehouse</label>
            <select
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">-- Select Warehouse --</option>
              {warehouses.map((wh, idx) => (
                <option key={idx} value={wh}>
                  {wh}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
            >
              Submit Onboarding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperationsOnboarding;
