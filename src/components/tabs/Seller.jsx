import React, { useState, useRef } from "react";
import { FormControl, Input } from "@mui/joy";
import Cookies from "js-cookie";
import { useMode } from "../../contexts/themeModeContext";
import LoginServices from "../../services/LoginServices";
import { notifySuccess, notifyError } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { Phone, Lock, Key, Refresh } from "@mui/icons-material";

function Seller() {
  const { theme } = useMode();
  const navigate = useNavigate();
  const [loginVia, setLoginVia] = useState("pin");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [showOtpError, setShowOtpError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  const handleGetOtp = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      notifyError("Please enter a valid phone number");
      return;
    }

    setIsOtpLoading(true);
    try {
      const res = await LoginServices.GetOtp({ phonenumber: phone });
      if (res.success === true) {
        notifySuccess(res.message);
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    } finally {
      setIsOtpLoading(false);
    }
  };

  const otpRefs = Array.from({ length: 6 }, () => useRef(null));

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const pinRefs = Array.from({ length: 6 }, () => useRef(null));

  const handlePinChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 5) {
      pinRefs[index + 1].current.focus();
    }
  };

  const handlePinKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (pin[index]) {
        const newPin = [...pin];
        newPin[index] = "";
        setPin(newPin);
      } else if (index > 0) {
        pinRefs[index - 1].current.focus();
      }
    }
  };

  const isPinComplete = pin.every((digit) => digit !== "");

  const handleLoginByOtp = async (e) => {
    e.preventDefault();
    if (isOtpComplete) {
      setIsLoading(true);
      const enteredOtp = otp.join("");
      try {
        const res = await LoginServices.LoginSellerByOtp({
          phonenumber: phone,
          otp: enteredOtp,
        });
        if (res.success) {
          notifySuccess(res.message);
          Cookies.set("EspazeCookie", res.token);
          navigate("/");
        }
      } catch (error) {
        notifyError(error?.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLoginByPin = async (e) => {
    e.preventDefault();
    if (isPinComplete) {
      setIsLoading(true);
      const enteredPin = pin.join("");
      try {
        const res = await LoginServices.LoginSellerByPin({
          phonenumber: phone,
          pin: enteredPin,
        });
        if (res.success) {
          notifySuccess(res.message);
          Cookies.set("EspazeCookie", res.token);
          navigate("/");
        }
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    otpRefs[0].current?.focus();
  };

  const clearPin = () => {
    setPin(["", "", "", "", "", ""]);
    pinRefs[0].current?.focus();
  };

  return (
    <div className="w-full space-y-4">
      {/* Login method selector - Segmented buttons */}
      <div className="space-y-3">
        <div className="text-center">
          <h3
            className={`text-base font-semibold mb-1 ${
              theme ? "text-gray-800" : "text-white"
            }`}
          >
            Choose Login Method
          </h3>
          {/* <p className={`text-xs ${theme ? "text-gray-600" : "text-gray-300"}`}>
            Select how you'd like to authenticate
          </p> */}
        </div>

        <div
          className={`flex space-x-1 p-1 rounded-lg ${
            theme ? "bg-gray-100 " : "bg-gray-800"
          }`}
        >
          <button
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              loginVia === "pin"
                ? theme
                  ? "bg-white text-violet-600 shadow-sm"
                  : "bg-gray-700 text-violet-400 shadow-sm"
                : theme
                ? "text-gray-600  hover:text-gray-800 "
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => {
              setLoginVia("pin");
              clearOtp();
            }}
          >
            <Lock fontSize="small" />
            PIN
          </button>

          <button
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              loginVia === "otp"
                ? theme
                  ? "bg-white text-violet-600 shadow-sm"
                  : "bg-gray-700 text-violet-400 shadow-sm"
                : theme
                ? "text-gray-600  hover:text-gray-800 "
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => {
              setLoginVia("otp");
              clearPin();
            }}
          >
            <Key fontSize="small" />
            OTP
          </button>
        </div>
      </div>

      <form
        onSubmit={loginVia === "pin" ? handleLoginByPin : handleLoginByOtp}
        className="space-y-4"
      >
        {/* Phone number input */}
        <div className="space-y-1.5">
          <label
            className={`text-sm font-semibold flex items-center gap-2 ${
              theme ? "text-gray-700" : "text-gray-200"
            }`}
          >
            <Phone fontSize="small" />
            Phone Number
          </label>
          <div
            className={`relative ${
              loginVia === "otp" ? "grid grid-cols-[1fr,auto] gap-3" : ""
            }`}
          >
            <Input
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              fullWidth
              size="lg"
              placeholder="Enter your phone number"
              className={`transition-all duration-300 ${
                theme
                  ? "bg-white border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
                  : "bg-gray-800 border-gray-600 focus:border-violet-400 focus:ring-violet-400/20"
              }`}
            />
            {loginVia === "otp" && (
              <button
                type="button"
                onClick={handleGetOtp}
                disabled={isOtpLoading || !phone || phone.length < 10}
                className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  isOtpLoading || !phone || phone.length < 10
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {isOtpLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Refresh fontSize="small" />
                )}
                Get OTP
              </button>
            )}
          </div>
        </div>

        {/* PIN/OTP input */}
        <div className="space-y-2">
          <label
            className={`text-sm font-semibold flex items-center gap-2 ${
              theme ? "text-gray-700" : "text-gray-200"
            }`}
          >
            {loginVia === "pin" ? (
              <Lock fontSize="small" />
            ) : (
              <Key fontSize="small" />
            )}
            {loginVia === "pin" ? "Security PIN" : "OTP Code"}
          </label>

          <div className="flex justify-between gap-2">
            {(loginVia === "pin" ? pin : otp).map((digit, index) => (
              <input
                key={index}
                ref={(loginVia === "pin" ? pinRefs : otpRefs)[index]}
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  loginVia === "pin"
                    ? handlePinChange(index, e.target.value)
                    : handleOtpChange(index, e.target.value)
                }
                onKeyDown={(e) =>
                  loginVia === "pin"
                    ? handlePinKeyDown(e, index)
                    : handleOtpKeyDown(e, index)
                }
                className={`w-11 h-11 text-center border-2 rounded-lg text-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  theme
                    ? "bg-white border-gray-200 focus:border-violet-500 focus:ring-violet-500/20 text-gray-900"
                    : "bg-gray-800 border-gray-600 focus:border-violet-400 focus:ring-violet-400/20 text-white"
                } ${
                  digit
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                    : ""
                }`}
                inputMode="numeric"
                type="text"
              />
            ))}
          </div>

          {showOtpError && (
            <p className="text-red-500 text-center text-sm animate-pulse">
              Please enter all 6 digits
            </p>
          )}
        </div>

        {/* Login button */}
        <div className="space-y-3">
          <button
            type="submit"
            disabled={
              loginVia === "pin" ? !isPinComplete : !isOtpComplete || isLoading
            }
            className={`w-full py-2.5 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform ${
              (loginVia === "pin" ? isPinComplete : isOtpComplete) && !isLoading
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

          {/* Additional actions */}
          <div className="text-center">
            <button
              type="button"
              className={`text-sm font-medium transition-colors hover:underline ${
                theme
                  ? "text-violet-600 hover:text-violet-700"
                  : "text-violet-400 hover:text-violet-300"
              }`}
            >
              {loginVia === "pin" ? "Forgot PIN?" : "Resend OTP"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Seller;
