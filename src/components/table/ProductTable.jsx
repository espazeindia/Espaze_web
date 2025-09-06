import { Checkbox } from "@mui/joy";
import { Add, Visibility } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useMode } from "../../contexts/themeModeContext";
import BottomPagination from "../pagination/BottomPagination";
import { useNavigate } from "react-router-dom";

function ProductTable({
  products,
  setPage,
  page,
  limit,
  setLimit,
  totalDetails,
  loading,
  checkedIds,
  setCheckedIds,
  handleAddToInventory,
}) {
  const { theme } = useMode();
  const navigate = useNavigate();
  const [checkedBox, setCheckedBox] = useState(false);

  const handleProductView = (id) => {
    navigate(`/product-details/metadata_${id}`);
  };

  const handleMainCheckboxChange = (value) => {
    if (value) {
      setCheckedIds(products.map((p) => p.id));
      setCheckedBox(true);
    } else {
      setCheckedIds([]);
      setCheckedBox(false);
    }
  };

  const handleCheckedIdsChange = (id) => {
    if (checkedIds.includes(id)) {
      setCheckedIds((prev) => prev.filter((cid) => cid !== id));
    } else {
      setCheckedIds((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    setCheckedBox(products.length > 0 && products.every((p) => checkedIds.includes(p.id)));
  }, [products, checkedIds]);

  return (
    <div className={`px-2 mt-8 w-full sideBarNone`}>
      <div className="overflow-x-auto">
        <div
          className={`min-w-[1200px] rounded-lg ${theme ? "bg-white" : "bg-zinc-800"} ${
            loading ? "animate-pulse" : ""
          }`}
        >
          {/* Table Head */}
          <div className="grid grid-cols-[1fr_2fr_5fr_3fr_1fr_4fr_3fr_6fr_2fr] border-b py-4 text-sm border-gray-300 border-dotted">
            <Checkbox
              checked={checkedBox}
              onChange={(e) => handleMainCheckboxChange(e.target.checked)}
              size="sm"
              sx={
                theme
                  ? { "&.Mui-checked .MuiSvgIcon-root": { backgroundColor: "#825dcf" } }
                  : { "&.Mui-checked .MuiSvgIcon-root": { backgroundColor: "#b898fa" } }
              }
            />
            {["Image","Product Name","Code","MRP","Category","SubCategory","Product Description","Actions"].map((title, i) => (
              <div key={i} className={`text-center font-semibold ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}`}>
                {title}
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="h-[50vh] overflow-y-auto overflow-x-hidden">
            {!loading ? (
              products.length > 0 ? (
                products.map((data) => (
                  <div
                    key={data.id}
                    className="grid grid-cols-[1fr_2fr_5fr_3fr_1fr_4fr_3fr_6fr_2fr] items-center text-sm border-b py-4 border-gray-300 border-dotted cursor-pointer"
                    onClick={() => handleProductView(data.id)}
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={checkedIds.includes(data.id)}
                        onChange={() => handleCheckedIdsChange(data.id)}
                        size="sm"
                        className="relative top-[3px] left-2"
                        sx={
                          theme
                            ? { "&.Mui-checked .MuiSvgIcon-root": { backgroundColor: "#825dcf" } }
                            : { "&.Mui-checked .MuiSvgIcon-root": { backgroundColor: "#b898fa" } }
                        }
                      />
                    </div>
                    <div className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}>{data.image}</div>
                    <div className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}>{data.productName}</div>
                    <div className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}>{data.code}</div>
                    <div className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}>{data.mrp}</div>
                    <div className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}>{data.category_name}</div>
                    <div className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}>{data.subcategory_name}</div>
                    <div className={`text-center font-medium ${theme ? "text-zinc-800" : "text-white"}`}>{data.productDescription}</div>
                    <div className={`text-center flex items-center justify-center gap-3 font-medium ${theme ? "text-black" : "text-white"}`}>
                      <Visibility
                        fontSize="small"
                        className="hover:cursor-pointer text-green-600 hover:text-green-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductView(data.id);
                        }}
                      />
                      <Add
                        fontSize="small"
                        className="hover:cursor-pointer ml-3 text-green-600 hover:text-green-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToInventory([data.id]);
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-[48vh] flex justify-center items-center text-2xl font-semibold">
                  No Metadata Found
                </div>
              )
            ) : (
              Array.from({ length: limit }).map((_, index) => (
                <div key={index} className="border-b h-14 border-gray-300 border-dotted w-full"></div>
              ))
            )}
          </div>

          {/* Pagination */}
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
      </div>
    </div>
  );
}

export default ProductTable;
