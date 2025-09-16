import requests from "./httpService";

const LoginServices = {
  LoginOperationalGuy: (body) => {
    return requests.post("/login/operational_guy/login", body);
  },

  GetOtp: (param) => {
    return requests.get("/login/seller/getOTP", { params: param });
  },

  LoginSellerByOtp: (param) => {
    return requests.get("/login/seller/verifyOTP", {
      params: param,
    });
  },

  LoginSellerByPin: (param) => {
    return requests.get("/login/seller/verifyPin", {
      params: param,
    });
  },
  LoginAdmin: async (body) => {
    return requests.post("/login/admin/login", body);
  },

  // ✅ New function for changing operational guy password
  ChangeOperationalGuyPassword: (body) => {
    return requests.post("/login/operational_guy/change-password", body);
  },
};

export default LoginServices;
