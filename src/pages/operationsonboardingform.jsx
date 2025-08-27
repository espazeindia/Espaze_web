import React, { useState } from "react";

const OperationsOnboardingForm = () => {
  const [profilePic, setProfilePic] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl border border-purple-200">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
          Operations Onboarding
        </h2>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-8">
          <label className="cursor-pointer relative">
            <div className="w-28 h-28 rounded-full border-4 border-purple-400 bg-purple-50 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-purple-500 text-sm font-medium">Upload</span>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">Upload Profile Picture</p>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Enter phone number"
              className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
              onInput={(e) => {
                if (e.target.value.length > 10)
                  e.target.value = e.target.value.slice(0, 10);
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Email ID
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* PAN */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              PAN Number
            </label>
            <input
              type="text"
              placeholder="Enter PAN number"
              className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 uppercase focus:ring-2 focus:ring-purple-500 focus:outline-none"
              maxLength={10}
              required
            />
          </div>

          {/* Address Line 1 */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Address Line 1
            </label>
            <input
              type="text"
              placeholder="Street / Locality"
              className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Address Line 2
            </label>
            <input
              type="text"
              placeholder="City / District"
              className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Address Line 3 */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Address Line 3
            </label>
            <input
              type="text"
              placeholder="State / Pin Code"
              className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Warehouse Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Warehouse
            </label>
            <select
              className="mt-1 w-full border border-purple-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            >
              <option value="">Select Warehouse</option>
              <option value="warehouse1">Warehouse 1</option>
              <option value="warehouse2">Warehouse 2</option>
              <option value="warehouse3">Warehouse 3</option>
            </select>
          </div>
        </form>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-purple-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-purple-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperationsOnboardingForm;
