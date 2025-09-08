import requests from "./httpService";
import { validate } from "../utils/jwt-verify";
import Cookies from "js-cookie";

const getValidCookie = () => {
  const cookie = Cookies.get("EspazeCookie");
  if (!cookie) return null;
  const payload = validate(cookie);
  return payload ? cookie : null;
};

const InventoryServices = {
  AddToInventory: async (body) => {
    return requests.post("/inventory/addInventory", body);
  },

  GetAllInventory: async (limit, offset, search, sort) => {
    return requests.get("/inventory/getAllInventory", {
      params: { limit, offset, search, sort },
    });
  },

  UpdateInventory: async (body) => {
    return requests.put("/inventory/updateInventory", body);
  },

  FetchInventoryById: async (id) => {
    return requests.get("/inventory/getInventoryById", {
      params: { id },
    });
  },
};

export default InventoryServices;
