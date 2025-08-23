import React from "react";

export default function selleronboarding() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl shadow-xl border rounded-2xl bg-white">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Seller Onboarding – Basic Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seller Name */}
            <div>
              <label className="block mb-2 text-gray-700">Seller Name</label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter seller name"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-2 text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter phone number"
              />
            </div>

            {/* Shop Address */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-gray-700">Shop Address</label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter shop address"
              />
            </div>

            {/* PAN */}
            <div>
              <label className="block mb-2 text-gray-700">PAN</label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter PAN"
              />
            </div>

            {/* GSTIN */}
            <div>
              <label className="block mb-2 text-gray-700">GSTIN</label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter GSTIN"
              />
            </div>

            {/* Company Registered Name */}
            <div>
              <label className="block mb-2 text-gray-700">
                Company Registered Name
              </label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter company registered name"
              />
            </div>

            {/* Shop Name */}
            <div>
              <label className="block mb-2 text-gray-700">Shop Name</label>
              <input
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter shop name"
              />
            </div>

            {/* Security Pin */}
            <div>
              <label className="block mb-2 text-gray-700">Security PIN</label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter 6-digit pin"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg transition">
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
