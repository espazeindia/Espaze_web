import React, { useEffect, useState } from "react";
import { Tune, Add } from "@mui/icons-material";
import ProductTable from "../components/table/ProductTable";
import AddProductDetails from "../components/modal/AddProductModal";
import { useMode } from "../contexts/themeModeContext";
import { handleChangeDebounce } from "../utils/useDebounce";
import { notifyError } from "../utils/toast";
import ProductOnboardingServices from "../services/ProductOnboardingServices";

function Products() {
  const { theme } = useMode();

  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [totalDetails, setTotalDetails] = useState({});
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const debouce = handleChangeDebounce(searchText);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        setLoading(true);
        const result = await ProductOnboardingServices.FetchMetadata(limit, page, debouce);
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
                id: data.product_id,
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
        if (err === "cookie error") {
          Cookies.remove("EspazeCookie");
          router("/login");
          notifyError("Cookie error, please relogin and try again");
        } else {
          notifyError(err?.response?.data?.message || err.message);
        }
        setLoading(false);
      }
    };
    getMetadata();
  }, [debouce, page, limit, reload]);

  return (
    <div
      className={`${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      } w-full overflow-scroll sideBarNone min-h-full  p-5`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        {/* <div className="flex">
          <button
            className={`${
              theme
                ? "border-[#4a2594] shadow-[#4a2594] text-[#4a2594]"
                : "border-[#b898fa] shadow-[#b898fa] text-[#b898fa]"
            }  border-1 transition-all duration-500 flex items-center px-6 py-2 font-semibold rounded-s-lg hover:cursor-pointer  hover:shadow-sm`}
          >
            <FileDownload /> Import
          </button>
          <button
            className={`border-y-1 border-r-1 ${
              theme
                ? "border-zinc-700 text-zinc-700 shadow-zinc-700"
                : "border-zinc-400 text-zinc-400 shadow-zinc-400"
            }  transition-all 
          duration-500 flex items-center px-6 py-2 font-semibold rounded-e-lg hover:cursor-pointer  hover:shadow-sm `}
          >
            <FileUpload />
            Export
          </button>
        </div> */}
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
              setOpenAddProduct(true);
            }}
            className={` relative group 
              ${
                theme
                  ? "border-green-600 text-green-600 shadow-green-600"
                  : " border-green-500 text-green-500 shadow-green-500"
              } border 
              transition-all duration-700 flex  justify-center items-center px-5 py-1.5 font-semibold rounded-lg 
              hover:cursor-pointer hover:shadow-sm`}
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
          <div
            className={`border-1 hidden relative group   items-center px-4 transition-all ${
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
      </div>

      <ProductTable
        products={products}
        setPage={setPage}
        page={page}
        limit={limit}
        setLimit={setLimit}
        totalDetails={totalDetails}
        loading={loading}
      />
      <AddProductDetails
        isOpen={openAddProduct}
        onClose={() => setOpenAddProduct(false)}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}

export default Products;
