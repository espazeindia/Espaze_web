import React, { useState, useEffect } from "react";
import CategoryView from "../components/views/categorySubCategoryView/CategoryView";
import SubCategoryView from "../components/views/categorySubCategoryView/SubCategoryPaginatedView";

function AddCategoriesSubcategories() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if(categories.length>0) {
      setSelectedCategory(categories[0]);
    }
    else{
      setSelectedCategory("")
    }
  }, [categories]);

  return (
    <div className=" h-full flex">
      <CategoryView
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <SubCategoryView key={selectedCategory} category={selectedCategory} />
    </div>
  );
}

export default AddCategoriesSubcategories;
