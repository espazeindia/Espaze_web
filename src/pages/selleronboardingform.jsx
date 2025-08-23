import React, { useState } from "react";

function SellerOnboardingForm() {
  const [formData, setFormData] = useState({
    sellerName: "",
    phone: "",
    shopAddress: "",
    gstin: "",
    companyName: "",
    shopName: "",
    securityPin: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.sellerName ||
      !formData.phone ||
      !formData.shopAddress ||
      !formData.gstin ||
      !formData.companyName ||
      !formData.shopName ||
      !formData.securityPin
    ) {
      alert("⚠️ Please fill all the fields before submitting!");
      return;
    }

    console.log("Seller Onboarding Data:", formData);
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🛒 Seller Onboarding Form
        </h2>

        {submitted ? (
          <div className="text-center text-green-600 font-semibold">
            ✅ Form Submitted Successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Seller Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Seller Name
              </label>
              <input
                type="text"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter seller full name"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter phone number"
              />
            </div>

            {/* Shop Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Shop Address
              </label>
              <textarea
                name="shopAddress"
                value={formData.shopAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter full shop address"
              ></textarea>
            </div>

            {/* PAN / GSTIN */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                PAN / GSTIN
              </label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter PAN or GSTIN"
              />
            </div>

            {/* Company Registered Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Company Registered Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter company registered name"
              />
            </div>

            {/* Shop Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Shop Name
              </label>
              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter shop name"
              />
            </div>

            {/* Security Pin */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Security Pin
              </label>
              <input
                type="password"
                name="securityPin"
                value={formData.securityPin}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter security pin"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Submit Onboarding Form
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SellerOnboardingForm;
