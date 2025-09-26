import React, { useState, useRef, useEffect } from "react";
import { useMode } from "../contexts/themeModeContext";
import EyeOpen from "../assets/img/eye-open.svg";
import EyeClosed from "../assets/img/eye-closed.svg";
import { notifyError, notifySuccess } from "../utils/toast";
import OnboardingServices from "../services/OnboardingServices";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { setReload, isOnboarded, loading } = useUser();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    sellerName: "",
    panNumber: "",
    gstin: "",
    companyName: "",
    blockNo: "",
    areaDistrict: "",
    state: "",
    pincode: "",
    securityPin: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useMode();
  const [showSecurityPin, setShowSecurityPin] = useState(false);
  const fileInputRef = useRef();

  const handleLogout = () => {
    Cookies.remove("EspazeCookie", { sameSite: "None", secure: true });
    setReload((prevData) => !prevData);
    navigate(false);
  };

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const res = await OnboardingServices.GetSellerDetails();

        if (res && res.success === true && res.data) {
          const { name, pan, gstin, companyName, address, pin } = res.data;

          setFormData({
            sellerName: name || "",
            panNumber: pan || "",
            gstin: gstin || "",
            companyName: companyName || "",
            blockNo: address?.split("&%$#")[0] || "",
            areaDistrict: address?.split("&%$#")[1] || "",
            state: address?.split("&%$#")[2] || "",
            pincode: address?.split("&%$#")[3] || "",
            securityPin: pin || "",
          });
        } else {
          notifyError(res?.message || "Failed to fetch seller details");
        }
      } catch (error) {
        notifyError(error?.message || "Failed to fetch seller details");
      }
    };
    if (!loading && isOnboarded) {
      fetchSellerDetails();
    }
  }, [isOnboarded, loading]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const PINCODE_REGEX = /^\d*$/;
  const PAN_REGEX = /^[A-Za-z0-9]*$/;
  const GSTIN_REGEX = /^[A-Za-z0-9]*$/;

  const validateField = (name, value) => {
    if (name === "pincode" || name === "securityPin") {
      if (!PINCODE_REGEX.test(value)) {
        return `${name === "pincode" ? "Pincode" : "Security pin"} must contain digits only.`;
      }
      if (value.length > 6) {
        return `${name === "pincode" ? "Pincode" : "Security pin"} must be exactly 6 digits.`;
      }
    }

    if (name === "panNumber") {
      if (!PAN_REGEX.test(value)) {
        return "PAN must contain only alphabets and digits.";
      }
    }

    if (name === "gstin") {
      if (!GSTIN_REGEX.test(value)) {
        return "GSTIN must contain only alphabets and digits.";
      }
      if (value.length > 15) {
        return "GSTIN must be exactly 15 characters.";
      }
    }

    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const validationError = validateField(name, value);

    if (validationError) {
      notifyError(validationError);
      return;
    }

    let processedValue = value;
    if (name === "panNumber" || name === "gstin") {
      processedValue = value.toUpperCase();
    }

    setFormData({ ...formData, [name]: processedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { sellerName, panNumber, securityPin, blockNo, areaDistrict, state, pincode } = formData;

    if (
      !sellerName ||
      !panNumber ||
      !securityPin ||
      !blockNo ||
      !areaDistrict ||
      !state ||
      !pincode
    ) {
      notifyError("Please complete all required fields before submitting.");
      return;
    }

    const securityPinError = validateField("securityPin", securityPin);
    const pincodeError = validateField("pincode", pincode);
    const panNumberError = validateField("panNumber", panNumber);
    const gstinError = validateField("gstin", formData.gstin);

    if (securityPinError || pincodeError || panNumberError || gstinError) {
      notifyError(securityPinError || pincodeError || panNumberError || gstinError);
      return;
    }

    setIsSubmitting(true);
    try {
      const address = [blockNo, areaDistrict, state, pincode].filter(Boolean).join("&%$#");

      const body = {
        name: sellerName,
        address: address,
        gstin: formData.gstin,
        pan: panNumber,
        companyName: formData.companyName,
        pin: Number(securityPin),
      };
      const res = await OnboardingServices.OnboardingSeller(body);
      if (res.success === true) {
        Cookies.set("EspazeCookie", res.token);
        notifySuccess(res.message);
      } else {
        notifyError(res.message || "Failed to save seller details");
      }
    } catch (error) {
      notifyError(error?.response?.data?.message || error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-2 font-sans overflow-hidden ${
        theme ? "bg-white text-gray-800" : "bg-neutral-900 text-white"
      }`}
      style={{ height: "93vh" }}
    >
      {!isOnboarded && (
        <button className=" cursor-pointer ml-20 mr-auto" onClick={handleLogout}>
          <ArrowBack />
        </button>
      )}
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className={`text-2xl font-bold mb-3 ${theme ? "text-gray-800" : "text-white"}`}>
          User Profile
        </h1>
        <p className={`text-sm ${theme ? "text-gray-500" : "text-gray-400"}`}>
          Complete your profile information
        </p>
      </div>

      {/* Form Card */}
      <div
        className={`rounded-xl p-4 shadow-md border w-full flex-grow-0 overflow-hidden ${
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
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${
                      theme ? "text-gray-500" : "text-gray-400"
                    }`}
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
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                Seller Name *
              </label>
              <input
                type="text"
                name="sellerName"
                placeholder="Enter your full name"
                required
                value={formData.sellerName}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                PAN Number *
              </label>
              <input
                type="text"
                name="panNumber"
                placeholder="ABCDE1234F"
                maxLength={10}
                required
                value={formData.panNumber}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                GSTIN
              </label>
              <input
                type="text"
                name="gstin"
                placeholder="22AAAAA0000A1Z5"
                maxLength={15}
                value={formData.gstin}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Your Company Pvt Ltd"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${
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
              <div className="relative">
                <input
                  type={showSecurityPin ? "text" : "password"}
                  name="securityPin"
                  placeholder="Enter 6-digit pin"
                  maxLength={6}
                  required
                  value={formData.securityPin}
                  onChange={handleInputChange}
                  className={`p-1.5 pr-8 rounded-md text-sm w-full focus:outline-none focus:ring-2 placeholder-gray-400 ${
                    theme
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

            {/* Address Fields */}
            <div className="flex flex-col gap-1 md:col-span-3">
              <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                Your Address *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="blockNo"
                    placeholder="Block no / Locality"
                    required
                    value={formData.blockNo}
                    onChange={handleInputChange}
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${
                      theme
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
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${
                      theme
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
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${
                      theme
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
                    className={`p-1.5 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 ${
                      theme
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
              className={`w-full p-2.5 text-white font-semibold rounded-md transition-all ${
                theme ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-700 hover:bg-purple-800"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Save and Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
