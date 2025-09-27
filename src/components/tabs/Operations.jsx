import React, { useState } from "react";
import { FormControl, Input } from "@mui/joy";
import Cookies from "js-cookie";
import LoginServices from "../../services/LoginServices";
import { DarkMode, LightMode, Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useMode } from "../../contexts/themeModeContext";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useUser } from "../../contexts/userContext";

function Operations({ showSeller, onAdminLogin }) {
  const { setReload } = useUser();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useMode();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      notifyError("Invalid Email Format");
      return;
    }

    setIsLoading(true);
    try {
      const res = await LoginServices.LoginOperationalGuy({
        email: formData.email,
        password: formData.password,
      });
      if (res.success) {
        notifySuccess(res.message);
        Cookies.set("EspazeCookie", res.token);
        setReload((prevData)=>!prevData)
         navigate("/")
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email input */}
        <div className="space-y-1.5">
          <label
            className={`text-sm font-semibold flex items-center gap-2 ${
              theme ? "text-gray-700" : "text-gray-200"
            }`}
          >
            <Email fontSize="small" />
            Email Address
          </label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
            fullWidth
            size="lg"
            placeholder="Enter your email address"
            className={`transition-all duration-300 ${
              theme
                ? "bg-white border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
                : "bg-gray-800 border-gray-600 focus:border-violet-400 focus:ring-violet-400/20"
            }`}
          />
        </div>

        {/* Password input */}
        <div className="space-y-1.5">
          <label
            className={`text-sm font-semibold flex items-center gap-2 ${
              theme ? "text-gray-700" : "text-gray-200"
            }`}
          >
            <Lock fontSize="small" />
            Password
          </label>
          <div className="relative">
            <Input
              className={`transition-all duration-300 pr-12 ${
                theme
                  ? "bg-white border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
                  : "bg-gray-800 border-gray-600 focus:border-violet-400 focus:ring-violet-400/20"
              }`}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              size="lg"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-colors ${
                theme ? "text-gray-400 hover:text-gray-600" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </button>
          </div>
        </div>

        {/* Login button */}
        <div className="space-y-3">
          <button
            type="submit"
            disabled={isLoading || !formData.email || !formData.password}
            className={`w-full py-2.5 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform ${
              formData.email && formData.password && !isLoading
                ? "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Forgot password link and Login as Admin button */}
          <div className="flex justify-between items-center">
            <Link
              className={`text-sm font-medium transition-colors hover:underline ${
                theme
                  ? "text-violet-600 hover:text-violet-700"
                  : "text-violet-400 hover:text-violet-300"
              }`}
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
            <button
              type="button"
              className={`text-sm font-medium transition-colors hover:underline ${
                theme
                  ? "text-violet-600 hover:text-violet-700"
                  : "text-violet-400 hover:text-violet-300"
              }`}
              onClick={onAdminLogin}
            >
              Login as Admin
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Operations;
