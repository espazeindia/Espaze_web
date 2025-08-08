import { Checkbox } from "@mui/joy";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import ViewModalComponent from "../modal/ViewProductModal";
import { Visibility } from "@mui/icons-material";
import { useMode } from "../../contexts/themeModeContext";
import BottomPagination from "../pagination/BottomPagination";

function ProductTable({ products, setPage, page, limit, setLimit, totalDetails,loading}) {
  const { theme } = useMode();
  const [openViewProduct, setViewProduct] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const handleProductView = (data) => {
    setProductDetails(data);
    setViewProduct(true);
  };
  return (
    <>
      <div
        className={`px-2 rounded-lg w-full mt-8  sideBarNone ${
          theme ? "bg-white" : "bg-zinc-800"
        } ${loading && "animate-pulse"}`}
      >
        <div className="w-full">
          <div className="grid grid-cols-[1fr_2fr_5fr_3fr_1fr_4fr_3fr_6fr_2fr] border-b py-4 text-sm border-gray-300 border-dotted">
            <Checkbox
              size="sm"
              sx={
                theme
                  ? {
                      "&.Mui-checked .MuiSvgIcon-root": {
                        backgroundColor: "#825dcf", // Ensures the icon background changes
                      },
                    }
                  : {
                      "&.Mui-checked .MuiSvgIcon-root": {
                        backgroundColor: "#b898fa",
                      },
                    }
              }
            />
            <div
              className={`text-center ${
                theme ? "text-[#4110a2]" : "text-[#b898fa]"
              }  font-semibold`}
            >
              Image
            </div>
            <div
              className={`text-center ${
                theme ? "text-[#4110a2]" : "text-[#b898fa]"
              }  font-semibold`}
            >
              Product Name
            </div>
            <div
              className={`text-center ${
                theme ? "text-[#4110a2]" : "text-[#b898fa]"
              }  font-semibold`}
            >
              Code
            </div>
            <div
              className={`text-center ${
                theme ? "text-[#4110a2]" : "text-[#b898fa]"
              }  font-semibold`}
            >
              MRP
            </div>
            <div
              className={`text-center ${
                theme ? "text-[#4110a2]" : "text-[#b898fa]"
              }  font-semibold`}
            >
              Category
            </div>
            <div
              className={`text-center ${
                theme ? "text-[#4110a2]" : "text-[#b898fa]"
              }  font-semibold`}
            >
              SubCategory
            </div>
            <div
              className={`text-center ${
                theme ? "text-[#4110a2]" : "text-[#b898fa]"
              }  font-semibold`}
            >
              Product Description
            </div>
            <div
              className={`text-center ${
                theme ? "text-[#4110a2]" : "text-[#b898fa]"
              }  font-semibold`}
            >
              Actions
            </div>
          </div>
        </div>
        <div className=" h-[50vh] overflow-scroll sideBarNone">
          {!loading ? (
            products.length > 0 ? (
              products.map((data, index) => (
                <div
                  key={index}
                  className=" grid grid-cols-[1fr_2fr_5fr_3fr_1fr_4fr_3fr_6fr_2fr] items-center  text-sm border-b py-4 border-gray-300 border-dotted"
                >
                  <Checkbox
                    type="checkbox"
                    size="sm"
                    className="relative top-[3px] left-2"
                    sx={
                      theme
                        ? {
                            "&.Mui-checked .MuiSvgIcon-root": {
                              backgroundColor: "#825dcf", // Ensures the icon background changes
                            },
                          }
                        : {
                            "&.Mui-checked .MuiSvgIcon-root": {
                              backgroundColor: "#b898fa",
                            },
                          }
                    }
                  />
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.image}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.productName}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.code}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.mrp}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.category_name}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.subcategory_name}
                  </div>
                  <div
                    className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}
                  >
                    {data.productDescription}
                  </div>

                  <div
                    className={`text-center flex items-center justify-center gap-3 font-medium 
                    ${theme ? "text-black" : "text-white"}`}
                  >
                    <div
                      className={`hover:cursor-pointer ${
                        theme
                          ? "text-green-600 hover:text-green-700"
                          : "text-green-400 hover:text-green-700"
                      } `}
                      onClick={() => {
                        handleProductView(product);
                      }}
                    >
                      <Visibility fontSize="small" />
                    </div>
                    <button
                      className={`hover:cursor-pointer ml-3 ${
                        theme
                          ? "text-green-600 hover:text-green-700"
                          : "text-green-400 hover:text-green-700"
                      } `}
                      onClick={() => {
                        handleProductView(product);
                      }}
                    >
                      <Add fontSize="small" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className=" w-full h-[48vh] flex justify-center items-center text-2xl font-semibold">
                {" "}
                No Metadata Found
              </div>
            )
          ) : (
            Array.from({ length: limit }).map((_, index) => (
              <div key={index} className="border-b h-14 border-gray-300 border-dotted w-full"></div>
            ))
          )}
        </div>
        <BottomPagination
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalDetails={totalDetails}
          loading={loading}
          textSize="base"
        />
      </div>

      <ViewModalComponent
        isOpen={openViewProduct}
        onClose={() => setViewProduct(false)}
        data={productDetails}
      />
    </>
  );
}

export default ProductTable;
