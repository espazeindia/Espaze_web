import React, { useState } from "react";

export default function OperationsOnboarding() {
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
    profilePic: null,
  });

  const warehouses = ["Warehouse A", "Warehouse B", "Warehouse C"];

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
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-500 p-6">
      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/30">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-md">
          🚀 Operations Onboarding
        </h2>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <label className="relative cursor-pointer">
            <div className="w-28 h-28 rounded-full bg-white/30 flex items-center justify-center border-4 border-purple-300 shadow-lg overflow-hidden">
              {formData.profilePic ? (
                <img
                  src={URL.createObjectURL(formData.profilePic)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold">Upload</span>
              )}
            </div>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>
          <p className="text-white/80 text-sm mt-2">Profile Picture</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />

          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />

          <input
            type="text"
            name="pan"
            placeholder="PAN Number"
            value={formData.pan}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />

          <select
            name="warehouse"
            value={formData.warehouse}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          >
            <option value="">Select Warehouse</option>
            {warehouses.map((w, index) => (
              <option key={index} value={w} className="text-black">
                {w}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={formData.address1}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300 col-span-2"
            required
          />
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2"
            value={formData.address2}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300 col-span-2"
          />
          <input
            type="text"
            name="address3"
            placeholder="Address Line 3"
            value={formData.address3}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-300 col-span-2"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all text-lg font-semibold shadow-xl"
          >
            Submit 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
