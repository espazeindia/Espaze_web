import axios from "axios";
import Cookies from "js-cookie";
import { notifyError } from "../utils/toast";


const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}`,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("EspazeCookie");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, body, headers) =>
    instance
      .get(url, body, headers)
      .then(responseBody)
      .catch((error) => {
        if (error.response?.status === 401) {
          // Don't redirect if it's a login attempt
          const isLoginAttempt = url.includes('/login/');
          if (!isLoginAttempt) {
            Cookies.remove("EspazeCookie");
            window.location.href = "/login";
            notifyError("User Session Expired Login Again")
          }
        }
        throw error;
      }),

  post: (url, body, headers) =>
    instance
      .post(url, body, headers)
      .then(responseBody)
      .catch((error) => {
        if (error.response?.status === 401) {
          // Don't redirect if it's a login attempt
          const isLoginAttempt = url.includes('/login/');
          if (!isLoginAttempt) {
            Cookies.remove("EspazeCookie");
            window.location.href = "/login";
            notifyError("User Session Expired Login Again")
          }
        }
        throw error;
      }),

  put: (url, body, headers) =>
    instance
      .put(url, body, headers)
      .then(responseBody)
      .catch((error) => {
        if (error.response?.status === 401) {
          // Don't redirect if it's a login attempt
          const isLoginAttempt = url.includes('/login/');
          if (!isLoginAttempt) {
            Cookies.remove("EspazeCookie");
            window.location.href = "/login";
            notifyError("User Session Expired Login Again")
          }
        }
        throw error;
      }),

  patch: (url, body) =>
    instance
      .patch(url, body)
      .then(responseBody)
      .catch((error) => {
        if (error.response?.status === 401) {
          // Don't redirect if it's a login attempt
          const isLoginAttempt = url.includes('/login/');
          if (!isLoginAttempt) {
            Cookies.remove("EspazeCookie");
            window.location.href = "/login";
            notifyError("User Session Expired Login Again")
          }
        }
        throw error;
      }),

  delete: (url, body) =>
    instance
      .delete(url, body)
      .then(responseBody)
      .catch((error) => {
        if (error.response?.status === 401) {
          // Don't redirect if it's a login attempt
          const isLoginAttempt = url.includes('/login/');
          if (!isLoginAttempt) {
            Cookies.remove("EspazeCookie");
            window.location.href = "/login";
            notifyError("User Session Expired Login Again")
          }
        }
        throw error;
      }),
};

export default requests;
