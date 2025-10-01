import requests from "./httpService";

const MetaDataServices = {
  CreateMetaData: (body) => {
    return requests.post("/metadata/createMetadata", body);
  },

  FetchMetadata: (limit, page, search) => {
    return requests.get("/metadata/getMetadata", {
      params: { limit: limit, offset: page, search: search },
    });
  },

  UpdateMetaData: (body, id) => {
    return requests.put(`/metadata/updateMetadata/${id}`, body);
  },

  DeleteMetadata: (id) => {
    return requests.delete(`/metadata/deleteMetadata/${id}`);
  },

  FetchMetadataForSeller: (limit, page, search) => {
    return requests.get("/metadata/getMetadataForSeller", {
      params: { limit: limit, offset: page, search: search },
    });
  },

  //fetchProductDetails
  FetchMetadataById: (id) => {
    return requests.get(`/metadata/getMetadata/${id}`);
  },

  FetchMetadataBySubCategoryIds: (subcategoryIds) => {
    return requests.get(`/metadata/getMetadataForSubcategories`, {
      params: { subcategoryIds: subcategoryIds },
    });
  },
};

export default MetaDataServices;
