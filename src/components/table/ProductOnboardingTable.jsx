import { useState } from "react";
import { useMode } from "../../contexts/themeModeContext";
import { Edit, Delete } from "@mui/icons-material";
import EditMetaData from "../modal/EditMetaData";
import DeleteMetaData from "../modal/DeleteMetaData";
import BottomPagination from "../pagination/BottomPagination";

function ProductOnboardingTable({
  onboardingData,
  setOnboardingData,
  page,
  setPage,
  setLimit,
  limit,
}) {
  const { theme } = useMode();
  const [editModal, setEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [deleteProduct, setDeleteProduct] = useState(-1);
  const [deleteModal, setDeleteModal] = useState(false);

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
      className={`mt-10 p-2 rounded-lg w-full  sideBarNone ${theme ? "bg-white" : "bg-zinc-800"}`}
    >
      <div className="w-full">
        <div className="grid grid-cols-8 border-b py-4 text-sm border-gray-300 border-dotted">
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Image
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Product Name
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Code
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            MRP
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Category
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            SubCategory
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Product Description
          </div>
          <div
            className={`text-center ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}  font-semibold`}
          >
            Actions
          </div>
        </div>
        <div >
          {onboardingData.map((data, index) => (
            <div key={index} className=" grid grid-cols-8  text-sm border-b py-4 border-gray-300 border-dotted" >
              <div className={`text-center font-medium ${theme ? "text-zinc-800":"text-white"}`}>{data.image}</div>
              <div className={`text-center font-medium ${theme ? "text-zinc-800":"text-white"}`}>{data.productName}</div>
              <div className={`text-center font-medium ${theme ? "text-zinc-800":"text-white"}`}>{data.code}</div>
              <div className={`text-center font-medium ${theme ? "text-zinc-800":"text-white"}`}>{data.mrp}</div>
              <div className={`text-center font-medium ${theme ? "text-zinc-800":"text-white"}`}>{data.category}</div>
              <div className={`text-center font-medium ${theme ? "text-zinc-800":"text-white"}`}>{data.subCategory}</div>
              <div className={`text-center font-medium ${theme ? "text-zinc-800":"text-white"}`}>{data.productDescription}</div>
              <div>
                <div className={`text-center font-medium ${theme ? "text-black" : "text-white"}`}>
                  <button
                    className={`${
                      theme
                        ? "text-green-600 hover:text-green-700"
                        : "text-green-400 hover:text-green-700"
                    }`}
                    onClick={() => {
                      handleEdit(data);
                    }}
                  >
                    <Edit />
                  </button>
                  <button
                    className={` hover:text-red-600 ${theme ? "text-red-500" : "text-red-500"}`}
                    onClick={() => {
                      handleDelete(data.id);
                    }}
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            
            </div>
            
          ))}
        </div>
      </div>
      <BottomPagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} />
      <EditMetaData
        isOpen={editModal}
        onClose={() => {
          setEditModal(false);
        }}
        currentProduct={currentProduct}
        setOnboardingData={setOnboardingData}
      />
      <DeleteMetaData
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false);
        }}
        deleteProduct={deleteProduct}
        setOnboardingData={setOnboardingData}
      />
    </div>
  );
}

export default ProductOnboardingTable;
