import { useState } from "react";
import { useMode } from "../../contexts/themeModeContext";
import { Edit, Delete } from "@mui/icons-material";
import EditMetaData from "../modal/EditMetaData";
import DeleteMetaData from "../modal/DeleteMetaData";
import BottomPagination from "../pagination/BottomPagination";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProductOnboardingTable({
  onboardingData,
  setOnboardingData,
  page,
  setPage,
  setLimit,
  limit,
  totalDetails,
  loading,
  setReload,
}) {
  const navigate = useNavigate();
  const { theme } = useMode();
  const [editModal, setEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [deleteProduct, setDeleteProduct] = useState(-1);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleProduct = (data) => {
    navigate(`/product-details/metadata_${data.id}`);
  };

  const handleDelete = (id) => {
    setDeleteProduct(id);
    setDeleteModal(true);
  };

  const handleEdit = (data) => {
    setCurrentProduct(data);
    setEditModal(true);
  };

  return (
    <div
      className={`mt-10 p-2 rounded-lg w-full  sideBarNone ${theme ? "bg-white" : "bg-zinc-800"} ${
        loading && "animate-pulse"
      }`}
    >
      <div className="w-full overflow-x-auto">
        {/* Table Header */}
        <div
          className={`grid min-w-[1000px] border-b py-4 text-sm border-gray-300 border-dotted`}
          style={{
            gridTemplateColumns: userRole === "operations"
              ? "repeat(6, 1fr) 150px" // no Product ID, Image
              : "repeat(8, 1fr) 150px", // with Product ID, Image
          }}
        >
          {userRole !== "operations" && (
            <>
              <div
                className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"
                  } font-semibold`}
              >
                Product ID
              </div>
              <div
                className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"
                  } font-semibold`}
              >
                Image
              </div>
            </>
          )}
          <div className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"} font-semibold`}>
            Product Name
          </div>
          <div className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"} font-semibold`}>
            Code
          </div>
          <div className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"} font-semibold`}>
            MRP
          </div>
          <div className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"} font-semibold`}>
            Category
          </div>
          <div className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"} font-semibold`}>
            SubCategory
          </div>
          <div className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"} font-semibold`}>
            Product Description
          </div>
          {userRole === "operations" && (
            <div className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"} font-semibold`}>
              Actions
            </div>
          )}
        </div>

        {/* Table Rows */}
        <div className="h-[50vh] overflow-y-auto">
          {!loading ? (
            onboardingData.length > 0 ? (
              onboardingData.map((data, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleProduct(data);
                  }}
                  className="grid grid-cols-8 items-center text-sm border-b py-4 border-gray-300 border-dotted cursor-pointer hover:bg-zinc-100"
                >
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

                  {/* Product Code */}
                  <div className={`text-center ${theme ? "text-zinc-800" : "text-white"}`}>
                    {data.code || ""}
                  </div>

                  <div className={`text-center ${theme ? "text-zinc-800" : "text-white"}`}>
                    {data.mrp ?? "N/A"}
                  </div>
                  <div className={`text-center ${theme ? "text-zinc-800" : "text-white"}`}>
                    {data.category_name || "N/A"}
                  </div>
                  <div className={`text-center ${theme ? "text-zinc-800" : "text-white"}`}>
                    {data.subcategory_name || "N/A"}
                  </div>
                  <div className={`text-center ${theme ? "text-zinc-800" : "text-white"}`}>
                    {data.description
                      ? data.description.length > 25
                        ? `${data.description.substring(0, 25)}...`
                        : data.description
                      : "N/A"}
                  </div>

                  <div
                    className={`text-center flex items-center justify-center gap-3 font-medium 
                    ${theme ? "text-black" : "text-white"}`}
                  >
                    <button
                      className={`cursor-pointer ${
                        theme
                          ? "text-green-600 hover:text-green-700"
                          : "text-green-400 hover:text-green-700"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(data);
                      }}
                    >
                      <Edit />
                    </button>
                    <button
                      className={` hover:text-red-600 cursor-pointer ${
                        theme ? "text-red-500" : "text-red-500"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(data.id);
                      }}
                    >
                      <Delete />
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
            <div className="text-center mt-10">Loading...</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <BottomPagination
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        totalDetails={totalDetails}
      />
      <EditMetaData
        isOpen={editModal}
        onClose={() => {
          setEditModal(false);
        }}
        currentProduct={currentProduct}
        setReload={setReload}
      />
      <DeleteMetaData
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
        }}
        deleteProduct={deleteProduct}
        setOnboardingData={setOnboardingData}
        setReload={setReload}
      />
    </div>
  );
}

export default ProductOnboardingTable;
