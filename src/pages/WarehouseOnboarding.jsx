import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { notifyError, notifySuccess } from "../utils/toast";
import { motion } from "framer-motion";
import { useMode } from "../contexts/themeModeContext";

const useFormData = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  return { formData, setFormData };
};

const AddWarehouse = () => {
  const navigate = useNavigate();
  const { theme } = useMode();

  const initialFormData = {
    ownerName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    warehouseName: "",
    warehouseAddress1: "",
    warehouseAddress2: "",
    warehouseAddress3: "",
    warehouseSize: "",
    leaseFileName: "",
  };

  const { formData, setFormData } = useFormData(initialFormData);
  const [status, setStatus] = useState("idle");

  const handleChange = useCallback(
    (e) => {
      if (status !== "idle") return;
      const { name, value, files } = e.target;
      if (name === "leaseFile") {
        const file = files && files[0];
        setFormData((s) => ({ ...s, leaseFileName: file ? file.name : "" }));
        return;
      }
      if (name === "phoneNumber" && value && !/^\d*$/.test(value)) {
        notifyError("Phone number must contain digits only.");
        return;
      }
      if (name === "phoneNumber" && value.length > 10) {
        notifyError("Phone number must be exactly 10 digits.");
        return;
      }
      if (
        (name === "addressLine3" || name === "warehouseAddress3") &&
        value &&
        !/^\d*$/.test(value)
      ) {
        notifyError("Pincode must contain digits only.");
        return;
      }
      if ((name === "addressLine3" || name === "warehouseAddress3") && value.length > 6) {
        notifyError("Pincode must be exactly 6 digits.");
        return;
      }
      if (name === "warehouseSize" && value && !/^\d*$/.test(value)) {
        notifyError("Warehouse size must contain digits only.");
        return;
      }
      if (
        (name === "ownerName" || name === "warehouseName") &&
        value &&
        !/^[A-Za-z\s]*$/.test(value)
      ) {
        notifyError("Name can only contain letters and spaces.");
        return;
      }
      setFormData((s) => ({ ...s, [name]: value }));
    },
    [status, setFormData]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (
        !formData.ownerName.trim() ||
        !formData.phoneNumber.trim() ||
        !formData.addressLine1.trim() ||
        !formData.addressLine2.trim() ||
        !formData.addressLine3.trim() ||
        !formData.warehouseName.trim() ||
        !formData.warehouseAddress1.trim() ||
        !formData.warehouseAddress2.trim() ||
        !formData.warehouseAddress3.trim() ||
        !formData.warehouseSize.trim() ||
        !formData.leaseFileName.trim()
      ) {
        notifyError("Please complete all required fields before submitting.");
        return;
      }
      if (formData.phoneNumber.length !== 10) {
        notifyError("Phone number must be exactly 10 digits.");
        return;
      }
      if (formData.addressLine3.length !== 6) {
        notifyError("Owner pincode must be exactly 6 digits.");
        return;
      }
      if (formData.warehouseAddress3.length !== 6) {
        notifyError("Warehouse pincode must be exactly 6 digits.");
        return;
      }
      if (parseInt(formData.warehouseSize, 10) <= 0) {
        notifyError("Warehouse size must be greater than 0.");
        return;
      }

      setStatus("saving");
      setTimeout(() => {
        setStatus("success");
        notifySuccess("Warehouse details saved successfully!");
        setTimeout(() => navigate("/dashboard"), 900);
      }, 1000);
    },
    [formData, navigate]
  );

  const btnBase =
    "w-full rounded-lg px-6 py-3 text-white font-semibold transition flex items-center justify-center gap-2";
  const btnStateClass =
    status === "idle"
      ? "bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300"
      : status === "saving"
        ? "bg-green-600 opacity-80 cursor-wait"
        : "bg-green-600";

  const disabled = status !== "idle";

  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-colors duration-150 ${theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
        }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center hover:opacity-80 transition"
          aria-label="Back to dashboard"
          disabled={disabled}
        >
          <ArrowLeft
            size={24}
            className={`${theme ? "text-black" : "text-white"}`}
          />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold">Add Warehouse</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        aria-busy={status !== "idle"}
        className={`w-full border rounded-xl shadow-sm p-4 md:p-6 transition-colors duration-150 ${theme
            ? "bg-white border-gray-200 text-black"
            : "bg-neutral-900 border-neutral-800 text-white"
          }`}
      >


        {/* Owner Details */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-4">Owner Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Owner Name */}
            <div>
              <label className="block text-sm font-medium">Owner Name *</label>
              <input
                type="text"
                name="ownerName"
                placeholder="Enter your full name"
                value={formData.ownerName}
                onChange={handleChange}
                disabled={disabled}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${theme ? "bg-white border-gray-300 text-black focus:ring-purple-500" : "bg-neutral-800 border-neutral-700 text-white focus:ring-purple-400"}`}
                required
                inputMode="text"
                pattern="[A-Za-z\s]+"
                title="Only alphabetical letters and spaces allowed"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium">Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="9876543210"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={disabled}
                 className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${theme ? "bg-white border-gray-300 text-black focus:ring-purple-500" : "bg-neutral-800 border-neutral-700 text-white focus:ring-purple-400"}`}
                required
                inputMode="numeric"
                maxLength={10}
                minLength={10}
                pattern="[6-9][0-9]{9}"
                title="Enter a 10-digit phone number starting with 6, 7, 8, or 9"
              />
            </div>

            {/* Address Line 1 */}
            <div>
              <label className="block text-sm font-medium">Address Line 1 *</label>
              <input
                type="text"
                name="addressLine1"
                placeholder="Block no / Locality"
                value={formData.addressLine1}
                onChange={handleChange}
                disabled={disabled}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${theme ? "bg-white border-gray-300 text-black focus:ring-purple-500" : "bg-neutral-800 border-neutral-700 text-white focus:ring-purple-400"}`}
                required
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="block text-sm font-medium">Address Line 2 *</label>
              <input
                type="text"
                name="addressLine2"
                placeholder="State / District"
                value={formData.addressLine2}
                onChange={handleChange}
                disabled={disabled}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${theme ? "bg-white border-gray-300 text-black focus:ring-purple-500" : "bg-neutral-800 border-neutral-700 text-white focus:ring-purple-400"}`}
                required
              />
            </div>

            {/* Owner Pincode */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Pincode *</label>
              <input
                type="tel"
                name="addressLine3"
                placeholder="6-digit PIN code"
                value={formData.addressLine3}
                onChange={handleChange}
                disabled={disabled}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${theme ? "bg-white border-gray-300 text-black focus:ring-purple-500" : "bg-neutral-800 border-neutral-700 text-white focus:ring-purple-400"}`}
                required
                inputMode="numeric"
                maxLength={6}
                minLength={6}
                pattern="[1-9][0-9]{5}"
                title="Enter a 6-digit PIN code (cannot start with 0)"
              />
            </div>
          </div>
        </div>

        {/* Warehouse Details */}
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-4">Warehouse Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Warehouse Name */}
            <div>
              <label className="block text-sm font-medium">Warehouse Name *</label>
              <input
                type="text"
                name="warehouseName"
                placeholder="Enter name"
                value={formData.warehouseName}
                onChange={handleChange}
                disabled={disabled}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${theme ? "bg-white border-gray-300 text-black focus:ring-purple-500" : "bg-neutral-800 border-neutral-700 text-white focus:ring-purple-400"}`}
                required
                inputMode="text"
                pattern="[A-Za-z\s]+"
                title="Only alphabetical letters and spaces allowed"
              />
            </div>

            {/* Warehouse Size */}
            <div>
              <label className="block text-sm font-medium">Warehouse Size (sq ft) *</label>
              <input
                type="text"
                name="warehouseSize"
                placeholder="e.g. 2500"
                value={formData.warehouseSize}
                onChange={handleChange}
                disabled={disabled}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${theme ? "bg-white border-gray-300 text-black focus:ring-purple-500" : "bg-neutral-800 border-neutral-700 text-white focus:ring-purple-400"}`}
                required
                inputMode="numeric"
                pattern="[1-9][0-9]*"
                title="Enter a valid number greater than 0"
              />
            </div>

            {/* Lease PDF */}
            <div>
              <label className="block text-sm font-medium">Lease Details (PDF) *</label>
              <input
                type="file"
                name="leaseFile"
                accept="application/pdf"
                onChange={handleChange}
                disabled={disabled}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${theme ? "bg-white border-gray-300 text-black focus:ring-purple-500" : "bg-neutral-800 border-neutral-700 text-white focus:ring-purple-400"}`}
                required
              />
              {formData.leaseFileName && (
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                  Selected: {formData.leaseFileName}
                </p>
              )}
            </div>

            {/* Warehouse Address 1 */}
            <div>
              <label className="block text-sm font-medium">Warehouse Address Line 1 *</label>
              <input
                type="text"
                name="warehouseAddress1"
                placeholder="Flat/House No."
                value={formData.warehouseAddress1}
                onChange={handleChange}
                disabled={disabled}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${theme ? "bg-white border-gray-300 text-black focus:ring-purple-500" : "bg-neutral-800 border-neutral-700 text-white focus:ring-purple-400"}`}
                required
              />
            </div>

            {/* Warehouse Address 2 */}
            <div>
              <label className="block text-sm font-medium">Address Line 2 *</label>
              <input
                type="text"
                name="warehouseAddress2"
                placeholder="State / District"
                value={formData.warehouseAddress2}
                onChange={handleChange}
                disabled={disabled}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${theme ? "bg-white border-gray-300 text-black focus:ring-purple-500" : "bg-neutral-800 border-neutral-700 text-white focus:ring-purple-400"}`}
                required
              />
            </div>

            {/* Warehouse Pincode */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Pincode *</label>
              <input
                type="tel"
                name="warehouseAddress3"
                placeholder="6-digit PIN code"
                value={formData.warehouseAddress3}
                onChange={handleChange}
                disabled={disabled}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none transition-colors duration-200 ${theme ? "bg-white border-gray-300 text-black focus:ring-purple-500" : "bg-neutral-800 border-neutral-700 text-white focus:ring-purple-400"}`}
                required
                inputMode="numeric"
                maxLength={6}
                minLength={6}
                pattern="[1-9][0-9]{5}"
                title="Enter a 6-digit PIN code (cannot start with 0)"
              />
            </div>
          </div>
        </div>

        {/* Save and Continue */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={disabled}
            className={`${btnBase} ${btnStateClass}`}
            title={
              status === "idle" ? "Save and Continue" : status === "saving" ? "Saving..." : "Saved"
            }
            aria-live="polite"
          >
            {status === "saving" && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {status === "success" && (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>
              {status === "idle"
                ? "Save and Continue"
                : status === "saving"
                  ? "Saving..."
                  : "Saved"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWarehouse;
