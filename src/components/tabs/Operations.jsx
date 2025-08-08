import React, { useState } from "react";
import { FormControl, Input } from "@mui/joy";
import Cookies from "js-cookie";
import LoginServices from "../../services/LoginServices";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useMode } from "../../contexts/themeModeContext";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { notifyError, notifySuccess } from "../../utils/toast";

function Operations() {
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
      // console.log(err);
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
    <div className="w-full">
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
          className="w-full bg-[#8b5cf6] py-2 mt-3 rounded-lg cursor-pointer font-semibold text-white text-lg hover:bg-[#8b5cf6]"
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
    </div>
  );
}

export default Operations;
