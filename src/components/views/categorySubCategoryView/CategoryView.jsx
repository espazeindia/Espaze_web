import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMode } from "../../../contexts/themeModeContext";
import AddCategory from "../../modal/AddCategory";
import EditCategory from "../../modal/EditCategory";
import DeleteCategoryModal from "../../modal/DeleteCategoryModal";

const CategoriesPage = ({ categories, setCategories, selectedCategory, setSelectedCategory }) => {
  const { theme } = useMode();

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

      <div
        className={`rounded-lg overflow-hidden ${
          theme ? "bg-white text-gray-800" : "bg-zinc-800 text-white"
        }`}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => openSubcategories(cat)}
            className={`flex justify-between items-center px-4 py-3 border-b cursor-pointer   ${
              selectedCategory.id === cat.id
                ? " bg-[#7e50da] text-white"
                : theme
                ? "border-zinc-300 hover:bg-zinc-100"
                : "border-zinc-700 hover:bg-zinc-100"
            }`}
          >
            <span className="text-base">{cat.name}</span>
            <div className="flex gap-3">
              <FaEdit
                onClick={(e) => handleEdit(cat)}
                className="text-green-600 cursor-pointer hover:text-green-800"
                size={16}
              />
              <FaTrash
                onClick={(e) => handleDelete(cat)}
                className="text-red-600 cursor-pointer hover:text-red-800"
                size={16}
              />
            </div>
          </div>
        ))}
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
