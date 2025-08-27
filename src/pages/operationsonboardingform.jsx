import React, { useState } from "react";

const OperationsOnboardingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pan: "",
    password: "",
    warehouse: "",
  });

  const warehouses = ["Warehouse A", "Warehouse B", "Warehouse C"]; // Dummy data

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Operations Onboarding Data:", formData);
    alert("Operations Onboarding form submitted!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Operations Onboarding Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded-md p-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            className="w-full border rounded-md p-2"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email ID</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded-md p-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address Fields */}
        <div>
          <label className="block text-sm font-medium">Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            className="w-full border rounded-md p-2"
            value={formData.addressLine1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            className="w-full border rounded-md p-2"
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">City / State</label>
          <input
            type="text"
            name="city"
            className="w-full border rounded-md p-2"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">PAN</label>
          <input
            type="text"
            name="pan"
            className="w-full border rounded-md p-2"
            value={formData.pan}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded-md p-2"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Dropdown */}
        <div>
          <label className="block text-sm font-medium">Select Warehouse</label>
          <select
            name="warehouse"
            className="w-full border rounded-md p-2"
            value={formData.warehouse}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            {warehouses.map((wh, idx) => (
              <option key={idx} value={wh}>
                {wh}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OperationsOnboardingForm;
