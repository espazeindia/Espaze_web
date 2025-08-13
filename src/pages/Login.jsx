import React, { useState } from "react";
import Logo from "../assets/img/logo2.png";
import Logo2 from "../assets/img/logo.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/toast";
import { DarkMode, LightMode, ArrowBack, Store, Settings } from "@mui/icons-material";
import { useMode } from "../contexts/themeModeContext";
import Seller from "../components/tabs/Seller";
import Operations from "../components/tabs/Operations";

function Login() {
  const { theme, toggleTheme } = useMode();
  const [user, setUser] = useState("seller");

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${
        theme 
          ? "bg-gradient-to-br from-violet-50 via-white to-purple-50 text-gray-800" 
          : "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          theme ? "bg-violet-300" : "bg-purple-600"
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          theme ? "bg-purple-300" : "bg-violet-600"
        }`}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main card */}
        <div
          className={`backdrop-blur-xl rounded-2xl shadow-2xl border transition-all duration-300 transform hover:scale-[1.02] ${
            theme 
              ? "bg-white/80 border-gray-200 shadow-gray-200/50" 
              : "bg-gray-900/80 border-gray-700 shadow-gray-900/50"
          }`}
        >
          <div className="p-6">
            {/* Logo and header */}
            <div className="text-center mb-4">
              <div className="flex justify-center mb-2">
                <div className={`p-2 rounded-xl ${
                  theme ? "bg-violet-100" : "bg-purple-900/50"
                }`}>
                  {theme ? (
                    <img src={Logo} className="w-10 h-10 object-contain" alt="Logo" />
                  ) : (
                    <img src={Logo2} className="w-10 h-10 object-contain" alt="Logo" />
                  )}
                </div>
              </div>
              
              <h1 className={`text-2xl font-bold mb-1 ${
                theme ? "text-gray-900" : "text-white"
              }`}>
                Welcome Back
              </h1>
              
              <p className={`text-xs ${
                theme ? "text-gray-600" : "text-gray-300"
              }`}>
                Choose your account type to continue
              </p>
            </div>

            {/* User type selector - Card based */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUser("seller")}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    user === "seller"
                      ? "border-violet-700 bg-gradient-to-br from-violet-100 to-purple-100 shadow-lg"
                      : theme
                      ? "border-gray-200 bg-white hover:border-violet-300 hover:shadow-md"
                      : "border-gray-600 bg-gray-800 hover:border-violet-400 hover:shadow-md"
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                      user === "seller"
                        ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                        : theme
                        ? "bg-gray-100 text-gray-600"
                        : "bg-gray-700 text-gray-300"
                    }`}>
                      <Store fontSize="small" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${
                        user === "seller"
                          ? "text-violet-700"
                          : theme
                          ? "text-gray-800"
                          : "text-white"
                      }`}>
                        Seller
                      </h3>
<<<<<<< HEAD
=======
                      {/* <p className={`text-xs ${
                        user === "seller"
                          ? "text-violet-600"
                          : theme
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}>
                        Access store
                      </p> */}
>>>>>>> 63786d2cce5d67685b86d7c002a640a321cea069
                    </div>
                  </div>
                  {user === "seller" && (
                    <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-violet-500 rounded-full"></div>
                  )}
                </button>

                <button
                  onClick={() => setUser("operations")}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    user === "operations"
                      ? "border-violet-700 bg-gradient-to-br from-violet-100 to-purple-100 shadow-lg"
                      : theme
                      ? "border-gray-200 bg-white hover:border-violet-300 hover:shadow-md"
                      : "border-gray-600 bg-gray-800 hover:border-violet-400 hover:shadow-md"
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                      user === "operations"
                        ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                        : theme
                        ? "bg-gray-100 text-gray-600"
                        : "bg-gray-700 text-gray-300"
                    }`}>
                      <Settings fontSize="small" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${
                        user === "operations"
                          ? "text-violet-700"
                          : theme
                          ? "text-gray-800"
                          : "text-white"
                      }`}>
                        Operations
                      </h3>
                      {/* <p className={`text-xs ${
                        user === "operations"
                          ? "text-violet-600"
                          : theme
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}>
                        Manage system
                      </p> */}
                    </div>
                  </div>
                  {user === "operations" && (
                    <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-violet-500 rounded-full"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Login form */}
            <div className="space-y-4">
              {user === "seller" ? <Seller /> : <Operations />}
            </div>
          </div>
        </div>
      </div>

      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          theme 
            ? "bg-white text-gray-800 shadow-gray-200/50 hover:shadow-gray-300/50" 
            : "bg-gray-800 text-white shadow-gray-900/50 hover:shadow-gray-700/50"
        }`}
      >
        {theme ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
      </button>
    </div>
  );
}

export default Login;
