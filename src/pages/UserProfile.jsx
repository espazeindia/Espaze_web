import React, { useState, useRef } from "react";
import { useMode } from "../contexts/themeModeContext";
import EyeOpen from "../assets/img/eye-open.svg";
import EyeClosed from "../assets/img/eye-closed.svg";
import { notifyError, notifySuccess } from "../utils/toast";
import OnboardingServices from "../services/OnboardingServices";

const UserProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    sellerName: "",
    panNumber: "",
    gstin: "",
    companyName: "",
    shopName: "",
    blockNo: "",
    areaDistrict: "",
    state: "",
    pincode: "",
    securityPin: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { theme } = useMode();
  const [showSecurityPin, setShowSecurityPin] = useState(false);
  const fileInputRef = useRef();

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

    // if (name === "phoneNumber") {
    //   if (!/^\d*$/.test(value)) {
    //     notifyError("Phone number must contain digits only.");
    //     return;
    //   }
    //   if (value.length > 10) {
    //     notifyError("Phone number must be exactly 10 digits.");
    //     return;
    //   }
    // }

    if (name === "pincode") {
      if (!/^\d*$/.test(value)) {
        notifyError("Pincode must contain digits only.");
        return;
      }
      if (value.length > 6) {
        notifyError("Pincode must be exactly 6 digits.");
        return;
      }
    }

    if (name === "securityPin") {
      if (!/^\d*$/.test(value)) {
        notifyError("Security pin must contain digits only.");
        return;
      }
      if (value.length > 6) {
        notifyError("Security pin must be exactly 6 digits.");
        return;
      }
    }

    if (name === "panNumber") {
      if (!/^[A-Za-z0-9]*$/.test(value)) {
        notifyError("PAN must contain only alphabets and digits.");
        return;
      }
      setFormData({ ...formData, [name]: value.toUpperCase() });
      return;
    }

    if (name === "gstin") {
      if (!/^[A-Za-z0-9]*$/.test(value)) {
        notifyError("GSTIN must contain only alphabets and digits.");
        return;
      }
      if (value.length > 15) {
        notifyError("GSTIN must be exactly 15 characters.");
        return;
      }
      setFormData({ ...formData, [name]: value.toUpperCase() });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (
      !formData.sellerName ||
      !formData.panNumber ||
      !formData.shopName ||
      !formData.securityPin ||
      !formData.blockNo ||
      !formData.areaDistrict ||
      !formData.state ||
      !formData.pincode
    ) {
      notifyError("Please complete all required fields before submitting.");
      return;
    }
    if (formData.securityPin.length !== 6) {
      notifyError("Security pin must be exactly 6 digits.");
      return;
    }
    if (formData.pincode.length !== 6) {
      notifyError("Pincode must be exactly 6 digits.");
      return;
    }
    if (formData.panNumber.length !== 10) {
      notifyError("PAN must be exactly 10 characters.");
      return;
    }
    if (formData.gstin && formData.gstin.length !== 15) {
      notifyError("GSTIN must be exactly 15 characters.");
      return;
    }
    setIsSubmitting(true)
    try {
      const body = {
        name : formData.sellerName,
        address : formData.blockNo + ", "+ formData.areaDistrict + ", " + formData.state + ", " + formData.pincode,
        gstin : formData.gstin,
        pan: formData.panNumber,
        companyName : formData.companyName,
        shopName : formData.shopName,
        pin : Number(formData.securityPin)
      }
      const res = await OnboardingServices.OnboardingSeller(body)
      if(res.success === true){
        notifySuccess(res.message)
        setReload((prevData)=>{
          return !prevData
        })
      }
    } catch (error) {
      if (err === "cookie error") {
          Cookies.remove("EspazeCookie");
          notifyError("Cookie error, please relogin and try again");
        } else {
          notifyError(err?.response?.data?.message || err.message);
        }
      
    }
    setIsSubmitting(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-2 font-sans overflow-hidden ${theme
        ? "bg-white text-gray-800"
        : "bg-neutral-900 text-white"
        }`}
      style={{ height: "93vh" }}
    >
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className={`text-2xl font-bold mb-3 ${theme ? "text-gray-800" : "text-white"}`}>User Profile</h1>
        <p className={`text-sm ${theme ? "text-gray-500" : "text-gray-400"}`}>Complete your profile information</p>
      </div>

      {/* Form Card */}
      <div
        className={`rounded-xl p-4 shadow-md border w-full flex-grow-0 overflow-hidden ${theme ? "bg-white border-gray-200" : "bg-neutral-800 border-neutral-700"
          }`}
        style={{ maxWidth: "1100px" }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-2">
            <div className="relative">
              <div
                className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center cursor-pointer border-2 ${theme
                  ? "bg-gray-100 border-gray-200 hover:border-purple-600"
                  : "bg-neutral-900 border-neutral-700 hover:border-purple-400"
                  }`}
                onClick={() => fileInputRef.current.click()}
                tabIndex={0}
                role="button"
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
                ref={fileInputRef}
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
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${theme
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
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${theme
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
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${theme
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
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${theme
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
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${theme
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
              <div className="relative">
                <input
                  type={showSecurityPin ? "text" : "password"}
                  name="securityPin"
                  placeholder="Enter 6-digit pin"
                  maxLength={6}
                  required
                  value={formData.securityPin}
                  onChange={handleInputChange}
                  className={`p-1.5 pr-8 rounded-md text-sm w-full focus:outline-none focus:ring-2 placeholder-gray-400 ${theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowSecurityPin(!showSecurityPin)}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm leading-5"
                >
                  {showSecurityPin ? (
                    <img src={EyeOpen} className="h-4 w-4" alt="Show Pin" />
                  ) : (
                    <img src={EyeClosed} className="h-4 w-4" alt="Hide Pin" />
                  )}
                </button>
              </div>
            </div>

            {/* Shop Address Fields */}
            <div className="flex flex-col gap-1 md:col-span-3">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>Shop Address *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="blockNo"
                    placeholder="Block no / Locality"
                    required
                    value={formData.blockNo}
                    onChange={handleInputChange}
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${theme
                      ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                      : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                      }`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="areaDistrict"
                    placeholder="Area / District"
                    required
                    value={formData.areaDistrict}
                    onChange={handleInputChange}
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${theme
                      ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                      : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                      }`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${theme
                      ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                      : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                      }`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${theme
                      ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                      : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                      }`}
                    maxLength={6}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-2">
            <button
              type="submit"
              className={`w-full p-2.5 text-white font-semibold rounded-md transition-all ${theme
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-purple-700 hover:bg-purple-800"
                }`}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                  : "Save and Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;