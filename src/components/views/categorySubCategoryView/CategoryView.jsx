import { useEffect, useState } from "react";
import { useMode } from "../../../contexts/themeModeContext";
import { Edit, Delete } from "@mui/icons-material";
import AddCategory from "../../modal/AddCategory";
import EditCategory from "../../modal/EditCategory";
import DeleteCategoryModal from "../../modal/DeleteCategoryModal";
import BottomPagination from "../../pagination/BottomPagination";
import CategoryServices from "../../../services/CategoryServices";
import {handleChangeDebounce} from "../../../utils/useDebounce";
import { notifyError, notifySuccess } from "../../../utils/toast";

const CategoriesPage = ({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { theme } = useMode();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalDetails, setTotalDetails] = useState({
    total: 0,
    total_pages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [search, setSearch] = useState("");

const debounce = handleChangeDebounce(search);

  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setOpenEditModal(true);
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        // setLoading(true)
        const res = await CategoryServices.FetchCategory(limit, page, debounce);
        if (res.success === true) {
          const { category, total, total_pages } = res.data;
          const transformedCategories = category.map((cat) => {
            return {
              id: cat.id,
              name: cat.category_name,
              image: cat.category_image,
            };
          });
          setTotalDetails({
            total : total,
            total_pages : total_pages
          })
          setCategories(transformedCategories);
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
    };
    getCategory();
  }, [limit, page, debounce, reload]);


  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setOpenDeleteModal(true);
  };

  const openSubcategories = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div
      className={` h-full w-[50%] p-4 border-r border-gray-300 ${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      }`}
    >
      <div className="font-bold text-2xl mb-6">Categories</div>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search category..."
          className={`flex-1 p-2 px-4 rounded-md focus:outline-none ${
            theme
              ? "bg-white text-zinc-700 shadow-sm"
              : "bg-zinc-800 text-zinc-200 shadow-sm"
          }`}
        />
        <button
          onClick={() => setOpenAddModal(true)}
          className={`p-2 px-6 rounded-md font-medium  hover:bg-green-600 hover:text-white cursor-pointer ${
            theme
              ? "text-green-600 border border-green-600"
              : "text-green-500 border border-green-500"
          }`}
        >
          Add
        </button>
      </div>

      <div
        className={`rounded-lg ${
          theme ? "bg-white text-gray-800" : "bg-zinc-800 text-white"
        }`}
      >
        <div
          className={`grid border-b border-gray-200 last:border-b-0 px-3 text-sm py-2 font-semibold grid-cols-[1fr_8fr_1.5fr] 
            ${theme ? "text-[#4110a2]" : "text-[#b898fa]"}`}
        >
          <div>Image</div>
          <div>Category Name</div>
          <div>Actions</div>
        </div>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => openSubcategories(cat)}
            className={`grid grid-cols-[1fr_8fr_1.5fr] items-center px-4 py-2 border-b border-gray-200 cursor-pointer   ${
              selectedCategory.id === cat.id
                ? theme
                  ? "bg-violet-200"
                  : "bg-[#7e50da] text-white"
                : theme
                ? " hover:bg-violet-100"
                : " hover:bg-violet-100 hover:text-black"
            }`}
          >
            <div className=" w-8 h-8 rounded-sm bg-gray-200"></div>
            <span className="text-sm font-semibold">{cat.name}</span>
            <div className="text-center flex items-center gap-2 font-medium ">
              <button
                className={`${
                  theme
                    ? "text-green-600 hover:text-green-700"
                    : "text-green-400 hover:text-green-700"
                }`}
                onClick={(e) => handleEdit(cat)}
              >
                <Edit />
              </button>
              <button
                className={` hover:text-red-600 ${
                  theme ? "text-red-500" : "text-red-500"
                }`}
                onClick={(e) => handleDelete(cat)}
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
      <AddCategory
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        setCategories={setCategories}
        setReload={setReload}
      />
      <EditCategory
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        categoryToEdit={categoryToEdit}
        setCategories={setCategories}
        setReload={setReload}
      />
      <DeleteCategoryModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        categoryToDelete={categoryToDelete}
        categories={categories}
        setCategories={setCategories}
        setReload={setReload}
      />
    </div>
  );
};

export default CategoriesPage;
