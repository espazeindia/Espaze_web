import requests from "./httpService";

const CategoryServices = {
  // For Category

  CreateCategory: (body) => {
    return requests.post("/category/createCategory", body);
  },

  FetchCategory: (limit, page, search) => {
    return requests.get("/category/getCategories", {
      params: { limit: limit, offset: page, search: search },
    });
  },

  UpdateCategory: (body, id) => {
    return requests.put(`/category/updateCategory/${id}`, body);
  },

  DeleteCategory: (id) => {
    return requests.delete(`/category/deleteCategory/${id}`);
  },

  //For SubCategory

  CreateSubcategory: (body) => {
    return requests.post("/category/createSubCategory", body);
  },

  FetchSubcategory: (limit, page, search, id) => {
    return requests.get(`/category/getSubcategoryByCategoryId/${id}`, {
      params: { limit: limit, offset: page, search: search },
    });
  },

  UpdateSubcategory: (body, id) => {
    return requests.put(`/category/subcategory/${id}`, body);
  },

  DeleteSubcategory: (id) => {
    return requests.delete(`/category/subcategory/${id}`);
  },

  //all

  FetchAllCategory: () => {
    return requests.get(`/category/getAllCategories`);
  },

  FetchAllSubCategory: (id) => {
    return requests.get(`/category/getAllSubCategories/${id}`);
  },
};

export default CategoryServices;
