import React, { useEffect, useState } from "react";
import { Tune, Add } from "@mui/icons-material";
import ProductTable from "../components/table/ProductTable";
import AddProductDetails from "../components/modal/AddProductModal";
import { useMode } from "../contexts/themeModeContext";
import { handleChangeDebounce } from "../utils/useDebounce";
import { notifyError } from "../utils/toast";
import MetaDataServices from "../services/MetaDataServices";
import AddToInventory from "../components/modal/AddToInventory";

function Products() {
  const { theme } = useMode();
  const [openAddToInventoryModal, setOpenAddToInventoryModal] = useState(false);
  const [totalDetails, setTotalDetails] = useState({});
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [addedIds, setAddedIds] = useState([]);

  const debouce = handleChangeDebounce(searchText);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        setLoading(true);
        const result = await MetaDataServices.FetchMetadataForSeller(limit, page, debouce);
        if (result.success === true) {
          const { total_pages, metadata, total } = result.data;
          let transformedMetadata = [];
          if (metadata && metadata.length > 0) {
            transformedMetadata = metadata.map((data) => {
              return {
                productName: data.name,
                productDescription: data.description,
                category: data.category_id,
                subCategory: data.subcategory_id,
                code: data.hsn_code,
                mrp: data.mrp,
                image: data.image,
                id: data.id,
                category_name: data.category_name,
                subcategory_name: data.subcategory_name,
              };
            });
          }

          setTotalDetails({ total: total, total_pages: total_pages });
          setProducts(transformedMetadata);
        }
        setLoading(false);
      } catch (err) {
        
          notifyError(err?.response?.data?.message || err.message);
        
        setLoading(false);
      }
    };
    getMetadata();
  }, [debouce, page, limit, reload]);

  const handleAddToInventory = (allIds) => {
    setAddedIds(allIds);
    setOpenAddToInventoryModal(true);
  };

  return (
    <div
      className={`${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      } w-full overflow-scroll sideBarNone min-h-full  p-5`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>

      <div className="flex flex-col justify-center gap-5 mt-5">
        <div className="flex items-center justify-between gap-5">
          <input
            type="text"
            className={` px-4 py-2 rounded-lg w-[70vw]  ${
              theme
                ? "bg-white text-zinc-700 shadow-zinc-300"
                : "bg-zinc-800 text-zinc-200 shadow-zinc-700"
            }
                transition-shadow duration-500 focus:outline-0 placeholder:text-base focus:shadow-sm
                 hover:shadow-sm`}
            placeholder="Search Product"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div
            onClick={() => {
              if (checkedIds.length > 0) {
                handleAddToInventory(checkedIds);
              } else {
              }
            }}
            className={` relative group 
              ${
                theme
                  ? checkedIds.length > 0
                    ? "border-green-600 text-green-600 shadow-green-600 cursor-pointer"
                    : "border-gray-600 text-gray-600 shadow-gray-600 opacity-60 cursor-not-allowed "
                  : checkedIds.length > 0
                  ? " border-green-500 text-green-500 shadow-green-500 cursor-pointer"
                  : "border-gray-400 text-gray-400 shadow-gray-400 opacity-70 cursor-not-allowed"
              } border 
              transition-all duration-700 flex  justify-center items-center px-5 py-1.5 font-semibold rounded-lg  
               hover:shadow-sm`}
          >
            <Add />
            Add to Inventory
            <div
              className={`absolute hidden group-hover:block top-[100%] text-xs p-2 rounded-lg shadow-lg
              ${theme ? "text-zinc-600 bg-white " : "bg-zinc-600 text-white"}`}
            >
              Only works on selecting atleast one product
            </div>
          </div>
        </div>
      </div>

      <ProductTable
        products={products}
        setPage={setPage}
        page={page}
        limit={limit}
        setLimit={setLimit}
        totalDetails={totalDetails}
        loading={loading}
        checkedIds={checkedIds}
        setCheckedIds={setCheckedIds}
        handleAddToInventory={handleAddToInventory}
      />
      <AddToInventory
        isOpen={openAddToInventoryModal}
        onClose={() => {
          setOpenAddToInventoryModal(false);
        }}
        addedIds={addedIds}
      />
    </div>
  );
}

export default Products;
