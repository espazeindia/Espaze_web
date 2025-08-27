import React, { useState } from "react";

const OperationsOnboardingForm = () => {
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
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    alert("Operations Onboarding Successful!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-10 flex flex-col md:flex-row gap-10">
        
        {/* Left Side - Profile Pic Upload */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/3">
          <label className="w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-400 shadow-md cursor-pointer overflow-hidden hover:scale-105 transition">
            {formData.profilePic ? (
              <img
                src={URL.createObjectURL(formData.profilePic)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-purple-600 font-semibold">Upload Pic</span>
            )}
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          <p className="mt-3 text-sm text-gray-600">Profile Picture</p>
        </div>

        {/* Right Side - Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 space-y-5">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">
            Operations Onboarding
          </h2>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
          />

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              value={formData.addressLine1}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              name="addressLine3"
              placeholder="Address Line 3"
              value={formData.addressLine3}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* PAN */}
          <input
            type="text"
            name="pan"
            placeholder="PAN Number"
            value={formData.pan}
            onChange={handleChange}
            required
            maxLength={10}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
          />

          {/* Warehouse Dropdown */}
          <select
            name="warehouse"
            value={formData.warehouse}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select Warehouse</option>
            <option value="Warehouse A">Warehouse A</option>
            <option value="Warehouse B">Warehouse B</option>
            <option value="Warehouse C">Warehouse C</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl shadow-md transition transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OperationsOnboardingForm;
