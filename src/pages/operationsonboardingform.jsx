import React, { useState } from "react";
import { notifySuccess, notifyError } from "../utils/toast";

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

  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // ✅ Password Validation
  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*]/;

    if (!minLength.test(password)) return "Password must be at least 8 characters long.";
    if (!uppercase.test(password)) return "Password must include at least one uppercase letter.";
    if (!lowercase.test(password)) return "Password must include at least one lowercase letter.";
    if (!number.test(password)) return "Password must include at least one number.";
    if (!specialChar.test(password)) return "Password must include at least one special character (!@#$%^&*).";
    return "";
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "password") {
      setPasswordError(validatePassword(value));
    }
  };

  // ✅ Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const pwdError = validatePassword(formData.password);
    if (pwdError) {
      setPasswordError(pwdError);
      notifyError(pwdError);
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      notifyError("Phone number must be 10 digits.");
      return;
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan.toUpperCase())) {
      notifyError("Invalid PAN format (ABCDE1234F).");
      return;
    }

    if (!formData.warehouse) {
      notifyError("Please select a warehouse.");
      return;
    }

    console.log("Form Submitted: ", formData);
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
    setPasswordError("");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 px-2">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          Operations Onboarding
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Complete your profile information
        </p>

        {/* Profile Picture Upload */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 overflow-hidden">
          {/* Name, Phone, PAN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={10}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PAN Number
              </label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                maxLength={10}
                required
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 uppercase w-full"
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email ID
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`px-3 py-2 rounded-lg border w-full focus:ring-2 focus:ring-purple-400 ${
                  passwordError ? "border-red-500" : "border-gray-300"
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
              {passwordError && (
                <p className="text-xs text-red-600 mt-1">{passwordError}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flat / House No.
              </label>
              <input
                type="text"
                name="flatNo"
                value={formData.flatNo}
                onChange={handleChange}
                required
                placeholder="E.g. A-102"
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Block / Street
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pin Code
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                maxLength={6}
                required
                placeholder="E.g. 110001"
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
              />
            </div>
          </div>

          {/* Warehouse Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Warehouse
            </label>
            <select
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 bg-white select-with-chevron"
            >
              <option value="">Select Warehouse</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
              <option value="Warehouse C">Warehouse C</option>
            </select>
          </div>

          {/* Submit Button */}
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
