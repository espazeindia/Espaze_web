import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import CategoryServices from "../../services/CategoryServices";
import { notifyError } from "../../utils/toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SubCategoryView = React.memo(({
  selectedCategory,
  selectedSubcategoryNames,
  onSelectionChange,
  saving,
  theme,
}) => {
  const [subcategories, setSubcategories] = useState([]);
  const [checkedSubcategories, setCheckedSubcategories] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const router = useNavigate();
  const [subSearch, setSubSearch] = useState("");
  const [subPage, setSubPage] = useState(0);
  const subLimit = 4;

  const filteredSubs = useMemo(() => {
    return subcategories.filter((sub) =>
      sub.name.toLowerCase().includes(subSearch.toLowerCase())
    );
  }, [subcategories, subSearch]);

  const totalSubPages = Math.max(1, Math.ceil(filteredSubs.length / subLimit));
  const pagedSubs = useMemo(() => {
    return filteredSubs.slice(subPage * subLimit, subPage * subLimit + subLimit);
  }, [filteredSubs, subPage, subLimit]);

  useEffect(() => {
    const getSubcategories = async () => {
      if (!selectedCategory?.id) {
        setSubcategories([]);
        return;
      }
      try {
        setLoadingSubs(true);
        const res = await CategoryServices.FetchSubcategory(50, 0, "", selectedCategory.id);
        if (res?.success === true) {
          const { sub_category } = res.data || {};
          const mapped = (sub_category || []).map((sub) => ({
            id: sub.id,
            name: sub.subcategory_name,
            image: sub.subcategory_image,
            categoryOfSub: sub.category_id,
          }));
          setSubcategories(mapped);
        } else {
          setSubcategories([]);
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
        setLoadingSubs(false);
      }
    };
    getSubcategories();
  }, [selectedCategory, router]);

  const toggleSubcategoryCheckbox = useCallback((subName) => {
    setCheckedSubcategories((prev) =>
      prev.includes(subName)
        ? prev.filter((name) => name !== subName)
        : [...prev, subName]
    );
  }, [setCheckedSubcategories]);

  const handleAddSubcategories = useCallback(() => {
    onSelectionChange((prev) => {
      const newSelected = new Set([...prev, ...checkedSubcategories]);
      return Array.from(newSelected);
    });
    setCheckedSubcategories([]);
  }, [onSelectionChange, checkedSubcategories]);

  const headerText = selectedCategory?.name ? selectedCategory.name : "Subcategories";

  return (
    <div className={`flex flex-col p-4 h-full overflow-hidden ${theme ? "bg-white" : "bg-transparent"}`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-2xl">{headerText}</h2>
        <button
          onClick={handleAddSubcategories}
          disabled={saving || checkedSubcategories.length === 0}
          className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:scale-105 transition disabled:opacity-50"
        >
          Add
        </button>
      </div>
      <div className="relative w-full mb-3">
        <Search className={`absolute left-3 top-2.5 ${theme ? "text-gray-400" : "text-neutral-400"}`} size={18} />
        <input
          type="text"
          placeholder="Search subcategories..."
          className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-300 ${theme ? "border-gray-300 text-gray-600 placeholder-gray-400 bg-white" : "border-neutral-600 text-neutral-300 placeholder-neutral-500 bg-zinc-800"}`}
          value={subSearch}
          onChange={(e) => {
            setSubSearch(e.target.value);
            setSubPage(0);
          }}
        />
      </div>

      <div className={`rounded-lg border ${theme ? "border-gray-200" : "border-neutral-700"}`} >
        <div className={`grid border-b px-3 text-sm py-2 font-semibold grid-cols-[1fr_8fr_1.5fr] ${theme ? "text-[#4110a2] border-gray-200" : "text-[#b898fa] border-neutral-700"}`}>
          <div>Image</div>
          <div>Subcategory Name</div>
          <div></div>
        </div>
        {loadingSubs ? (
          <div className={`p-4 ${theme ? "text-gray-400" : "text-neutral-400"}`}>Loading subcategories...</div>
        ) : pagedSubs.length > 0 ? (
          <div>
            {pagedSubs.map((sub) => {
              const isChecked = checkedSubcategories.includes(sub.name);
              const isAlreadyAdded = selectedSubcategoryNames.includes(sub.name);
              return (
                <div
                  key={sub.id}
                  className={`grid grid-cols-[1fr_8fr_1.5fr] items-center px-4 py-2 border-b ${theme ? "border-gray-200" : "border-neutral-700"} ${
                    isAlreadyAdded ? (theme ? "bg-gray-100" : "bg-neutral-700") : (theme ? "hover:bg-gray-50" : "hover:bg-neutral-700 hover:text-white")
                  }`}
                >
                  <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs ${theme ? "bg-gray-200 text-gray-500" : "bg-neutral-700 text-neutral-400"}`}>
                    Img
                  </div>
                  <div className={`ml-3 flex-1 text-sm font-medium ${theme ? "text-gray-800" : "text-neutral-300"}`}>{sub.name}</div>
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked || isAlreadyAdded}
                      disabled={isAlreadyAdded}
                      onChange={() => toggleSubcategoryCheckbox(sub.name)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`p-4 ${theme ? "text-gray-400" : "text-neutral-400"}`}>Select a category to view subcategories</div>
        )}
        {/* Pagination controls */}
        {filteredSubs.length > 0 && (
          <div className={`flex items-center justify-end gap-2 px-3 py-2 ${theme ? "bg-white" : "bg-zinc-800"}`}>
            <button
              className={`p-1 rounded disabled:opacity-50 ${theme ? "hover:bg-gray-100" : "hover:bg-neutral-700"}`}
              onClick={() => setSubPage((p) => Math.max(0, p - 1))}
              disabled={subPage <= 0}
              aria-label="Previous"
            >
              <ChevronLeft size={18} className={`${theme ? "text-black" : "text-white"}`} />
            </button>
            <div className={`text-sm ${theme ? "text-gray-600" : "text-neutral-300"}`}>
              {subPage + 1} / {totalSubPages}
            </div>
            <button
              className={`p-1 rounded disabled:opacity-50 ${theme ? "hover:bg-gray-100" : "hover:bg-neutral-700"}`}
              onClick={() => setSubPage((p) => Math.min(totalSubPages - 1, p + 1))}
              disabled={subPage >= totalSubPages - 1}
              aria-label="Next"
            >
              <ChevronRight size={18} className={`${theme ? "text-black" : "text-white"}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default SubCategoryView;
