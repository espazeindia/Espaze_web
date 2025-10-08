import requests from "./httpService";

const InventoryServices = {
  AddToInventory: (body) => {
    return requests.post("/inventory/addInventory", body);
  },

  GetAllInventory: (limit, offset, search, sort) => {
    return requests.get("/inventory/getAllInventory", {
      params: { limit: limit, offset: offset, sort: sort, search: search },
    });
  },
  
  GetAllInventoryRequests: (limit, offset, search) => {
    return requests.get("/inventory/getAllInventoryRequests", {
      params: { limit: limit, offset: offset, search: search },
    });
  },

  UpdateInventory: (body) => {
    return requests.put("/inventory/updateInventory", body);
  },

  FetchInventoryById: (id) => {
    return requests.get("/inventory/getInventoryById", {
      params: { id: id },
    });
  },

  AcceptProduct: (id) => {
    return requests.get("/inventory/acceptProduct", {
      params: { productId: id },
    });
  },

  AddInventoryByExcel: (body) => {
    return requests.post("/inventory/addInventoryByExcel", { metadataProducts: body });
  },
};

export default InventoryServices;
