import React, { useState } from "react";
import { FaTachometerAlt, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

const ProductDetails = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(true);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!profilePic) newErrors.image = "Profile picture is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Profile Saved Successfully ✅");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-2xl rounded-2xl flex w-full max-w-5xl overflow-hidden">
        
        {/* Left Side - Image & Upload */}
        <div className="w-1/3 bg-gradient-to-b from-blue-200 to-blue-50 p-6 flex flex-col items-center justify-center">
          <div className="mb-4 text-xl font-bold flex items-center gap-2 text-gray-700">
            <FaTachometerAlt className="text-blue-600" /> Dashboard
          </div>
          <div className="mb-4 text-xl font-bold flex items-center gap-2 text-gray-700">
            <FaUser className="text-blue-600" /> User Profile
          </div>

          <div className="relative w-32 h-32 rounded-full border-4 border-blue-400 overflow-hidden shadow-md">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                Upload Photo
              </span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-4 text-sm text-gray-600"
          />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>

        {/* Right Side - Form */}
        <div className="w-2/3 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FaUser className="text-blue-600" /> User Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            {/* Visibility Toggle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                className="flex items-center gap-2 text-blue-600 font-medium"
              >
                {visible ? (
                  <>
                    <FaEye /> Profile Visible
                  </>
                ) : (
                  <>
                    <FaEyeSlash /> Profile Hidden
                  </>
                )}
              </button>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
