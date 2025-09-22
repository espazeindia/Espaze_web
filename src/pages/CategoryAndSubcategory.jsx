import React, { useState, useCallback } from "react";
import CategoryServices from "../services/CategoryServices";
import { notifyError } from "../utils/toast";
import Cookies from "js-cookie";
import { useMode } from "../contexts/themeModeContext";
import CategoryView from "../components/sections/CategoryList";
import SubCategoryView from "../components/sections/SubCategoryList";
import SelectedSubcategoriesDisplay from "../components/sections/SelectedSubCategory";

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

const CategoriesAndSubcategories = () => {
  const { theme } = useMode();
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingCats, setLoadingCats] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedSubcategoryNames, setSelectedSubcategoryNames] = useState([]);

  const handleAdd = useCallback(async () => {
    if (checkedCategories.length === 0) return;
  
    setSaving(true); // Indicate that an operation is in progress
    try {
      const fetchPromises = checkedCategories.map(async (categoryId) => {
        try {
          const res = await CategoryServices.FetchSubcategory(50, 0, "", categoryId);
          if (res?.success === true) {
            const { sub_category } = res.data || {};
            return (sub_category || []).map((sub) => sub.subcategory_name);
          }
        } catch (err) {
          notifyError(`Failed to fetch subcategories for category ID ${categoryId}`);
        }
        return []; // Return empty array on error to prevent Promise.all from failing
      });
  
      const results = await Promise.all(fetchPromises);
      const subcategoriesToAdd = results.flat(); // Flatten the array of arrays
  
      setSelectedSubcategoryNames((prev) => {
        const newSelected = new Set([...prev, ...subcategoriesToAdd]);
        return Array.from(newSelected);
      });
  
      setCheckedCategories([]);
    } finally {
      setSaving(false); // Reset saving state
    }
  }, [checkedCategories]);

  const handleSave = useCallback(async () => {
    if (selectedSubcategoryNames.length === 0) {
      notifyError("Please select at least one subcategory.");
      return;
    }

    const selectedSubcategoryNamesSet = new Set(selectedSubcategoryNames);
    const categoryIds = categories
      .filter(cat =>
        cat.subcategories?.some(sub => selectedSubcategoryNamesSet.has(sub.name))
      )
      .map(cat => cat.id);

    try {
      setSaving(true);
      await saveSelectionToBackend({
        categoryIds,
        subcategoryNames: selectedSubcategoryNames,
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
  }, [categories, selectedSubcategoryNames]);

  const handleRemoveSubcategory = useCallback((name) => {
    setSelectedSubcategoryNames(prev => prev.filter(item => item !== name));
  }, []);

  return (
    <div className={`flex flex-col h-full overflow-hidden ${theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"}`}>
      <div className="flex">
        <div className="w-1/2 border-r border-gray-200">
          <CategoryView
            categories={categories}
            setCategories={setCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            checkedCategories={checkedCategories}
            setCheckedCategories={setCheckedCategories}
            loadingCats={loadingCats}
            setLoadingCats={setLoadingCats}
            handleAdd={handleAdd}
            saving={saving}
            theme={theme}
          />
        </div>
        <div className="w-1/2">
        <SubCategoryView
            selectedCategory={selectedCategory}
            selectedSubcategoryNames={selectedSubcategoryNames}
            onSelectionChange={setSelectedSubcategoryNames}
            saving={saving}
            theme={theme}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 mt-4"></div>
      <SelectedSubcategoriesDisplay
        selectedSubcategoryNames={selectedSubcategoryNames}
        handleRemoveSubcategory={handleRemoveSubcategory}
        handleSave={handleSave}
        saving={saving}
        theme={theme}
      />
    </div>
  );
};

export default CategoriesAndSubcategories;
