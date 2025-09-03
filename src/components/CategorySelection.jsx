import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import CategoryServices from "../services/CategoryServices";
import { notifyError } from "../utils/toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


async function saveSelectionToBackend({ categoryIds = [], subcategoryNames = [] }) {
  if (CategoryServices?.SaveSellerSelection) {
    return await CategoryServices.SaveSellerSelection({
      categories: categoryIds,
      subcategories: subcategoryNames,
    });
  }
  if (CategoryServices?.SaveSelectedCategories) {
    return await CategoryServices.SaveSelectedCategories({
      categories: categoryIds,
      subcategories: subcategoryNames,
    });
  }

  // Fallback: replace with your real endpoint
  const res = await fetch("/api/seller/selected-categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      categories: categoryIds,
      subcategories: subcategoryNames,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to save selection");
  }
  return res.json().catch(() => ({}));
}


const CategoryView = ({ setCategories, setLoadingCats }) => {
  const router = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoadingCats(true);

        // ==== LIVE BACKEND CALL (comment this block to disable) ====
        const res = await CategoryServices.FetchCategory(50, 0, "");
        if (res?.success === true) {
          const { category } = res.data || {};
          const transformed =
            (category || []).map((cat) => ({
              id: cat.id,
              name: cat.category_name,
              image: cat.category_image,
            })) ?? [];
          setCategories(transformed);
        }
        
      } catch (err) {
        if (err === "cookie error") {
          Cookies.remove("EspazeCookie");
          router("/login");
          notifyError("Cookie error, please relogin and try again");
        } else {
          notifyError(err?.response?.data?.message || err?.message);
        }
      } finally {
        setLoadingCats(false);
      }
    };
    getCategories();
  }, [router, setCategories, setLoadingCats]);

  return null; // no UI change
};


