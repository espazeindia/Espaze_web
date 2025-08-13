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

const MetaDataServices = {
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
  UpdateMetaData: async (body, id) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.put(`/metadata/updateMetadata/${id}`, body, {
        headers : {Authorization: `Bearer ${token}`}
      });
    } else {
      throw new Error("cookie error");
    }
  },
  
   DeleteMetadata: async (id) => {
     const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.delete(`/metadata/deleteMetadata/${id}`, {
        headers : {Authorization: `Bearer ${token}`}
      });
    } else {
      throw new Error("cookie error");
    }
  },
  FetchMetadataForSeller: async (limit, page, search) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.get("/metadata/getMetadataForSeller", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: limit, offset: page, search: search },
      });
    } else {
      throw new Error("cookie error");
    }
  },

  //fetchProductDetails
  FetchMetadataById: async (id) => {
    const token = getValidCookie();

    if (token !== "Cookie not found" && token !== "cookie error") {
      return requests.get(`/metadata/getMetadata/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      throw new Error("cookie error");
    }
  },

};


export default MetaDataServices;
