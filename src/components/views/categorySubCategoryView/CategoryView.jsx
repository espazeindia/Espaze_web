import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMode } from "../../../contexts/themeModeContext";
import AddCategory from "../../modal/AddCategory";
import EditCategory from "../../modal/EditCategory";
import DeleteCategoryModal from "../../modal/DeleteCategoryModal";
import BottomPagination from "../../pagination/BottomPagination";

const CategoriesPage = ({ categories, setCategories, selectedCategory, setSelectedCategory }) => {
  const { theme } = useMode();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalDetails, setTotalDetails] = useState({ total: 24, total_pages: 4 });
  const [loading, setLoading] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [search, setSearch] = useState("");

  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setOpenEditModal(true);
  };

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
            theme ? "bg-white text-zinc-700 shadow-sm" : "bg-zinc-800 text-zinc-200 shadow-sm"
          }`}
        />
        <button
          onClick={() => setOpenAddModal(true)}
          className={`p-2 px-6 rounded-md font-medium ${
            theme
              ? "text-green-600 border border-green-600"
              : "text-green-500 border border-green-500"
          }`}
        >
          Add
        </button>
      </div>

      <div className={`rounded-lg ${theme ? "bg-white text-gray-800" : "bg-zinc-800 text-white"}`}>
        <div
          className={`grid px-3 py-2 font-semibold grid-cols-[1fr_8fr_1.5fr]`}
        >
          <div>Image</div>
          <div>Category Name</div>
          <div>Actions</div>
        </div>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => openSubcategories(cat)}
            className={`grid grid-cols-[1fr_8fr_1.5fr] items-center px-4 py-2 border-b cursor-pointer   ${
              selectedCategory.id === cat.id
                ? " bg-[#7e50da] text-white"
                : theme
                ? "border-zinc-300 hover:bg-zinc-100"
                : "border-zinc-700 hover:bg-zinc-100"
            }`}
          >
            <div className=" w-8 h-8 rounded-sm bg-gray-200"></div>
            <span className="text-lg">{cat.name}</span>
            <div className="flex items-center gap-3 ml-2">
              <FaEdit
                onClick={(e) => handleEdit(cat)}
                className="text-green-600 cursor-pointer hover:text-green-800"
                size={18}
              />
              <FaTrash
                onClick={(e) => handleDelete(cat)}
                className="text-red-600 cursor-pointer hover:text-red-800"
                size={18}
              />
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
      />
      <EditCategory
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        categoryToEdit={categoryToEdit}
        setCategories={setCategories}
      />
      <DeleteCategoryModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        data={categoryToDelete}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  );
};

export default CategoriesPage;
