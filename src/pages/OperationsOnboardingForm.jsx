import React, { useState } from "react";
import { notifySuccess, notifyError } from "../utils/toast";
import { useMode } from "../contexts/themeModeContext";

const OperationsOnboardingForm = () => {
  const { theme } = useMode();

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

    if (name === "pan") updatedValue = value.toUpperCase();

    setFormData({ ...formData, [name]: updatedValue });

    const errorMsg = validateField(name, updatedValue);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    if (errorMsg) notifyError(errorMsg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key === "profilePic") return;
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      notifyError("Please fix the errors before submitting");
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
    setErrors({});
  };

  const inputClass = (error) =>
    `mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${
      theme
        ? `bg-white text-black border-gray-300 focus:ring-purple-500 ${error ? "border-red-500" : ""}`
        : `bg-neutral-800 text-white border-neutral-700 focus:ring-purple-400 ${error ? "border-red-500" : ""}`
    }`;

  const selectClass = (error) =>
    `mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none transition-colors duration-200 ${
      theme
        ? `bg-white text-black border-gray-300 focus:ring-purple-500 ${error ? "border-red-500" : ""}`
        : `bg-neutral-800 text-white border-neutral-700 focus:ring-purple-400 ${error ? "border-red-500" : ""}`
    }`;

  const hintBoxClass = `absolute top-full left-0 mt-1 w-full rounded-lg p-2 text-xs shadow-lg z-10 ${
    theme ? "bg-white text-gray-800 border border-gray-200" : "bg-neutral-800 text-white border-neutral-700"
  }`;

  const buttonClass = `w-full font-semibold py-2 rounded-lg shadow-md transition-colors duration-200 ${
    theme ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-purple-700 hover:bg-purple-600 text-white"
  }`;

  return (
    <div className={`min-h-screen p-4 md:p-6 transition-colors duration-150 ${theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"}`}>
      <div className={`w-full max-w-4xl mx-auto p-6 rounded-xl shadow-md transition-colors duration-150 ${theme ? "bg-white text-black border border-gray-200" : "bg-neutral-900 text-white border-neutral-800"}`}>
        <h2 className="text-2xl font-bold text-center mb-1">Operations Onboarding</h2>
        <p className={`text-center mb-6 ${theme ? "text-gray-500" : "text-gray-300"}`}>Complete your profile information</p>

        {/* Profile Pic */}
        <div className="flex justify-center mb-6">
          <label className={`w-24 h-24 rounded-full flex items-center justify-center border-2 border-dashed cursor-pointer overflow-hidden hover:border-purple-500 transition ${
            theme ? "bg-gray-100 border-gray-400" : "bg-gray-700 border-gray-600"
          }`}>
            {formData.profilePic ? (
              <img src={URL.createObjectURL(formData.profilePic)} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl text-gray-400">+</span>
            )}
            <input type="file" name="profilePic" accept="image/*" onChange={handleChange} className="hidden" />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 overflow-hidden">
          {/* Name, Phone, PAN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" className={inputClass(errors.name)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit number" maxLength={10} className={inputClass(errors.phone)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">PAN Number</label>
              <input type="text" name="pan" value={formData.pan} onChange={handleChange} placeholder="ABCDE1234F" maxLength={10} className={inputClass(errors.pan) + " uppercase"} />
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email ID</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="user@example.com" className={inputClass(errors.email)} />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass(errors.password)}
                onFocus={() => setShowPasswordHint(true)}
                onBlur={() => setShowPasswordHint(false)}
              />
              {showPasswordHint && (
                <div className={hintBoxClass}>
                  <p className="font-semibold mb-1">Password must include:</p>
                  <ul className="list-disc pl-4 space-y-0.5">
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
              <label className="block text-sm font-medium mb-1">Flat / House No.</label>
              <input type="text" name="flatNo" value={formData.flatNo} onChange={handleChange} placeholder="E.g. A-102" className={inputClass(errors.flatNo)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Block / Street</label>
              <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="E.g. MG Road" className={inputClass(errors.street)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pin Code</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} maxLength={6} placeholder="E.g. 110001" className={inputClass(errors.pincode)} />
            </div>
          </div>

          {/* Warehouse */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Warehouse</label>
            <select name="warehouse" value={formData.warehouse} onChange={handleChange} className={selectClass(errors.warehouse)}>
              <option value="">Select Warehouse</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
              <option value="Warehouse C">Warehouse C</option>
            </select>
          </div>

          <button type="submit" className={buttonClass}>
            Save and Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default OperationsOnboardingForm;
