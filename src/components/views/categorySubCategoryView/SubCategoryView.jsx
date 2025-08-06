import React, { useEffect, useState } from "react";
import { Edit, Delete } from "@mui/icons-material";
import AddSubcategoryModal from "../../modal/AddSubcategoryModal";
import EditSubcategoryModal from "../../modal/EditSubcategoryModal";
import DeleteSubcategoryModal from "../../modal/DeleteSubcategoryModal";
import { useMode } from "../../../contexts/themeModeContext";
import BottomPagination from "../../pagination/BottomPagination";
import CategoryServices from "../../../services/CategoryServices";
import { notifyError } from "../../../utils/toast";

const SubcategoryModal = ({ category }) => {
  const { theme } = useMode();
  const [search, setSearch] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalDetails, setTotalDetails] = useState({
    total: 0,
    total_pages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [reload,setReload] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);

  useEffect(() => {
    const getSubcategory = async() =>{
      try {
        const res = await CategoryServices.FetchSubcategory(limit, page, search,category.id)
        if(res.success === true){
          const {sub_category,total,total_pages} = res.data
          let transSubcategory = [];
          if( sub_category && sub_category.length > 0 ){
            transSubcategory = sub_category.map((sub)=>{
            return{
              id: sub.id,
              name : sub.subcategory_name,
              image : sub.subcategory_image,
              categoryOfSub : sub.category_id
            }
          })
          }
          setTotalDetails({
            total:total,
            total_pages: total_pages
          })
          setSubcategories(transSubcategory);
        }     
      } catch (err) {
        if (err === "cookie error") {
          Cookies.remove("EspazeCookie");
          router("/login");
          notifyError("Cookie error, please relogin and try again");
        } else {
          notifyError(err?.response?.data?.message || err.message);
        }
      }
    }
    if(category.id){
    getSubcategory();}
  }, [category,reload]);

  const handleEdit = (newName) => {
    const updated = [...subcategories];
    updated[selectedSub] = newName;
    setSubcategories(updated);
    setSelectedSub(null);
  };

  const handleDelete = () => {
    const updated = subcategories.filter((_, i) => i !== selectedSub);
    setSubcategories(updated);
    setSelectedSub(null);
  };

  return (
    <div
      className={` h-full w-[50%] p-4 border-r border-gray-300 ${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      }`}
    >
      <h2 className="font-bold text-2xl mb-6">{category.name}</h2>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search subcategory..."
          className={`flex-1 p-2 px-4 rounded-md focus:outline-none ${
            theme
              ? "bg-white text-zinc-700 shadow-sm"
              : "bg-zinc-800 text-zinc-200 shadow-sm"
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setOpenAddModal(true)}
          className={`p-2 px-6 rounded-md font-medium cursor-pointer  hover:bg-green-600 hover:text-white ${
            theme
              ? "text-green-600 border border-green-600"
              : "text-green-500 border border-green-500"
          }`}
        >
          Add
        </button>
      </div>

      <div
        className={`rounded-lg  ${
          theme ? "bg-white text-gray-800" : "bg-zinc-800 text-white"
        }`}
      >
        <div
          className={`rounded-t-lg grid px-3 py-2 text-sm font-semibold grid-cols-[1fr_8fr_1.5fr] border-b border-gray-200 last:border-b-0 items-center
            ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}`}
        >
          <div>Image</div>
          <div>Category Name</div>
          <div>Actions</div>
        </div>
        {subcategories.map((sub, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_8fr_1.5fr]  items-center px-4 py-2 border-b border-gray-200 last:border-b-0"
          >
            <div className=" w-8 h-8 rounded-sm bg-gray-200"></div>
            <div className="text-sm font-semibold">{sub.name}</div>
            <div className="text-center flex items-center gap-2 font-medium ">
              <button
                className={`${
                  theme
                    ? "text-green-600 hover:text-green-700"
                    : "text-green-400 hover:text-green-700"
                }`}
                onClick={() => {
                  setSelectedSub(sub);
                  setOpenEditModal(true);
                }}
              >
                <Edit />
              </button>
              <button
                className={` hover:text-red-600 ${
                  theme ? "text-red-500" : "text-red-500"
                }`}
                onClick={() => {
                  setSelectedSub(sub);
                  setOpenDeleteModal(true);
                }}
              >
                <Delete />
              </button>
            </div>
          </div>
        ))}
        <BottomPagination
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalDetails={totalDetails}
          loading={loading}
          textSize="sm"
        />
      </div>
      {openAddModal && (
        <AddSubcategoryModal
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
          category = {category}
          setReload = {setReload}
        />
      )}

      {openEditModal && (
        <EditSubcategoryModal
          isOpen={openEditModal}
          onClose={() => {
            setOpenEditModal(false);
            setSelectedSub(null);
          }}
          subcategoryToEdit= {selectedSub}
          onEdit={handleEdit}
          setReload={setReload}
        />
      )}

      <DeleteSubcategoryModal
        isOpen={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedSub(null);
        }}
        data={selectedSub}
        onDelete={handleDelete}
        setReload={setReload}
      />
    </div>
  );
};

export default SubcategoryModal;
