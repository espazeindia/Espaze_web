import React, { useState, useEffect } from "react";
import CategoryView from "../components/views/categorySubCategoryView/CategoryView";
import SubCategoryView from "../components/views/categorySubCategoryView/SubCategoryView";

function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([
    { id: 1, image: "", name: "Fruits & Vegetables" },
    { id: 2, image: "", name: "Books" },
    { id: 3, image: "", name: "Home Appliances" },
    { id: 4, image: "", name: "Fashion" },
  ]);

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, []);

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
