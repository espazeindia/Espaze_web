import React, { useState } from "react";
import { notifySuccess, notifyError } from "../utils/toast";
import OperationsOnboardingService from "../services/OperationsOnbaording"; 

const OperationsOnboardingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    flatNo: "",
    street: "",
    pincode: "",
    pan: "",
    password: "",
    warehouse: "",
    profilePic: null,
  });

  const [errors, setErrors] = useState({});
  const [showPasswordHint, setShowPasswordHint] = useState(false);

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*]/;

    if (!minLength.test(password)) return "At least 8 characters";
    if (!uppercase.test(password)) return "Include 1 uppercase letter";
    if (!lowercase.test(password)) return "Include 1 lowercase letter";
    if (!number.test(password)) return "Include 1 number";
    if (!specialChar.test(password)) return "Include 1 special character (!@#$%^&*)";
    return "";
  };

  const validateField = (name, value) => {
    if (!value && name !== "profilePic") return `${name} is required`;

    switch (name) {
      case "name":
        if (!/^[A-Za-z\s]+$/.test(value)) return "Name can contain only letters and spaces";
        return "";
      case "phone":
        if (!/^[0-9]{10}$/.test(value)) return "Phone must be 10 digits";
        return "";
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Enter a valid email (e.g., user@example.com)";
        return "";
      case "pincode":
        if (!/^[0-9]{6}$/.test(value)) return "Pin code must be 6 digits";
        return "";
      case "pan":
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.toUpperCase()))
          return "PAN must be like ABCDE1234F";
        return "";
      case "password":
        return validatePassword(value);
      case "warehouse":
        if (!value) return "Please select a warehouse";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let updatedValue = value;

    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
      return;
    }

    if (name === "pan") {
      updatedValue = value.toUpperCase();
    }

    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key === "profilePic") return;
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Show notification for each error field
      Object.entries(newErrors).forEach(([field, errorMsg]) => {
        notifyError(`${field}: ${errorMsg}`);
      });
      notifyError("Please fix the errors before submitting");
      return;
    }

    const payload = { ...formData };
    let apiPayload = payload;
    if (formData.profilePic) {
      apiPayload = new FormData();
      Object.keys(payload).forEach((key) => {
        apiPayload.append(key, payload[key]);
      });
    }

    try {
      await OperationsOnboardingService.OperationsOnboardingForm(apiPayload);
      notifySuccess("✅ Operation Onboarding Successful!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        flatNo: "",
        street: "",
        pincode: "",
        pan: "",
        password: "",
        warehouse: "",
        profilePic: null,
      });
      setErrors({});
    } catch (error) {
      notifyError(
        error?.response?.data?.message ||
          "Failed to submit. Please try again."
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-2">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          Operations Onboarding
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Complete your profile information
        </p>

        {/* Profile Pic */}
        <div className="flex justify-center mb-6">
          <label className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-400 cursor-pointer overflow-hidden hover:border-purple-500 transition">
            {formData.profilePic ? (
              <img
                src={URL.createObjectURL(formData.profilePic)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl text-gray-400">+</span>
            )}
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 overflow-hidden">
          {/* Name, Phone, PAN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={`px-3 py-2 rounded-lg border w-full focus:ring-2 focus:ring-purple-400 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit number"
                maxLength={10}
                className={`px-3 py-2 rounded-lg border w-full focus:ring-2 focus:ring-purple-400 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                placeholder="ABCDE1234F"
                maxLength={10}
                className={`px-3 py-2 rounded-lg border w-full focus:ring-2 focus:ring-purple-400 uppercase ${
                  errors.pan ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@example.com"
                className={`px-3 py-2 rounded-lg border w-full focus:ring-2 focus:ring-purple-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`px-3 py-2 rounded-lg border w-full focus:ring-2 focus:ring-purple-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                onFocus={() => setShowPasswordHint(true)}
                onBlur={() => setShowPasswordHint(false)}
              />
              {showPasswordHint && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg p-2 text-xs text-gray-700 shadow-lg z-10">
                  <p className="font-semibold mb-1">Password must include:</p>
                  <ul className="list-disc pl-4 space-y-0.5 text-gray-600">
                    <li>At least 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                    <li>One special character (!@#$%^&*)</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flat / House No.</label>
              <input
                type="text"
                name="flatNo"
                value={formData.flatNo}
                onChange={handleChange}
                placeholder="E.g. A-102"
                className={`px-3 py-2 rounded-lg border w-full focus:ring-2 focus:ring-purple-400 ${
                  errors.flatNo ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Block / Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="E.g. MG Road"
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pin Code</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                maxLength={6}
                placeholder="E.g. 110001"
                className={`px-3 py-2 rounded-lg border w-full focus:ring-2 focus:ring-purple-400 ${
                  errors.pincode ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          {/* Warehouse */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Warehouse</label>
            <select
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-400 bg-white select-with-chevron ${
                errors.warehouse ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Warehouse</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
              <option value="Warehouse C">Warehouse C</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Save and Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default OperationsOnboardingForm;