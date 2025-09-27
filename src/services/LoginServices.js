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
  ChangeOperationalGuyPassword: (body) => {
    return requests.put("/onboarding/operational_guy/onboarding", body);
  },

  ChangeAdminPassword: (body) => {
    return requests.post("/onboarding/admin/onboarding", body);
  },
};

export default LoginServices;
