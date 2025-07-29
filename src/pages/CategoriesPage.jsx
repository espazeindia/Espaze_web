import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { FaTrash, FaEdit } from "react-icons/fa";
import SubcategoryModal from "../components/modal/SubcategoryModal";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Fruits & Vegetables" },
    { id: 2, name: "Books" },
    { id: 3, name: "Human Appliances" },
    { id: 4, name: "Fashion" },
  ]);

  const [search, setSearch] = useState("");
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEdit = (id) => {
    const newName = prompt("Enter new category name:");
    if (newName) {
      setCategories(categories.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat)));
    }
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleAdd = () => {
    const newName = prompt("Enter new category name:");
    if (newName) {
      const newId = categories.length + 1;
      setCategories([...categories, { id: newId, name: newName }]);
    }
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
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Categories</h1>

      {/* Search & Add */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search category..."
          className="flex-grow border border-gray-300 p-2 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-100"
        >
          + Add
        </button>
      </div>

      {/* Category List */}
      <div className="space-y-2">
        {categories
          .filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()))
          .map((cat) => (
            <div
              key={cat.id}
              className="flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer"
              onClick={() => openSubcategories(cat)}
            >
              <span
                className="cursor-pointer text-gray-800 font-medium"
                
              >
                {cat.name}
              </span>
              <div className="flex gap-2">
                <FaEdit
                  onClick={() => handleEdit(cat.id)}
                  className="text-green-600 cursor-pointer hover:text-green-800"
                  size={16}
                />
                <FaTrash
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-600 cursor-pointer hover:text-red-800"
                  size={16}
                />
              </div>
            </div>
          ))}
      </div>

      {/* Subcategory Drawer */}
      {showSubcategories && selectedCategory && (
        <>
          {/* Light grey background overlay */}
          <div className="fixed inset-0 bg-gray-100 opacity-70 z-40" onClick={closeSubcategories} />

          {/* Actual side drawer */}
          <SubcategoryModal category={selectedCategory} onClose={closeSubcategories} />
        </>
      )}
    </div>
  );
};

export default CategoriesPage;
