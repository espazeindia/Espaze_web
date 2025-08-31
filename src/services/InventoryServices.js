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
    const token = getValidCookie();
    if (!token) throw new Error("cookie error");
    // Ensure numeric fields
    body.product_price = Number(body.product_price);
    body.product_mrp = Number(body.product_mrp);
    body.product_quantity = Number(body.product_quantity ?? 0);
    return requests.post("/inventory/addInventory", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  GetAllInventory: async (limit, offset, search, sort) => {
    const token = getValidCookie();
    if (!token) throw new Error("cookie error");
    return requests.get("/inventory/getAllInventory", {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit, offset, search, sort },
    });
  },

  UpdateInventory: async (body) => {
    const token = getValidCookie();
    if (!token) throw new Error("cookie error");
    // Ensure numeric fields if present
    if (body.product_price !== undefined) body.product_price = Number(body.product_price);
    if (body.product_mrp !== undefined) body.product_mrp = Number(body.product_mrp);
    if (body.product_quantity !== undefined) body.product_quantity = Number(body.product_quantity);
    return requests.put("/inventory/updateInventory", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  FetchInventoryById: async (id) => {
    const token = getValidCookie();
    if (!token) throw new Error("cookie error");
    return requests.get("/inventory/getInventoryById", {
      headers: { Authorization: `Bearer ${token}` },
      params: { id },
    });
  },
};

export default InventoryServices;
