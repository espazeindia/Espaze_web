import React, { useState } from "react";
import { FormControl, Input } from "@mui/joy";
import Logo from "../assets/img/logo2.png";
import Logo2 from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { useMode } from "../contexts/themeModeContext";
import { DarkMode, LightMode } from "@mui/icons-material";

function Login() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useMode();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleGetOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Dummy OTP logic for now
    console.log("OTP sent to", phoneNumber);
    navigate("/otp"); // redirect to OTP screen
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
                className={`text-center mb-6 ${
                  theme ? "text-zinc-600" : "text-zinc-400"
                }`}
              >
                Please enter your phone number to get OTP.
              </h2>

              <form onSubmit={handleGetOtp} className="flex flex-col gap-4">
                <FormControl size="lg" className="space-y-1">
                  <label className="text-lg font-semibold">Phone Number</label>
                  <Input
                    name="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    fullWidth
                    size="lg"
                    placeholder="Enter 10-digit Phone Number"
                  />
                </FormControl>

                <button
                  type="submit"
                  className="w-full bg-[#8b5cf6] py-2 mt-3 rounded-lg font-semibold text-white text-lg hover:bg-[#8b5cf6]"
                >
                  Get OTP
                </button>
              </form>
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