const SubCategoryView = ({
  addedCategoryIds,                 
  selectedCategoryObjects = [],     
  onSave,                           
}) => {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // subcategory pills
  const [loadingSubs, setLoadingSubs] = useState(false);
  const router = useNavigate();

  // useEffect(() => {
  //   const getSubcategories = async () => {
  //     // if nothing staged via "Add", clear
  //     if (!addedCategoryIds.length) {
  //       setSubcategories([]);
  //       setSelectedItems([]);
  //       return;
  //     }

  //     try {
  //       setLoadingSubs(true);

  //       // ==== LIVE BACKEND CALL (comment this block to disable) ====
  //       // Fetch subs for ADDED categories (not just checked)
  //       const allResults = await Promise.all(
  //         addedCategoryIds.map((catId) =>
  //           CategoryServices.FetchSubcategory(50, 0, "", catId)
  //         )
  //       );

  //       let merged = [];
  //       allResults.forEach((res) => {
  //         if (res?.success === true) {
  //           const { sub_category } = res.data || {};
  //           merged = [
  //             ...merged,
  //             ...(sub_category || []).map((sub) => ({
  //               id: sub.id,
  //               name: sub.subcategory_name,
  //               image: sub.subcategory_image,
  //               categoryOfSub: sub.category_id,
  //             })),
  //           ];
  //         }
  //       });

  //       setSubcategories(merged);
  //     
  //     } catch (err) {
  //       if (err === "cookie error") {
  //         Cookies.remove("EspazeCookie");
  //         router("/login");
  //         notifyError("Cookie error, please relogin and try again");
  //       } else {
  //         notifyError(err?.response?.data?.message || err?.message);
  //       }
  //     } finally {
  //       setLoadingSubs(false);
  //     }
  //   };

  //   getSubcategories();
  // }, [addedCategoryIds, router]);

  // Toggle select/unselect for subcategory pill
  const toggleItem = (itemName) => {
    setSelectedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((i) => i !== itemName)
        : [...prev, itemName]
    );
  };

  // Decide what to render on the right:
  // - If subcategories exist (and fetch not commented), render them (clickable).
  // - Else, render the ADDED categories as read-only pills (fallback).
  const showFallbackCategories =
    !loadingSubs && subcategories.length === 0 && selectedCategoryObjects.length > 0;

  const headerText =
    showFallbackCategories || subcategories.length > 0 ? "Selected Category" : "";

  return (
    <div className="flex flex-col p-6 bg-white">
      <h2 className="text-lg font-semibold mb-4">{headerText}</h2>

      <div className="flex flex-wrap gap-3 mb-6 overflow-y-auto flex-1">
        {loadingSubs ? (
          <span className="text-gray-500">Loading subcategories...</span>
        ) : showFallbackCategories ? (
          // ===== Fallback: show staged categories as pills (read-only) =====
          selectedCategoryObjects.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-2 px-3 py-1 rounded-full border text-sm 
                         bg-gray-100 text-gray-600 border-gray-300"
              title={cat.name}
            >
              <span>{cat.name}</span>
            </div>
          ))
        ) : subcategories.length > 0 ? (
          subcategories.map((sub) => {
            const isSelected = selectedItems.includes(sub.name);
            return (
              <div
                key={sub.id}
                onClick={() => toggleItem(sub.name)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm cursor-pointer transition 
                  ${
                    isSelected
                      ? "bg-violet-600 text-white border-violet-700"
                      : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                  }`}
              >
                <span>{sub.name}</span>
                {isSelected && <X size={14} className="ml-1" />}
              </div>
            );
          })
        ) : (
          <div className="text-gray-400">No items available</div>
        )}
      </div>

      {/* Save & Continue*/}
      <div className="flex justify-center mt-70">
        <button
          className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:scale-105 transition disabled:opacity-50"
          disabled={selectedItems.length === 0 && addedCategoryIds.length === 0}
          onClick={() =>
            onSave?.({
              categoryIds: addedCategoryIds,
              subcategoryNames: selectedItems,
            })
          }
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};


const CategoriesAndSubcategories = () => {
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]); // left table checkboxes
  const [addedCategoryIds, setAddedCategoryIds] = useState([]);   // staged via "Add"
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [loadingCats, setLoadingCats] = useState(false);
  const [saving, setSaving] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalResults = filteredCategories.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredCategories.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const toggleCheckbox = (id) => {
    setCheckedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    if (checkedCategories.length === 0) return;
    setAddedCategoryIds((prev) => {
      const s = new Set(prev);
      checkedCategories.forEach((id) => s.add(id));
      return Array.from(s);
    });
  };

  const handleSave = async ({ categoryIds, subcategoryNames }) => {
    if ((categoryIds?.length ?? 0) === 0 && (subcategoryNames?.length ?? 0) === 0) {
      notifyError("Please select at least one category or subcategory.");
      return;
    }
    try {
      setSaving(true);
      await saveSelectionToBackend({
        categoryIds,
        subcategoryNames,
      });
      // success toast here if you have it
      // notifySuccess("Saved successfully");
    } catch (err) {
      if (err === "cookie error") {
        Cookies.remove("EspazeCookie");
        notifyError("Cookie error, please relogin and try again");
      } else {
        notifyError(err?.response?.data?.message || err?.message || "Failed to save");
      }
    } finally {
      setSaving(false);
    }
  };

  // Build objects for fallback pills on the right side
  const stagedCategoryObjects = categories.filter((c) =>
    addedCategoryIds.includes(c.id)
  );

  return (
    <div className="flex h-screen">
      {/* Mount backend fetcher (comment out to disable category backend) */}
      <CategoryView
        setCategories={setCategories}
        setLoadingCats={setLoadingCats}
      />

      {/* Categories Section */}
      <div className="w-1/2 p-4 border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded hover:bg-gray-100">
              <ArrowLeft size={20} />
            </button>
            <h2 className="font-bold text-2xl">Categories</h2>
          </div>
          <button
            onClick={handleAdd}
            disabled={saving || checkedCategories.length === 0}
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:scale-105 transition disabled:opacity-50"
          >
            Add
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md
             focus:outline-none focus:ring-1 focus:ring-green-300
             text-gray-600 placeholder-gray-400"
          />
        </div>

        {/* Categories Table */}
        <div className="rounded-lg border border-gray-200 overflow-y-auto">
          {/* Table Header */}
          <div className="grid border-b border-gray-200 px-3 text-sm py-2 font-semibold grid-cols-[1fr_1fr_8fr] text-[#4110a2]">
            <div>Select</div>
            <div>Image</div>
            <div>Category Name</div>
          </div>

        {/* Rows */}
        {loadingCats ? (
          <div className="p-4 text-gray-400">Loading categories...</div>
        ) : currentData.length > 0 ? (
          currentData.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`grid grid-cols-[1fr_1fr_8fr] items-center px-4 py-2 border-b border-gray-200 cursor-pointer transition
                ${
                  selectedCategory?.id === cat.id
                    ? "bg-purple-100"
                    : "hover:bg-gray-50"
                }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={checkedCategories.includes(cat.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleCheckbox(cat.id);
                }}
                className="w-4 h-4"
              />

              {/* Image */}
              <div className="w-8 h-8 rounded-sm bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                ) : (
                  "Img"
                )}
              </div>

              {/* Name */}
              <span className="text-sm font-semibold text-gray-700">
                {cat.name}
              </span>
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-400">No categories found</div>
        )}

          {/* Pagination - Like Image */}
          <div className="flex items-center justify-between mt-3 text-sm text-gray-600 px-4 py-2">
            <span>
              <strong className="text-purple-700">
                Showing {startIndex + 1} - {Math.min(startIndex + rowsPerPage, totalResults)}
              </strong>{" "}
              of <strong className="text-purple-700">{totalResults}</strong> Results
            </span>

            <div className="flex items-center gap-4">
              {/* Rows per page */}
              <label className="flex items-center gap-2">
                <span className="text-purple-700">Number of rows :</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-purple-400"
                >
                  {[5, 10, 20, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>

              {/* Page Controls */}
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center border text-black hover:bg-gray-100 disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  {currentPage}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center border text-black hover:bg-gray-100 disabled:opacity-40"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2">
        <SubCategoryView
          addedCategoryIds={addedCategoryIds}
          selectedCategoryObjects={stagedCategoryObjects}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default CategoriesAndSubcategories;
