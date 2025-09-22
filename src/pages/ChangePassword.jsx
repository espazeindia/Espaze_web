import React, { useState } from "react";
import { notifyError, notifySuccess } from "../utils/toast";
import LoginServices from "../services/LoginServices";
import { useUser } from "../contexts/userContext";
import { useMode } from "../contexts/themeModeContext";
import { Eye, EyeOff } from "lucide-react";

function ChangePassword() {
  const { role } = useUser();
  const { theme } = useMode();

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

  // Theme-aware classes
  const inputClass = (error) =>
    `w-full border rounded-xl p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400
      ${theme
        ? `bg-gray-100 text-black border-gray-300 ${error ? "border-red-500" : ""}`
        : `bg-neutral-800 text-white border-neutral-700 ${error ? "border-red-500" : ""}`
      } transition-colors duration-200`;

  const eyeButtonClass = `absolute inset-y-0 right-3 flex items-center
    ${theme ? "text-gray-500 hover:text-purple-500" : "text-gray-400 hover:text-purple-400"} transition-colors duration-200`;

  const buttonClass = `w-full font-semibold py-2 rounded-xl shadow-md transition
    ${theme ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-purple-700 hover:bg-purple-600 text-white"}`;

  return (
    <div className={`${theme ? "bg-gray-100" : "bg-gray-900"} min-h-screen flex items-center justify-center px-2 transition-colors duration-200`}>
      <div className={`${theme ? "bg-white text-gray-800" : "bg-gray-800 text-white"} w-full max-w-md p-6 shadow-lg rounded-xl transition-colors duration-200`}>
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>

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
                className={inputClass()}
                required
              />
              <button
                type="button"
                onClick={() => togglePassword("old")}
                className={eyeButtonClass}
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
                className={inputClass()}
                required
              />
              <button
                type="button"
                onClick={() => togglePassword("new")}
                className={eyeButtonClass}
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
                className={inputClass()}
                required
              />
              <button
                type="button"
                onClick={() => togglePassword("confirm")}
                className={eyeButtonClass}
              >
                {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className={buttonClass}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
