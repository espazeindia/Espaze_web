import React, { useState } from "react";

const ProductDetails = ({ product, onToggleVisibility }) => {
  const [isVisible, setIsVisible] = useState(product?.visible ?? true);

  const handleToggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    if (onToggleVisibility) onToggleVisibility(product._id, newVisibility);
  };

  if (!product) {
    return (
      <div className="p-4 text-center text-gray-500">
        No product details available.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {product.name}
      </h2>

      <div className="space-y-3">
        <p>
          <span className="font-medium text-gray-700">Category:</span>{" "}
          {product.categoryName || "N/A"}
        </p>

        <p>
          <span className="font-medium text-gray-700">Subcategory:</span>{" "}
          {product.subcategoryName || "N/A"}
        </p>

        <p>
          <span className="font-medium text-gray-700">Price:</span> ₹
          {product.price}
        </p>

        <p>
          <span className="font-medium text-gray-700">Description:</span>{" "}
          {product.description || "No description available"}
        </p>
      </div>

      {/* Visibility Toggle */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleToggleVisibility}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
            isVisible
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {isVisible ? "Visible" : "Hidden"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
