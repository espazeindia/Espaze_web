import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddWarehouse = () => {
  const navigate = useNavigate();

  // Form data (UI-only)
  const [formData, setFormData] = useState({
    ownerName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "", // Owner PIN
    warehouseName: "",
    warehouseAddress1: "",
    warehouseAddress2: "",
    warehouseAddress3: "", // Warehouse PIN
    warehouseSize: "",
    leaseFileName: "",
  });

  // Per-field error messages
  const [errors, setErrors] = useState({
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
    leaseFile: "",
  });

  // Submit status: idle | saving | success
  const [status, setStatus] = useState("idle");

  const setError = (field, message) =>
    setErrors((e) => ({ ...e, [field]: message }));

  // Single-field validator
  const validateField = (name, value) => {
    switch (name) {
      case "ownerName":
      case "warehouseName": {
        if (!value.trim()) return "This field is required.";
        if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Only alphabetical letters and spaces allowed.";
        }
        return "";
      }
      case "phoneNumber": {
        if (!value.trim()) return "This field is required.";
        if (!/^\d{0,10}$/.test(value)) return "Digits only (0–9).";
        if (value.length !== 10) return "Enter a 10-digit phone number.";
        return "";
      }
      case "addressLine1":
      case "addressLine2":
      case "warehouseAddress1":
      case "warehouseAddress2": {
        if (!value.trim()) return "This field is required.";
        return "";
      }
      case "addressLine3":
      case "warehouseAddress3": {
        if (!value.trim()) return "This field is required.";
        if (!/^\d+$/.test(value)) return "Digits only (0–9).";
        if (value.length !== 6) return "Enter a 6-digit PIN code.";
        return "";
      }
      case "warehouseSize": {
        if (!value.trim()) return "This field is required.";
        if (!/^\d+$/.test(value)) return "Enter a valid number (digits only).";
        return "";
      }
      case "leaseFile": {
        if (!value) return "Please upload your lease document (PDF).";
        if (!(value.type === "application/pdf" || /\.pdf$/i.test(value.name || ""))) {
          return "Unsupported file type. Upload a PDF document.";
        }
        return "";
      }
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    if (status !== "idle") return; // lock form while saving/saved

    const { name, value, files } = e.target;

    if (name === "leaseFile") {
      const file = files && files[0];
      const msg = validateField("leaseFile", file || null);
      setError("leaseFile", msg);
      setFormData((s) => ({ ...s, leaseFileName: file ? file.name : "" }));
      return;
    }

    setFormData((s) => ({ ...s, [name]: value }));
    const msg = validateField(name, value);
    setError(name, msg);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const msg = validateField(name, formData[name]);
    setError(name, msg);
  };

  // Overall validity: no errors + all required fields non-empty
  const isValid = useMemo(() => {
    const requiredFilled =
      formData.ownerName.trim() &&
      formData.phoneNumber.trim() &&
      formData.addressLine1.trim() &&
      formData.addressLine2.trim() &&
      formData.addressLine3.trim() &&
      formData.warehouseName.trim() &&
      formData.warehouseAddress1.trim() &&
      formData.warehouseAddress2.trim() &&
      formData.warehouseAddress3.trim() &&
      formData.warehouseSize.trim() &&
      formData.leaseFileName.trim();

    const noErrors = Object.values(errors).every((m) => !m);
    return Boolean(requiredFilled && noErrors);
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final pass: validate everything and show first error
    const nextErrors = { ...errors };
    Object.entries(formData).forEach(([field, val]) => {
      if (field === "leaseFileName") return;
      nextErrors[field] = validateField(field, val);
    });
    nextErrors.leaseFile = formData.leaseFileName
      ? ""
      : "Please upload your lease document (PDF).";
    setErrors(nextErrors);

    const firstError = Object.entries(nextErrors).find(([, msg]) => msg);
    if (firstError) {
      const [field] = firstError;
      const el = document.querySelector(`[name="${field}"]`);
      if (el?.scrollIntoView)
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Simulate save → turn button green & fade, then success, then navigate
    setStatus("saving");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => navigate("/dashboard"), 900);
    }, 1000);
  };

  const btnBase =
    "w-full rounded-lg px-6 py-3 text-white font-semibold transition flex items-center justify-center gap-2";
  const btnStateClass =
    status === "idle"
      ? isValid
        ? "bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300"
        : "bg-purple-300 cursor-not-allowed"
      : status === "saving"
      ? "bg-green-600 opacity-80 cursor-wait"
      : "bg-green-600";

  const disabled = status !== "idle" || !isValid;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header row */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center hover:opacity-80 transition"
          aria-label="Back to dashboard"
          disabled={status !== "idle"}
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Add Warehouse
        </h1>
      </div>

      {/* Full-width content */}
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={status !== "idle"}
        className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6"
      >
        {/* Owner Details */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            Owner Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Owner Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Owner Name *
              </label>
              <input
                type="text"
                name="ownerName"
                placeholder="Enter your full name"
                value={formData.ownerName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status !== "idle"}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none ${
                  errors.ownerName
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-500"
                }`}
                required
                inputMode="text"
                pattern="[A-Za-z\s]+"
              />
              {errors.ownerName && (
                <p className="mt-1 text-xs text-red-600">{errors.ownerName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="9876543210"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status !== "idle"}
                className={`mt-1 h-10 w-full rounded-lg border px-3 focus:outline-none ${
                  errors.phoneNumber
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-500"
                }`}
                required
                inputMode="numeric"
                maxLength={10}
                pattern="\d{10}"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Address Line 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address Line 1 *
              </label>
              <input
                type="text"
                name="addressLine1"
                placeholder="Block no / Locality"
                value={formData.addressLine1}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status !== "idle"}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none ${
                  errors.addressLine1
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-500"
                }`}
                required
              />
              {errors.addressLine1 && (
                <p className="mt-1 text-xs text-red-600">{errors.addressLine1}</p>
              )}
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address Line 2 *
              </label>
              <input
                type="text"
                name="addressLine2"
                placeholder="State / District"
                value={formData.addressLine2}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status !== "idle"}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none ${
                  errors.addressLine2
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-500"
                }`}
                required
              />
              {errors.addressLine2 && (
                <p className="mt-1 text-xs text-red-600">{errors.addressLine2}</p>
              )}
            </div>

            {/* Owner Pincode */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Pincode *
              </label>
              <input
                type="text"
                name="addressLine3"
                placeholder="6-digit PIN code"
                value={formData.addressLine3}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status !== "idle"}
                className={`mt-1 h-10 w-full md:w-auto md:max-w-[200px] rounded-lg border px-3 focus:outline-none ${
                  errors.addressLine3
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-500"
                }`}
                required
                inputMode="numeric"
                maxLength={6}
                pattern="\d{6}"
              />
              {errors.addressLine3 && (
                <p className="mt-1 text-xs text-red-600">{errors.addressLine3}</p>
              )}
            </div>
          </div>
        </div>

        {/* Warehouse Details */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            Warehouse Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Warehouse Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Warehouse Name *
              </label>
              <input
                type="text"
                name="warehouseName"
                placeholder="Enter name"
                value={formData.warehouseName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status !== "idle"}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none ${
                  errors.warehouseName
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-500"
                }`}
                required
                inputMode="text"
                pattern="[A-Za-z\s]+"
              />
              {errors.warehouseName && (
                <p className="mt-1 text-xs text-red-600">{errors.warehouseName}</p>
              )}
            </div>

            {/* Warehouse Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Warehouse Size (sq ft) *
              </label>
              <input
                type="text"
                name="warehouseSize"
                placeholder="e.g. 2500"
                value={formData.warehouseSize}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status !== "idle"}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none ${
                  errors.warehouseSize
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-500"
                }`}
                required
                inputMode="numeric"
              />
              {errors.warehouseSize && (
                <p className="mt-1 text-xs text-red-600">{errors.warehouseSize}</p>
              )}
            </div>

            {/* Lease PDF */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lease Details (PDF) *
              </label>
              <input
                type="file"
                name="leaseFile"
                accept="application/pdf"
                onChange={handleChange}
                onBlur={(e) => {
                  const file = e.target.files && e.target.files[0];
                  const msg = validateField("leaseFile", file || null);
                  setError("leaseFile", msg);
                }}
                disabled={status !== "idle"}
                className={`mt-1 w-full h-10 rounded-lg border px-3 py-2 focus:outline-none ${
                  errors.leaseFile
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-500"
                }`}
                required
              />
              {formData.leaseFileName && !errors.leaseFile && (
                <p className="text-xs text-gray-500 mt-1">
                  Selected: {formData.leaseFileName}
                </p>
              )}
              {errors.leaseFile && (
                <p className="text-xs text-red-600 mt-1">{errors.leaseFile}</p>
              )}
            </div>

            {/* Warehouse Address 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Warehouse Address Line 1 *
              </label>
              <input
                type="text"
                name="warehouseAddress1"
                placeholder="Flat/House No."
                value={formData.warehouseAddress1}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status !== "idle"}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none ${
                  errors.warehouseAddress1
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-500"
                }`}
                required
              />
              {errors.warehouseAddress1 && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.warehouseAddress1}
                </p>
              )}
            </div>

            {/* Warehouse Address 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address Line 2 *
              </label>
              <input
                type="text"
                name="warehouseAddress2"
                placeholder="State / District"
                value={formData.warehouseAddress2}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status !== "idle"}
                className={`mt-1 w-full h-10 rounded-lg border px-3 focus:outline-none ${
                  errors.warehouseAddress2
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-500"
                }`}
                required
              />
              {errors.warehouseAddress2 && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.warehouseAddress2}
                </p>
              )}
            </div>

            {/* Warehouse Pincode */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Pincode *
              </label>
              <input
                type="text"
                name="warehouseAddress3"
                placeholder="6-digit PIN code"
                value={formData.warehouseAddress3}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status !== "idle"}
                className={`mt-1 h-10 w-full md:w-auto md:max-w-[200px] rounded-lg border px-3 focus:outline-none ${
                  errors.warehouseAddress3
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-500"
                }`}
                required
                inputMode="numeric"
                maxLength={6}
                pattern="\d{6}"
              />
              {errors.warehouseAddress3 && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.warehouseAddress3}
                </p>
              )}
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
              status === "idle"
                ? isValid
                  ? "Save and Continue"
                  : "Please complete all fields correctly"
                : status === "saving"
                ? "Saving..."
                : "Saved"
            }
            aria-live="polite"
          >
            {status === "saving" && (
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
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
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
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
