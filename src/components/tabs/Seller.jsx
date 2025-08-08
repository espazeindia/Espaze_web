import React, { useState, useRef } from "react";
import { FormControl, Input } from "@mui/joy";
import { DarkMode, LightMode } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useMode } from "../../contexts/themeModeContext";
import LoginServices from "../../services/LoginServices";
import { notifySuccess,notifyError } from "../../utils/toast";

function Seller() {
  const { theme, toggleTheme } = useMode();
  const [loginVia, setLoginVia] = useState("pin");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [showOtpError, setShowOtpError] = useState(false);

  const handleGetOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await LoginServices.GetOtp({ phonenumber: phone });
      if (res.success === true) {
        notifySuccess(res.message);
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
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
      const enteredOtp = otp.join("");
      try {
        const res = await LoginServices.LoginSellerByOtp({phonenumber: phone, otp : enteredOtp });
        if (res.success) {
          notifySuccess(res.message);
          Cookies.set("EspazeCookie", res.token);
          navigate("/");
        }
      } catch (error) {
        notifyError(err?.response?.data?.message || err.message);
      }
    }
  };

  const handleLoginByPin = async (e) => {
    e.preventDefault();
    if (isPinComplete) {
      const enteredPin = pin.join("");
      try {
        const res = await LoginServices.LoginSellerByPin({phonenumber: phone, pin : enteredPin });
        if (res.success) {
          notifySuccess(res.message);
          Cookies.set("EspazeCookie", res.token);
          navigate("/");
        }
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
      }
    }
  };

  return (
    <div className="w-full">
      <h2 className="flex justify-center text-lg font-bold mb-2 ">
        Seller Login
      </h2>
      <div className="rounded-lg p-2 flex w-full justify-center gap-4 mb-2 ">
        <div
          className={`cursor-pointer p-1 text-sm border-2 font-bold rounded-md text-center w-1/2 ${
            loginVia === "pin"
              ? "border-violet-800 bg-violet-200 text-violet-800"
              : theme
              ? "border-zinc-400 bg-zinc-100 text-zinc-700"
              : "border-zinc-400 bg-zinc-100 text-zinc-700"
          }`}
          onClick={() => {
            setLoginVia("pin");
          }}
        >
          Pin Login
        </div>
        <div
          className={`cursor-pointer p-1 text-sm border-2 font-bold rounded-md text-center w-1/2 ${
            loginVia === "otp"
              ? "border-violet-800 bg-violet-200 text-violet-800"
              : theme
              ? "border-zinc-400 bg-zinc-100 text-zinc-700"
              : "border-zinc-400 bg-zinc-100 text-zinc-700"
          }`}
          onClick={() => {
            setLoginVia("otp");
          }}
        >
          OTP Login
        </div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-2"
      >
        <FormControl size="lg" className="space-y-1  gap-1">
          <label className="text-base font-semibold">Phone Number</label>
          <div
            className={`${
              loginVia === "otp" ? "grid grid-cols-[3fr_1fr] gap-3" : ""
            }`}
          >
            <Input
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              fullWidth
              size="lg"
              placeholder="Enter Phone Number"
            />
            {loginVia === "otp" && (
              <button
                type="button"
                onClick={handleGetOtp}
                className="bg-[#8b5cf6] rounded-lg font-semibold text-white text-sm hover:bg-[#8b5cf6] cursor-pointer"
              >
                Get OTP
              </button>
            )}
          </div>
        </FormControl>
        {loginVia === "pin" ? (
          <div className="text-base font-semibold">Enter Security Pin</div>
        ) : (
          <div className="text-base font-semibold">Enter OTP</div>
        )}
        <div className="flex justify-between gap-2">
          {loginVia === "pin"
            ? pin.map((digit, index) => (
                <input
                  key={index}
                  ref={pinRefs[index]}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handlePinKeyDown(e, index)}
                  className="w-10 h-10 text-center border rounded text-lg"
                  inputMode="numeric"
                  type="text"
                />
              ))
            : otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  className="w-10 h-10 text-center border rounded text-lg"
                  inputMode="numeric"
                />
              ))}
        </div>
        {showOtpError && (
          <p className="text-red-500 text-center text-sm">
            Please enter all 6 digits
          </p>
        )}
        {loginVia === "pin" ? (
          <div>
            <button
              onSubmit={handleLoginByPin}
              type="submit"
              className={`w-full py-2 mt-3 rounded-lg cursor-pointer font-semibold text-white text-lg ${
                isPinComplete
                  ? "bg-[#8b5cf6]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isPinComplete}
            >
              Login
            </button>
            <p className="text-blue-500 text-center mt-2 text-sm hover:underline cursor-pointer">
              Forgot PIN?
            </p>
          </div>
        ) : (
          <div>
            <button
              onSubmit={handleLoginByOtp}
              type="submit"
              className={`w-full py-2 mt-3 rounded-lg cursor-pointer font-semibold text-white text-lg ${
                isOtpComplete
                  ? "bg-[#8b5cf6]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isOtpComplete}
            >
              Login
            </button>
            <p className="text-blue-500 text-center mt-2 text-sm hover:underline cursor-pointer">
              Resend OTP
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Seller;
