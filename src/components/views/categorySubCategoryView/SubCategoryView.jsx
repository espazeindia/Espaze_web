import React, { useEffect, useRef, useState } from "react";
import { useMode } from "../../../contexts/themeModeContext";
import CategoryServices from "../../../services/CategoryServices";
import { notifyError } from "../../../utils/toast";
import { handleChangeDebounce } from "../../../utils/useDebounce";

const SubcategoryModal = ({
  category,
  selectedSubcategoryIds,
  setSelectedSubcategoryIds,
  selectedCategoryIds,
  setSelectedCategoryIds,
  setSelectedSubcategories,
}) => {
  const { theme } = useMode();
  const [search, setSearch] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const debounce = handleChangeDebounce(search);

  useEffect(() => {
    const getSubcategory = async () => {
      setLoading(true);
      try {
        const res = await CategoryServices.FetchAllSubCategory(category.id, debounce);
        if (res.success) {
          const transSubcategory = (res.data || []).map((sub) => ({
            id: sub.id,
            name: sub.subcategory_name,
            image: sub.subcategory_image,
            categoryOfSub: sub.category_id,
          }));
          setSubcategories(transSubcategory);
        }
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
      }
      setLoading(false);
    };

    if (category.id) getSubcategory();
  }, [category.id, debounce]);

  const handleSubCategoryCheckbox = (subcategory, checked) => {
    if (checked) {
      setSelectedSubcategories((prevData) => [...prevData, subcategory]);
      setSelectedSubcategoryIds((prevData) => [...prevData, subcategory.id]);
    } else {
      setSelectedSubcategories((prevData) =>
        prevData.filter((subcat) => subcat.id !== subcategory.id)
      );
      setSelectedSubcategoryIds((prevData) => prevData.filter((subId) => subId !== subcategory.id));
    }
  };

  useEffect(() => {
    if (selectedSubcategoryIds?.length >= 0 && subcategories?.length) {
      const allSubCategories = subcategories.map((subcategoryId) => subcategoryId.id);
      const allSelected = allSubCategories.every((ids) => selectedSubcategoryIds.includes(ids));
      const categoryPresent = selectedCategoryIds.includes(category.id);

      if (allSelected && !categoryPresent) {
        setSelectedCategoryIds((prevData) => [...prevData, category.id]);
      } else if (categoryPresent && !allSelected) {
        setSelectedCategoryIds((prevData) => prevData.filter((id) => id !== category.id));
      }
    }
  }, [selectedSubcategoryIds, category.id]);

  useEffect(() => {
    if (selectedCategoryIds?.length >= 0 && subcategories?.length) {
      const allSubCategories = subcategories.map((subcategoryId) => subcategoryId.id);
      const allSelected = allSubCategories.every((ids) => selectedSubcategoryIds.includes(ids));
      const categoryPresent = selectedCategoryIds.includes(category.id);
      console.log(allSelected, categoryPresent);
      if (!allSelected && categoryPresent) {
        setSelectedSubcategories((prevData) => [
          ...prevData,
          ...subcategories.filter((subcat) => !prevData.some((item) => item.id === subcat.id)),
        ]);
        setSelectedSubcategoryIds((prevData) => [
          ...prevData,
          ...allSubCategories.filter((id) => !prevData.includes(id)),
        ]);
      } else if (allSelected && !categoryPresent) {
        setSelectedSubcategories((prevData) =>
          prevData.filter((subcat) => !allSubCategories.includes(subcat.id))
        );
        setSelectedSubcategoryIds((prevData) =>
          prevData.filter((ids) => !allSubCategories.includes(ids))
        );
      }
    }
  }, [selectedCategoryIds, category.id]);

  return (
    <div
      className={`h-full w-[50%] p-4 border-r border-gray-300 ${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      }`}
    >
      <h2 className="font-bold text-2xl mb-6">{category.name || "No Result for Sub-Category"}</h2>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search subcategory..."
          className={`flex-1 p-2 px-4 rounded-md focus:outline-none ${
            theme ? "bg-white text-zinc-700 shadow-sm" : "bg-zinc-800 text-zinc-200 shadow-sm"
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </div>

      <div className={`rounded-lg ${theme ? "bg-white text-gray-800" : "bg-zinc-800 text-white"}`}>
        <div
          className={`rounded-t-lg grid px-3 py-2 text-sm font-semibold grid-cols-[1fr_8fr_1.5fr] border-b border-gray-200 last:border-b-0 items-center ${
            theme ? "text-[#4110a2]" : "text-[#b898fa]"
          }`}
        >
          <div>Image</div>
          <div>Subcategory Name</div>
          <div>Actions</div>
        </div>
        <div className="max-h-[40vh] overflow-y-scroll sideBarNone">
          {!loading ? (
            subcategories.length > 0 ? (
              subcategories.map((sub) => (
                <div
                  key={sub.id}
                  className="grid grid-cols-[1fr_8fr_1.5fr] items-center px-4 py-2 border-b border-gray-200 last:border-b-0"
                >
                  <div className="w-8 h-8 rounded-sm bg-gray-200"></div>
                  <div className="text-sm font-semibold">{sub.name}</div>
                  <input
                    type="checkbox"
                    style={{ height: "15px" }}
                    onChange={(e) => handleSubCategoryCheckbox(sub, e.target.checked)}
                    checked={selectedSubcategoryIds.includes(sub.id)}
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-[50vh] flex justify-center items-center text-xl font-semibold">
                No Sub-Categories Found
              </div>
            )
          ) : (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="border-b h-12 border-gray-300 border-dotted w-full"></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryModal;
