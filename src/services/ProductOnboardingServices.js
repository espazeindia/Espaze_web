import requests from "./httpService";
import { validate } from "../utils/jwt-verify";
import Cookies from "js-cookie";

const getValidCookie = () => {
  const cookie = Cookies.get("EspazeCookie");
  if (cookie === undefined) {
    return "Cookie not found";
  }
  const payload = validate(cookie);
  if (payload != null) {
    return cookie;
  }

  return " cookie error";
};

const ProductOnboardingServices = {
  CreateMetaData: async (body) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.post("/metadata/createMetadata", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      throw new Error("cookie error");
    }
  },
  FetchMetadata: async (limit, page, search) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.get("/metadata/getMetadata", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: limit, offset: page, search: search },
      });
    } else {
      throw new Error("cookie error");
    }
  },
};

export default ProductOnboardingServices;
