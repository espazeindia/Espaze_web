import React, { useState } from "react";
import { notifyError, notifySuccess } from "../utils/toast";
import LoginServices from "../services/LoginServices";
import { useUser } from "../contexts/userContext";
import { useMode } from "../contexts/themeModeContext";
import { Eye, EyeOff } from "lucide-react";
import { ArrowBack } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const { role, isOnboarded, setReload, setIsOnboarded } = useUser();
  const { theme } = useMode();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    Cookies.remove("EspazeCookie", { sameSite: "None", secure: true });
    setReload((prevData) => !prevData);
    navigate(false);
  };

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
      if (role === "operations") {
        const res = await LoginServices.ChangeOperationalGuyPassword({
          old_password: formData.oldPassword,
          new_password: formData.newPassword,
        });
        if (res.success) {
          notifySuccess(res.message);
          if (res.token) {
            Cookies.set("EspazeCookie", res.token);
            setIsOnboarded(true);
          }
          setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } else {
          notifyError(res?.message || "Failed to change password");
        }
      } else if (role === "admin") {
        const res = await LoginServices.ChangeAdminPassword({
          old_password: formData.oldPassword,
          new_password: formData.newPassword,
        });
        if (res.success) {
          notifySuccess(res.message);
          if (res.token) {
            Cookies.set("EspazeCookie", res.token);
            setIsOnboarded(true);
          }
          setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } else {
          notifyError(res?.message || "Failed to change password");
        }
      } else {
        notifyError("User role not recognized");
        return;
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 font-sans transition-colors duration-200 ${
        theme ? "bg-white text-gray-800" : "bg-neutral-900 text-white"
      }`}
      style={{ height: "93vh" }}
    >
      {!isOnboarded && (
        <button className=" cursor-pointer ml-20 mr-auto" onClick={handleLogout}>
          <ArrowBack />
        </button>
      )}
      {/* Card */}
      <div
        className={`rounded-xl p-6 shadow-md border w-full max-w-md transition-colors duration-200 ${
          theme ? "bg-white border-gray-200" : "bg-neutral-800 border-neutral-700"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-4 text-center transition-colors duration-200 ${
            theme ? "text-gray-800" : "text-white"
          }`}
        >
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Old Password */}
          <div>
            <label
              className={`block mb-1 text-sm font-medium ${
                theme ? "text-gray-700" : "text-gray-300"
              }`}
            >
              Old Password
            </label>
            <div className="relative">
              <input
                type={showPassword.old ? "text" : "password"}
                name="oldPassword"
                placeholder="Enter old password"
                value={formData.oldPassword}
                onChange={handleChange}
                className={`w-full p-2 pr-10 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 transition-colors duration-200 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
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
            <label
              className={`block mb-1 text-sm font-medium ${
                theme ? "text-gray-700" : "text-gray-300"
              }`}
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full p-2 pr-10 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 transition-colors duration-200 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
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
            <label
              className={`block mb-1 text-sm font-medium ${
                theme ? "text-gray-700" : "text-gray-300"
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-2 pr-10 rounded-md text-sm focus:outline-none focus:ring-2 placeholder-gray-400 transition-colors duration-200 ${
                  theme
                    ? "bg-white border border-gray-300 text-gray-900 focus:ring-purple-600"
                    : "bg-neutral-900 border border-neutral-700 text-white focus:ring-purple-400"
                }`}
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

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-2.5 text-white font-semibold rounded-md transition-all duration-200 ${
              theme ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-700 hover:bg-purple-800"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
