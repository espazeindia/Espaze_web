import React, { useState, useEffect } from "react";

const OperationsOnboarding = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    employeeId: "",
  });

  const [success, setSuccess] = useState(false);

  // Auto hide success message after 3 sec
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSuccess(true);

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      department: "",
      employeeId: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-purple-200 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Operations Onboarding
        </h2>

        {/* ✅ Success message */}
        {success && (
          <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-center animate-fade-in">
            ✅ Operation Onboarding Successful!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OperationsOnboarding;
