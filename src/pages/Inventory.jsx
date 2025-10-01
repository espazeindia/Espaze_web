import { useEffect, useState } from "react";
import { Tune, Add } from "@mui/icons-material";
import InventoryTable from "../components/table/InventoryTable";
import { useMode } from "../contexts/themeModeContext";
import { useNavigate } from "react-router-dom";
import { handleChangeDebounce } from "../utils/useDebounce";
import InventoryServices from "../services/InventoryServices";
import { notifyError } from "../utils/toast";

function Inventory() {
  const { theme } = useMode();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [totalDetails, setTotalDetails] = useState({});
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const debounce = handleChangeDebounce(searchText);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        setLoading(true);
        const result = await InventoryServices.GetAllInventory(limit, page, debounce, sortOrder);
        if (result.success === true) {
          const { total_pages, inventory_products, total } = result.data;
          let transformedInventory = [];
          if (inventory_products && inventory_products.length > 0) {
            transformedInventory = inventory_products.map((data) => {
              return {
                inventory_id:data.inventory_id,
                id:data.inventory_product_id,
                productName: data.metadata_name,
                productDescription: data.metadata_description,
                category: data.metadata_category_id,
                subCategory: data.metadata_subcategory_id,
                code: data.metadata_hsn_code,
                mrp: data.metadata_mrp,
                image: data.metadata_image,
                metadata_id: data.metadata_product_id,
                category_name: data.metadata_category_name,
                subcategory_name: data.metadata_subcategory_name,
                m_date:data.product_manufacturing_date,
                e_date:data.product_expiry_date,
                price:data.product_price,
                quantity:data.product_quantity,
                visible:data.product_visibility,
              };
            });
          }

          setTotalDetails({ total: total, total_pages: total_pages });
          setProducts(transformedInventory);
        }

        setLoading(false);
      } catch (err) {
        
          notifyError(err?.response?.data?.message || err.message);
        
        setLoading(false);
      }
    };
    getMetadata();
  }, [debounce, page, limit, reload, sortOrder]);

  return (
    <div
      className={`${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      } w-full overflow-scroll sideBarNone min-h-full  p-5`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory</h1>
      </div>

      <div className="flex flex-col justify-center gap-5 mt-5">
        <div className="flex items-center">
          <input
            type="text"
            className={` px-4 py-2 rounded-lg w-[78vw] ${
              theme
                ? "bg-white text-zinc-700 shadow-zinc-300"
                : "bg-zinc-800 text-zinc-200 shadow-zinc-700"
            }
                transition-shadow duration-500 focus:outline-0 placeholder:text-base focus:shadow-sm
                 hover:shadow-sm`}
            placeholder="Search Inventory"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <div
            className={`border-1 relative group  flex items-center px-4 transition-all ${
              theme
                ? " text-zinc-700 border-zinc-700 shadow-zinc-700"
                : " text-zinc-400 border-zinc-400 shadow-zinc-400"
            } 
            duration-500 rounded-lg ml-5 py-[6px] hover:cursor-pointer hover:shadow-xs`}
          >
            <Tune className="mr-2" /> Filters
            <div
              className={` absolute hidden group-hover:block top-[100%] right-0 ${
                theme ? "text-zinc-700 p-3 bg-white" : "bg-zinc-700 p-3 text-white"
              }  rounded-md w-[200%]`}
            >
              <div className=" pb-1 border-b-[1px] border-neutral-300">Filters</div>
              <button
                className={`my-1 ${
                  theme ? "hover:bg-neutral-300" : "hover:bg-neutral-800"
                } py-1 w-full cursor-pointer rounded-md`}
                onClick={() => setSortOrder("asc")}
              >
                Prices Low To High
              </button>
              <button
                className={`my-1 ${
                  theme ? "hover:bg-neutral-300" : "hover:bg-neutral-800"
                } py-1 w-full cursor-pointer rounded-md`}
                onClick={() => setSortOrder("desc")}
              >
                Prices High To Low
              </button>
              <button
                className="my-1 hover:bg-red-700 cursor-pointer bg-red-500 text-white font-semibold py-1 w-full rounded-md"
                onClick={() => setSortOrder(null)}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end ">
          {/* <button
            className={` border-1 group relative flex items-center justify-center w-26 py-1 
            transition-all duration-500  shadow-red-500 font-semibold rounded-s-lg  ${
              checkedIds.length < 1
                ? theme
                  ? "text-zinc-700 border-zinc-700 hover:cursor-not-allowed"
                  : "text-zinc-400 border-zinc-400 hover:cursor-not-allowed"
                : theme
                ? " hover:cursor-pointer text-red-600 border-red-600 hover:shadow-sm"
                : " hover:cursor-pointer text-red-500 border-red-500 hover:shadow-sm"
            }`}
            disabled={checkedIds.length < 1}
            onClick={handleMultipleDelete}
          >
            <DeleteOutline />
            Delete
            <div
              className={`absolute hidden ${
                checkedIds.length < 1 ? "group-hover:block" : ""
              } top-[100%] text-[10px] ${
                theme ? "text-zinc-600 bg-white " : "bg-zinc-600 text-white"
              } p-2 rounded-md `}
            >
              {" "}
              Only works on selecting atleast one product
            </div>
          </button> */}
          <button
            onClick={() => {
              navigate("/products");
            }}
            className={` ${
              theme
                ? "border-green-600 text-green-600 shadow-green-600"
                : " border-green-500 text-green-500 shadow-green-500"
            } border w-26  
              transition-all duration-700 flex  justify-center items-center py-1 font-semibold rounded-lg 
              hover:cursor-pointer hover:shadow-sm`}
          >
            <Add fontSize="sm" />
            Add
          </button>
        </div>
      </div>
      <div className={`${theme ? " bg-white" : " bg-zinc-800"} shadow-md  p-4 rounded-lg mt-5 `}>
        <div className="overflow-scroll sideBarNone rounded-lg">
          <InventoryTable
            products={products}
            setProducts={setProducts}
            setPage={setPage}
            page={page}
            limit={limit}
            setLimit={setLimit}
            totalDetails={totalDetails}
            loading={loading}
            setReload={setReload}
          />
        </div>
      </div>
    </div>
  );
}

export default Inventory;
