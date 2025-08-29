import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";

const AddWarehouse = () => {
  const navigate = useNavigate();

  // UI-only state (no persistence)
  const [formData, setFormData] = useState({
    ownerName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",            // now used as Owner Pincode
    warehouseName: "",
    warehouseAddress1: "",
    warehouseAddress2: "",
    warehouseAddress3: "",       // now used as Warehouse Pincode
    warehouseSize: "",
    leaseFileName: "",
  });
  const [errors, setErrors] = useState({ leaseFile: "" });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "leaseFile") {
      const file = files && files[0];
      if (!file) {
        setFormData((s) => ({ ...s, leaseFileName: "" }));
        setErrors((s) => ({ ...s, leaseFile: "PDF is required." }));
        return;
      }
      const isPdf =
        file.type === "application/pdf" || /\.pdf$/i.test(file.name || "");
      if (!isPdf) {
        setFormData((s) => ({ ...s, leaseFileName: "" }));
        setErrors((s) => ({ ...s, leaseFile: "Please upload a PDF file." }));
        e.target.value = "";
        return;
      }
      setErrors((s) => ({ ...s, leaseFile: "" }));
      setFormData((s) => ({ ...s, leaseFileName: file.name }));
      return;
    }

    // Names: letters + spaces only
    if (name === "ownerName" || name === "warehouseName") {
      const cleaned = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((s) => ({ ...s, [name]: cleaned }));
      return;
    }

    // Phone: digits only, max 10
    if (name === "phoneNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 10);
      setFormData((s) => ({ ...s, phoneNumber: cleaned }));
      return;
    }

    // Size: digits only
    if (name === "warehouseSize") {
      const cleaned = value.replace(/\D/g, "");
      setFormData((s) => ({ ...s, warehouseSize: cleaned }));
      return;
    }

    // Pincode (owner & warehouse): digits only, max 6
    if (name === "addressLine3" || name === "warehouseAddress3") {
      const cleaned = value.replace(/\D/g, "").slice(0, 6);
      setFormData((s) => ({ ...s, [name]: cleaned }));
      return;
    }

    setFormData((s) => ({ ...s, [name]: value }));
  };

  const isValid = useMemo(() => {
    const requiredFilled =
      formData.ownerName.trim() &&
      formData.phoneNumber.trim() &&
      formData.addressLine1.trim() &&
      formData.addressLine2.trim() &&
      formData.addressLine3.trim() &&             // pincode
      formData.warehouseName.trim() &&
      formData.warehouseAddress1.trim() &&
      formData.warehouseAddress2.trim() &&
      formData.warehouseAddress3.trim() &&        // pincode
      formData.warehouseSize.trim() &&
      formData.leaseFileName.trim();

    const phoneOk = /^\d{10}$/.test(formData.phoneNumber);
    const namesOk =
      /^[A-Za-z\s]+$/.test(formData.ownerName) &&
      /^[A-Za-z\s]+$/.test(formData.warehouseName);
    const sizeOk = /^\d+$/.test(formData.warehouseSize);
    const pincodesOk =
      /^\d{6}$/.test(formData.addressLine3) &&
      /^\d{6}$/.test(formData.warehouseAddress3);
    const fileOk = !errors.leaseFile;

    return Boolean(
      requiredFilled && phoneOk && namesOk && sizeOk && pincodesOk && fileOk
    );
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // No backend yet
    // navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header row */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center hover:opacity-80 transition"
          aria-label="Back to dashboard"
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
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                inputMode="text"
                pattern="[A-Za-z\s]+"
                title="Letters and spaces only"
              />
            </div>

            {/* Phone Number with aligned chevron */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <div className="mt-1 flex w-full">
                <div className="relative">
                  <select
                    className="h-10 pr-8 pl-3 rounded-l-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none appearance-none cursor-not-allowed"
                    defaultValue="+91"
                    disabled
                    aria-label="Country code"
                  >
                    <option value="+91">+91</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                    aria-hidden="true"
                  />
                </div>

                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="98765 43210"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="h-10 w-full rounded-r-lg border border-l-0 border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                  title="Enter a 10-digit phone number"
                />
              </div>
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
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Address Line 2 (now includes State) */}
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
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Pincode (replaces Address Line 3) */}
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
                className="mt-1 h-10 w-full md:w-auto md:max-w-[200px] rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                title="Enter a 6-digit pincode"
              />
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
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                inputMode="text"
                pattern="[A-Za-z\s]+"
                title="Letters and spaces only"
              />
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
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                inputMode="numeric"
                pattern="\d+"
                title="Digits only"
              />
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
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Warehouse Address 2 (now includes State) */}
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
                className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
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
                className="mt-1 h-10 w-full md:w-auto md:max-w-[200px] rounded-lg border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                title="Enter a 6-digit pincode"
              />
            </div>
          </div>
        </div>

        {/* Save and Continue */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full rounded-lg px-6 py-3 text-white font-semibold transition ${
              isValid
                ? "bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300"
                : "bg-purple-300 cursor-not-allowed"
            }`}
            title={!isValid ? "Please complete all fields correctly" : "Save and Continue"}
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWarehouse;
