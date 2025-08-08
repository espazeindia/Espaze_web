import requests from "./httpService";

const LoginServices = {
  LoginOperationalGuy: async (body) => {
    return requests.post("/login/operational_guy/login", body);
  },

  GetOtp: async (param) => {
    return requests.get("/login/seller/getOTP", { params: param });
  },

  LoginSellerByOtp: async (param) => {
    return requests.get("/login/seller/verifyOTP", {
      params: param,
    });
  },

  LoginSellerByPin: async (param) => {
    return requests.get("/login/seller/verify/Pin", {
      params: param,
    });
  },
};

export default LoginServices;
