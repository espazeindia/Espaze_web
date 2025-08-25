import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ProductDetails = () => {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [showPrice, setShowPrice] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.productName) newErrors.productName = "Product name is required.";
    if (!formData.price) newErrors.price = "Price is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Product details saved successfully!");
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Product Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
            )}
          </div>

          {/* Price with Visibility Toggle */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <div className="relative">
              <input
                type={showPrice ? "text" : "password"}
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter price"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPrice(!showPrice)}
              >
                {showPrice ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
