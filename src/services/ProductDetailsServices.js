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
  return "cookie error";
};

const ProductDetailsServices = {
  FetchMetadataById: async (id) => {
    const token = getValidCookie();

    if (token !== "Cookie not found" && token !== "cookie error") {
      return requests.get(`/category/getMetadata/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      throw new Error("cookie error");
    }
  },
};

export default ProductDetailsServices;
