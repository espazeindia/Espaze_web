import React, { useState } from "react";
import Cookies from "js-cookie";
import { FormControl, Input } from "@mui/joy";
import Logo from "../assets/img/logo2.png";
import Logo2 from "../assets/img/logo.png";
import { Link,NavLink } from "react-router-dom";
import AdminServices from "../services/AdminServices";
import { notifyError, notifySuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useMode } from "../contexts/themeModeContext";

function Login() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useMode();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  const handleGetOtp = () => {
    // You can call OTP API here
    if (phone.length === 10) {
      setOtpSent(true);
      notifySuccess("OTP Sent!");
    } else {
      notifyError("Enter valid 10-digit phone number");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      try {
        const cookieTimeOut = 0.5;
        const res = await AdminServices.loginAdminWithOtp({ phone, otp: enteredOtp });
        if (res) {
          notifySuccess("Login Success!");
          Cookies.set("adminInfo", JSON.stringify(res), {
            expires: cookieTimeOut,
            sameSite: "None",
            secure: true,
          });
          navigate("/");
        }
      } catch (err) {
        notifyError(err?.response?.data?.message || err?.message);
      }
    } else {
      notifyError("Please enter all 6 digits of the OTP");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-6 ${
        theme ? "bg-zinc-200 text-zinc-800" : "bg-zinc-800 text-white"
      }`}
    >
      <div
        className={`flex h-full w-fit mx-auto overflow-hidden rounded-lg ${
          theme ? "bg-white" : "bg-neutral-950"
        } shadow-xl`}
      >
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex flex-col items-center justify-center p-6 sm:p-12">
            {theme ? (
              <img src={Logo} className="w-16 mb-3" />
            ) : (
              <img src={Logo2} className="w-16 mb-3" />
            )}
            <div className="w-full">
              <h1 className="mb-4 text-3xl font-semibold text-center">
                Welcome Back
              </h1>
              <h2
                className={`text-center ${
                  theme ? "text-zinc-600" : "text-zinc-400"
                } mb-6`}
              >
                Please enter your phone number to continue.
              </h2>
              <div
                className={`rounded-lg p-1 py-1.5 flex w-full justify-center gap-2 mt-4 mb-6 bg-violet-200 text-violet-800`}
              >
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `py-2 px-2 text-sm font-medium rounded-md text-center w-1/2  ${
                      isActive ? theme ? "bg-[#8b5cf6] text-white" : "bg-[#8b5cf6] text-white" 
                      : theme ? "bg-violet-200 text-violet-800":"bg-violet-200 text-violet-800"
                    }`
                  }
                >
                  Seller
                </NavLink>
                <NavLink
                  to="/operational-login"
                  className={({ isActive }) =>
                    `py-2 px-2 text-sm font-medium rounded-md text-center w-1/2 ${
                      isActive ? theme ? "bg-[#8b5cf6] text-white" : "bg-[#8b5cf6] text-white" 
                      : theme ? "bg-violet-200 text-violet-800":"bg-violet-200 text-violet-800"
                    }`
                  }
                >
                  Operational Guy
                </NavLink>
              </div>
              {!otpSent ? (
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                  <FormControl size="lg" className="space-y-1">
                    <label className="text-lg font-semibold">Phone Number</label>
                    <Input
                      name="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      fullWidth
                      size="lg"
                      placeholder="Enter Phone Number"
                    />
                  </FormControl>

                  <button
                    onClick={handleGetOtp}
                    className="w-full bg-[#8b5cf6] py-2 mt-3 rounded-lg font-semibold text-white text-lg hover:bg-[#8b5cf6]"
                  >
                    Get OTP
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        className="w-12 text-center text-xl"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#8b5cf6] py-2 mt-3 rounded-lg font-semibold text-white text-lg hover:bg-[#8b5cf6]"
                  >
                    Login
                  </button>

                  <p className="text-blue-500 text-center mt-2 text-sm hover:underline cursor-pointer">
                    Resend OTP
                  </p>
                </form>
              )}

              {/* <p className="mt-10">
                <Link
                  className="text-[16px] w-fit mx-auto font-medium block text-center hover:underline"
                  to="/operational-login"
                >
                  Login as Operational Guy?
                </Link>
              </p> */}
            </div>
          </main>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className={`hover:cursor-pointer p-2 rounded-full w-10 h-10 flex items-center justify-center fixed bottom-2 right-2 ${
          theme ? "text-black bg-white" : "text-white bg-black"
        }`}
      >
        {theme ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
      </button>
    </div>
  );
}

export default Login;