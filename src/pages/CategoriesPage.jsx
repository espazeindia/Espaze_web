import React, { useState, useEffect } from "react";
import CategoryView from "../components/views/categorySubCategoryView/CategoryView";
import SubCategoryView from "../components/views/categorySubCategoryView/SubCategoryView";

function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log(categories)
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

export default CategoriesPage;