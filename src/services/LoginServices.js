import requests from "./httpService";

const LoginServices = {
  LoginOperationalGuy: async (body) => {
    return requests.post("/login/operational_guy/login", body);
  },

  GetOtp: async (params) => {
    return requests.get("/login/seller/getOTP", { params : params });
  },

  LoginSellerByOtp: async (params) => {
    return requests.get("/login/seller/verifyOTP", {
      params : params,
    });
  },

  LoginSellerByPin: async (params) => {
    return requests.get("/login/seller/verify/Pin", {
      params : params,
    });
  },
};

export default LoginServices;
