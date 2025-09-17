import React, { useState } from "react";
import { notifyError, notifySuccess } from "../utils/toast";
import LoginServices from "../services/LoginServices";
import { useUser } from "../contexts/UserContext";
import { Eye, EyeOff } from "lucide-react"; // ✅ eye icons

function ChangePassword() {
  const { role } = useUser(); // ← fetch role from context

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      notifyError("New Password and Confirm Password do not match");
      return;
    }

    try {
      let res;

      if (role === "operations") {
        res = await LoginServices.ChangeOperationalGuyPassword({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        });
      } else if (role === "admin") {
        res = await LoginServices.ChangeAdminPassword({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        });
      } else {
        notifyError("User role not recognized");
        return;
      }

      if (res?.success) {
        notifySuccess("Password changed successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        notifyError(res?.message || "Failed to change password");
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Old Password */}
        <div>
          <label className="block mb-1 text-sm font-medium">Old Password</label>
          <div className="relative">
            <input
              type={showPassword.old ? "text" : "password"}
              name="oldPassword"
              placeholder="Enter old password"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-xl p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="button"
              onClick={() => togglePassword("old")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-1 text-sm font-medium">New Password</label>
          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-xl p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="button"
              onClick={() => togglePassword("new")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-xl p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="button"
              onClick={() => togglePassword("confirm")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
