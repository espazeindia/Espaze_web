import React, { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Added:", formData);
    alert("✅ Product Added Successfully!");
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-white/30">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          ➕ Add New Product
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label className="block text-white font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-white font-medium mb-2">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-white font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none"
              required
            >
              <option value="" className="text-black">Select category</option>
              <option value="Electronics" className="text-black">Electronics</option>
              <option value="Fashion" className="text-black">Fashion</option>
              <option value="Books" className="text-black">Books</option>
              <option value="Other" className="text-black">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="3"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none"
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-white font-medium mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste product image URL"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="flex justify-center">
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-xl shadow-md border-2 border-white/40"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transform transition duration-300"
          >
            🚀 Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
