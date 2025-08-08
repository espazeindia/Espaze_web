import requests from "./httpService";

const LoginServices = {
  LoginOperationalGuy: async (body) => {
    return requests.post("/login/operational_guy/login", body);
  },

  GetOtp: async (header) => {
    return requests.get("/login/seller/getOTP", { headers: header });
  },

  LoginSellerByOtp: async (header) => {
    return requests.get("/login/seller/verifyOTP", {
      headers: header,
    });
  },

  LoginSellerByPin: async (header) => {
    return requests.get("/login/seller/verify/Pin", {
      headers: header,
    });
  },
};

export default LoginServices;
