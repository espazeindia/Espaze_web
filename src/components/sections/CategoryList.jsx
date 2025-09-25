import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import CategoryServices from "../../services/CategoryServices";
import { notifyError } from "../../utils/toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useMode } from "../../contexts/themeModeContext";
import BottomPagination from "../pagination/BottomPagination";
import { handleChangeDebounce } from "../../utils/useDebounce";

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

const CategoryView = React.memo(({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
  checkedCategories,
  setCheckedCategories,
  loadingCats,
  setLoadingCats,
  handleAdd,
  saving,
  theme,
}) => {
  const router = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const debounce = handleChangeDebounce(search);
  const [totalDetails, setTotalDetails] = useState(0);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoadingCats(true);

        const res = await CategoryServices.FetchCategory(limit, page, debounce);
        console.log("Categories fetched successfully", res.data);
        if (res?.success === true) {
          const { category, total } = res.data || {};
          const transformedCategories = await Promise.all(
            (category || []).map(async (cat) => {
              const subRes = await CategoryServices.FetchSubcategory(50, 0, "", cat.id);
              const subcategories = subRes?.success === true ?
                (subRes.data?.sub_category || []).map(sub => ({ id: sub.id, name: sub.subcategory_name })) : [];
              return {
                id: cat.id,
                name: cat.category_name,
                image: cat.category_image,
                subcategories: subcategories,
              };
            })
          );
          setCategories(transformedCategories);
          setTotalDetails(total);
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
  }, [router, setCategories, setLoadingCats, limit, page, debounce]);

  const toggleCheckbox = useCallback((id) => {
    setCheckedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  }, [setCheckedCategories]);

  return (
    <div className={`w-full p-4 border-r flex flex-col ${theme ? "bg-white border-gray-200" : "bg-neutral-950 border-neutral-700"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded ${theme ? "hover:bg-gray-100" : "hover:bg-neutral-700"}`}>
            <ArrowLeft size={20} className={`${theme ? "text-black" : "text-white"}`} />
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
        <Search className={`absolute left-3 top-2.5 ${theme ? "text-gray-400" : "text-neutral-400"}`} size={18} />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-300 ${theme ? "border-gray-300 text-gray-600 placeholder-gray-400 bg-white" : "border-neutral-600 text-neutral-300 placeholder-neutral-500 bg-zinc-800"}`}
        />
      </div>

      {/* Categories Table */}
      <div className={`rounded-lg border ${theme ? "border-gray-200" : "border-neutral-700"}`}>
        {/* Table Header */}
        <div className={`grid border-b px-3 text-sm py-2 font-semibold grid-cols-[1fr_8fr_1fr] ${theme ? "text-[#4110a2] border-gray-200" : "text-[#b898fa] border-neutral-700"}`}>
          <div>Image</div>
          <div>Category Name</div>
          <div></div>
        </div>

        {/* Rows */}
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat);
              }}
              className={`grid grid-cols-[1fr_8fr_1fr] items-center px-4 py-2 border-b cursor-pointer transition ${theme ? "border-gray-100" : "border-neutral-800"} ${
                selectedCategory?.id === cat.id ? (theme ? "bg-violet-200" : "bg-[#7e50da] text-white") : (theme ? "hover:bg-violet-100" : "hover:bg-neutral-700 hover:text-white")
              }`}
            >
              {/* Image */}
              <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs ${theme ? "bg-gray-200 text-gray-500" : "bg-neutral-700 text-neutral-400"}`}>
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
              <span className={`text-sm font-semibold truncate whitespace-nowrap ${theme ? "text-gray-700" : "text-neutral-300"}`}>
                {cat.name}
              </span>

              {/* Checkbox */}
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={checkedCategories.includes(cat.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleCheckbox(cat.id)}
                  }
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </div>
            </div>
          ))
        ) : (
          <div className={`p-4 ${theme ? "text-gray-400" : "text-neutral-400"}`}>No categories found</div>
        )}
        {/* Pagination controls */}
        <BottomPagination
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalDetails={totalDetails}
          loading={loadingCats}
        />
      </div>
    </div>
  );
});

export default CategoryView;