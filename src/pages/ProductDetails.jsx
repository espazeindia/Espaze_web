import React from "react";

const AddProduct = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-10 transition-all hover:scale-[1.01] hover:shadow-3xl duration-300">

        {/* Left: Image Placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-72 h-72 rounded-xl bg-gradient-to-r from-indigo-300 to-purple-300 flex items-center justify-center text-gray-700 font-medium shadow-md">
            No Image Available
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Product Name
          </h1>

          {/* Price */}
          <p className="text-2xl font-semibold text-indigo-600">₹ 2,499</p>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">
            This is a sample description of the product. It gives key highlights,
            specifications, and features. Make it attractive and simple for
            customers to understand.
          </p>

          {/* Features List */}
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-700">
              ✅ Feature 1
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              ✅ Feature 2
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              ✅ Feature 3
            </li>
          </ul>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 hover:scale-105 transition-all duration-300">
              Add to Cart
            </button>
            <button className="px-6 py-3 rounded-xl border border-gray-400 text-gray-800 font-semibold shadow-sm hover:bg-gray-100 hover:scale-105 transition-all duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
