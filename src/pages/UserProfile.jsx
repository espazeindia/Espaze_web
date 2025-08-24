import React, { useState } from "react";
import { useMode } from "../contexts/themeModeContext"; 

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    sellerName: "",
    phoneNumber: "",
    panNumber: "",
    gstin: "",
    companyName: "",
    shopName: "",
    securityPin: "",
    shopAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { theme } = useMode();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "panNumber" || name === "gstin") {
      newValue = value.toUpperCase();
    }
    if (name === "phoneNumber") {
      newValue = value.replace(/[^0-9+\s-]/g, "");
    }
    if (name === "securityPin") {
      newValue = value.replace(/[^0-9]/g, "");
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      console.log("User Profile Data:", formData);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-2 font-sans overflow-hidden ${
        theme
          ? "bg-white text-gray-800"
          : "bg-neutral-900 text-white"
      }`}
      style={{ minHeight: "93vh" }}
    >
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className={`text-2xl font-bold mb-3 ${theme ? "text-gray-800" : "text-white"}`}>User Profile</h1>
        <p className={`text-sm ${theme ? "text-gray-500" : "text-gray-400"}`}>Complete your profile information</p>
      </div>

      {/* Form Card */}
      <div
        className={`rounded-xl p-4 shadow-md border w-full flex-grow-0 ${
          theme ? "bg-white border-gray-200" : "bg-neutral-800 border-neutral-700"
        }`}
        style={{ maxWidth: "1100px" }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-2">
            <div className="relative">
              <div
                className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center cursor-pointer border-2 ${
                  theme
                    ? "bg-gray-100 border-gray-200 hover:border-purple-600"
                    : "bg-neutral-900 border-neutral-700 hover:border-purple-400"
                }`}
                onClick={() => document.getElementById("profilePicture").click()}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${theme ? "text-gray-500" : "text-gray-400"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                )}
              </div>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <p className={`text-xs mt-1 ${theme ? "text-gray-500" : "text-gray-400"}`}>
              Click to upload your profile picture
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>Seller Name *</label>
              <input
                type="text"
                name="sellerName"
                placeholder="Enter your full name"
                required
                value={formData.sellerName}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="+91 98765 43210"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>PAN Number *</label>
              <input
                type="text"
                name="panNumber"
                placeholder="ABCDE1234F"
                maxLength={10}
                required
                value={formData.panNumber}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>GSTIN</label>
              <input
                type="text"
                name="gstin"
                placeholder="22AAAAA0000A1Z5"
                maxLength={15}
                value={formData.gstin}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Your Company Pvt Ltd"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>Shop Name *</label>
              <input
                type="text"
                name="shopName"
                placeholder="Your Shop Name"
                required
                value={formData.shopName}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
              />
            </div>

            {/* Security Pin Field */}
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                Security Pin{" "}
                <span className={theme ? "text-gray-500 text-xs" : "text-gray-400 text-xs"}>
                  (set up your security pin for future login)
                </span>{" "}
                *
              </label>
              <input
                type="password"
                name="securityPin"
                placeholder="Enter 6-digit pin"
                maxLength={6}
                required
                value={formData.securityPin}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1 md:col-span-3">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>Shop Address *</label>
              <textarea
                name="shopAddress"
                placeholder="Enter complete shop address with pincode"
                rows={1}
                required
                value={formData.shopAddress}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 resize-none ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600 placeholder-gray-400"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400 placeholder-gray-400"
                }`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-2">
            <button
              type="submit"
              className={`w-full p-2.5 text-white font-semibold rounded-md transition-all ${
                submitSuccess
                  ? "bg-green-500"
                  : theme
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-purple-700 hover:bg-purple-800"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : submitSuccess
                ? "Profile Saved!"
                : "Save and Continue"}
            </button>
          </div>
        </form>
      </div>

      {/* Footer / Support */}
      <div className={`mt-2 text-center text-sm ${theme ? "text-gray-500" : "text-gray-400"}`}>
        Need help?{" "}
        <a href="#" className={`hover:underline ${theme ? "text-purple-600" : "text-purple-400"}`}>
          Contact support
        </a>
      </div>
    </div>
  );
};

export default UserProfile;