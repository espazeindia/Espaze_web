import React, { useState } from "react";
import Cookies from "js-cookie";
import { FormControl, Input } from "@mui/joy";
import Logo from "../assets/img/logo2.png";
import Logo2 from "../assets/img/logo.png";
import { Link, NavLink } from "react-router-dom";
import LoginServices from "../services/LoginServices";
import { notifyError, notifySuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useMode } from "../contexts/themeModeContext";

function Login() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useMode();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      notifyError("Invalid Email Format");
      return;
    }
    try {
      const res = await LoginServices.LoginOperationalGuy({
        email: formData.email,
        password: formData.password,
      });
      if (res.success) {
        notifySuccess(res.message);
        Cookies.set("EspazeCookie", res.token);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      notifyError(err?.response?.data?.message || err.message);
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
              <h1 className="mb-4 text-3xl font-semibold  text-center">
                Welcome Back
              </h1>
              <h2
                className={`text-center ${
                  theme ? "text-zinc-600" : "text-zinc-400"
                }  mb-6`}
              >
                Welcome back! Please enter your details.
              </h2>
              <div
                className={`rounded-lg p-1 py-1.5 flex w-full justify-center gap-2 mt-4 mb-6
                 ${
                   theme
                     ? "bg-violet-200 text-violet-800"
                     : "bg-violet-200 text-violet-800"
                 }`}
              >
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `py-2 px-2 text-sm font-medium rounded-md text-center w-1/2  ${
                      isActive
                        ? theme
                          ? "bg-[#8b5cf6] text-white"
                          : "bg-[#8b5cf6] text-white"
                        : theme
                        ? "bg-violet-200 text-violet-800"
                        : "bg-violet-200 text-violet-800"
                    }`
                  }
                >
                  Seller
                </NavLink>
                <NavLink
                  to="/operational-login"
                  className={({ isActive }) =>
                    `py-2 px-2 text-sm font-medium rounded-md text-center w-1/2 ${
                      isActive
                        ? theme
                          ? "bg-[#8b5cf6] text-white"
                          : "bg-[#8b5cf6] text-white"
                        : theme
                        ? "bg-violet-200 text-violet-800"
                        : "bg-violet-200 text-violet-800"
                    }`
                  }
                >
                  Operational Guy
                </NavLink>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormControl size="lg" className="space-y-1">
                  <label className="text-lg  font-semibold">Email</label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    fullWidth
                    size="lg"
                    placeholder="Enter Email"
                  />
                </FormControl>
                <FormControl size="lg" className="space-y-1">
                  <label className="text-lg font-semibold">Password</label>
                  <Input
                    className=" focus:outline-none"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    size="lg"
                    placeholder="Enter Password"
                  />
                </FormControl>

                <button
                  type="submit"
                  className="w-full bg-[#8b5cf6] py-2 mt-3 rounded-lg font-semibold text-white text-lg hover:bg-[#8b5cf6]"
                >
                  Login
                </button>
              </form>

              <p className="mt-5">
                <Link
                  className="text-sm w-fit mx-auto text-blue-600 cursor-pointer block text-center underline"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </p>
              {/* <p className="mt-7">
                <Link
                  className="text-[16px] w-fit mx-auto font-medium block text-center hover:underline"
                  to="/seller-login"
                >
                  Login as Seller?
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
