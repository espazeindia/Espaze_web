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

const InventoryServices = {
  AddToInventory: async (body) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.post("/inventory/addInventory", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      throw new Error("cookie error");
    }
  },
  GetAllInventory: async (limit, offset, search, sort) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.get("/inventory/getAllInventory", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: limit, offset: offset, sort: sort, search: search },
      });
    } else {
      throw new Error("cookie error");
    }
  },
  UpdateInventory: async (body) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.put("/inventory/updateInventory", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      throw new Error("cookie error");
    }
  },
  FetchInventoryById: async (id) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.get("/inventory/getInventoryById",  {
        headers: { Authorization: `Bearer ${token}` },
        params:{id:id}
      });
    } else {
      throw new Error("cookie error");
    }
  },
};

export default InventoryServices;
