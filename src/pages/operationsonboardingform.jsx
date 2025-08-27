import React, { useState } from "react";

const OperationsOnboardingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    cityStatePin: "",
    pan: "",
    password: "",
    warehouse: "",
  });

  const warehouses = ["Warehouse A", "Warehouse B", "Warehouse C"]; // dummy data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Operations Onboarding Data:", formData);
    alert("Operations Onboarding Successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          Operations Onboarding Form
        </h2>

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Address */}
        <h3 className="text-lg font-semibold text-indigo-600 mt-4">Address</h3>
        <div>
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={formData.addressLine1}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300 mb-2"
          />
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300 mb-2"
          />
          <input
            type="text"
            name="cityStatePin"
            placeholder="City / State / Pin"
            value={formData.cityStatePin}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* PAN */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">PAN</label>
          <input
            type="text"
            name="pan"
            placeholder="Enter PAN number"
            value={formData.pan}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Warehouse Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Warehouse</label>
          <select
            name="warehouse"
            value={formData.warehouse}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
          >
            <option value="">Select Warehouse</option>
            {warehouses.map((w, idx) => (
              <option key={idx} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OperationsOnboardingForm;
