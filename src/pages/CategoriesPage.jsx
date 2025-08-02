import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMode } from "../contexts/themeModeContext";
import SubcategoryModal from "../components/modal/SubcategoryModal";
import AddCategory from "../components/modal/AddCategory";
import EditCategory from "../components/modal/EditCategory";
import DeleteCategoryModal from "../components/modal/DeleteCategoryModal";

const CategoriesPage = () => {
  const { theme } = useMode();

  const [categories, setCategories] = useState([
    { id: 1, name: "Fruits & Vegetables" },
    { id: 2, name: "Books" },
    { id: 3, name: "Home Appliances" },
    { id: 4, name: "Fashion" },
  ]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEdit = (id, e) => {
    e.stopPropagation();
    const category = categories.find((cat) => cat.id === id);
    setCategoryToEdit(category);
    setOpenEditModal(true);
    setShowSubcategories(false);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const category = categories.find((cat) => cat.id === id);
    setCategoryToDelete(category);
    setOpenDeleteModal(true);
    setShowSubcategories(false);
  };

  const openSubcategories = (category) => {
    setSelectedCategory(category);
    setShowSubcategories(true);
  };

  const closeSubcategories = () => {
    setShowSubcategories(false);
    setSelectedCategory(null);
  };

  return (
    <div
      className={`p-5 h-full flex ${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      }`}
    >
      <div>
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

        <AddCategory
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
          setCategories={setCategories}
        />

        <div
          className={`rounded-lg overflow-hidden ${
            theme ? "bg-white text-gray-800" : "bg-zinc-800 text-white"
          }`}
        >
          {categories
            .filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()))
            .map((cat) => (
              <div
                key={cat.id}
                onClick={() => openSubcategories(cat)}
                className={`flex justify-between items-center px-4 py-3 border-b cursor-pointer hover:bg-zinc-100 ${
                  theme ? "border-zinc-300" : "border-zinc-700"
                }`}
              >
                <span className="text-base">{cat.name}</span>
                <div className="flex gap-3">
                  <FaEdit
                    onClick={(e) => handleEdit(cat.id, e)}
                    className="text-green-600 cursor-pointer hover:text-green-800"
                    size={16}
                  />
                  <FaTrash
                    onClick={(e) => handleDelete(cat.id, e)}
                    className="text-red-600 cursor-pointer hover:text-red-800"
                    size={16}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {showSubcategories && selectedCategory && (
        <>
          <div className="fixed inset-0 bg-gray-100 opacity-70 z-40" onClick={closeSubcategories} />
          <SubcategoryModal category={selectedCategory} onClose={closeSubcategories} />
        </>
      )}
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
