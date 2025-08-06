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

const CategoryServices ={

  // For Category

    CreateCategory : async (body) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.post("/category/createCategory", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      throw new Error("cookie error");
    }
  },

  FetchCategory : async (limit, page, search) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.get("/category/getCategories", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: limit, offset: page, search: search },
      });
    } else {
      throw new Error("cookie error");
    }
  },
  
  UpdateCategory: async (body, id) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.put(`/category/updateCategory/${id}`, body, {
        headers : {Authorization: `Bearer ${token}`}
      });
    } else {
      throw new Error("cookie error");
    }
  },

   DeleteCategory: async (id) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.delete(`/category/deleteCategory/${id}`, {
        headers : {Authorization: `Bearer ${token}`}
      });
    } else {
      throw new Error("cookie error");
    }
  },

  //For SubCategory

  CreateSubcategory : async (body) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.post("/category/createSubCategory", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      throw new Error("cookie error");
    }
  },

  FetchSubcategory : async (limit, page, search,id) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.get(`/category/getSubcategoryByCategoryId/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: limit, offset: page, search: search },
      });
    } else {
      throw new Error("cookie error");
    }
  },
  
  UpdateSubcategory: async (body, id) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.put(`/category/subcategory/${id}`, body, {
        headers : {Authorization: `Bearer ${token}`}
      });
    } else {
      throw new Error("cookie error");
    }
  },

   DeleteSubcategory: async (id) => {
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.delete(`/category/subcategory/${id}`, {
        headers : {Authorization: `Bearer ${token}`}
      });
    } else {
      throw new Error("cookie error");
    }
  },

  //all

  FetchAllCategory: async()=>{
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.get(`/category/getAllCategories`,{
        headers : {Authorization: `Bearer ${token}`}
        })
    } else {
      throw new Error("cookie error");
    }
  },

  FetchAllSubCategory: async(id)=>{
    const token = getValidCookie();
    if (token != "Cookie not found" || token != "cookie error") {
      return requests.get(`/category/getAllSubCategories/${id}`,{
        headers : {Authorization: `Bearer ${token}`}
        })
    } else {
      throw new Error("cookie error");
    }
  }




}

export default CategoryServices;