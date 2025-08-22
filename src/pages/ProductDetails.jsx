import React from "react";

const ProductDetails = ({ product }) => {
  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
        No product selected
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Product Image */}
        <div className="h-80 bg-gray-100 flex items-center justify-center">
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.name}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <p className="text-2xl font-semibold text-green-600">
            ₹{product.price}
          </p>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Key Features:
            </h2>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              {product.features?.map((feature, index) => (
                <li
                  key={index}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105">
              Add to Cart
            </button>
            <button className="px-6 py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
