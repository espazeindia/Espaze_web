import React, { useState } from "react";

const OperationsOnboardingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    address3: "",
    pan: "",
    password: "",
    warehouse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Restrict phone to only numbers
    if (name === "phone") {
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Operations Onboarding Submitted!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🚀 Operations Onboarding Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter full name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength={10}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter phone number"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter email address"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                placeholder="Street / Locality"
                className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                placeholder="City"
                className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="text"
                name="address3"
                value={formData.address3}
                onChange={handleChange}
                placeholder="State"
                className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* PAN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
            <input
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              required
              maxLength={10}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none uppercase"
              placeholder="ABCDE1234F"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter password"
            />
          </div>

          {/* Warehouse Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Warehouse</label>
            <select
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">-- Select Warehouse --</option>
              <option value="Warehouse 1">Warehouse 1</option>
              <option value="Warehouse 2">Warehouse 2</option>
              <option value="Warehouse 3">Warehouse 3</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Submit 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperationsOnboardingForm;
