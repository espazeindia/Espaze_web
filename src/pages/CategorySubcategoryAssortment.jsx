import React, { useState, useEffect } from "react";
import CategoryView from "../components/views/categorySubCategoryView/CategoryView";
import SubCategoryView from "../components/views/categorySubCategoryView/SubCategoryView";
import SelectedSubcategoriesDisplay from "../components/sections/SelectedSubCategory";

function CategorySubcategoryAssortment() {
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    } else {
      setSelectedCategory({});
    }
  }, [categories]);

  useEffect(() => {
    console.log(selectedSubcategoryIds, selectedSubcategories);
  }, [selectedSubcategoryIds, selectedSubcategories]);

  return (
    <div className=" h-full">
      <div className=" h-[70vh] flex">
        <CategoryView
          categories={categories}
          setCategories={setCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          assortment={true}
          selectedCategoryIds={selectedCategoryIds}
          setSelectedCategoryIds={setSelectedCategoryIds}
        />
        <SubCategoryView
          key={selectedCategory?.id || "none"}
          category={selectedCategory}
          assortment={true}
          selectedSubcategoryIds={selectedSubcategoryIds}
          setSelectedSubcategoryIds={setSelectedSubcategoryIds}
          selectedCategoryIds={selectedCategoryIds}
          setSelectedCategoryIds={setSelectedCategoryIds}
          setSelectedSubcategories={setSelectedSubcategories}
        />
      </div>
      <SelectedSubcategoriesDisplay
        selectedSubcategoryIds={selectedSubcategoryIds}
        setSelectedSubcategoryIds={setSelectedSubcategoryIds}
        selectedSubcategories={selectedSubcategories}
        setSelectedSubcategories={setSelectedSubcategories}
        setSelectedCategoryIds={setSelectedCategoryIds}
      />
    </div>
  );
}

export default CategorySubcategoryAssortment;
