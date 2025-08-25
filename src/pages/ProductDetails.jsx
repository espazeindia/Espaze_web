import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Eye, EyeOff, Star } from "lucide-react";
import { notifyError, notifySuccess } from "../utils/toast";
import { useMode } from "../contexts/themeModeContext";
import MetaDataServices from "../services/MetaDataServices";
import InventoryServices from "../services/InventoryServices";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useMode();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async (pid) => {
    try {
      setLoading(true);
      const result = await MetaDataServices.FetchMetadataById(pid);
      if (result.success) {
        setProduct(result.data);
      } else {
        notifyError(result.message || "Failed to fetch product details");
      }
    } catch (err) {
      if (err === "cookie error") {
        notifyError("Cookie error, please relogin and try again");
        navigate("/login");
      } else {
        notifyError(err?.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchInventory = async (pid) => {
    try {
      setLoading(true);
      const result = await InventoryServices.FetchInventoryById(pid);
      if (result.success) {
        setProduct(result.data);
      } else {
        notifyError(result.message || "Failed to fetch product details");
      }
    } catch (err) {
      if (err === "cookie error") {
        notifyError("Cookie error, please relogin and try again");
        navigate("/login");
      } else {
        notifyError(err?.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    if (id.includes("metadata_")) {
      fetchProduct(id.split("metadata_")[1]);
    } else if (id.includes("inventory_")) {
      fetchInventory(id.split("inventory_")[1]);
    }
  }, [id]);

  const toggleVisibility = () => {
    setProduct((prev) => ({ ...prev, visible: !prev.visible }));
    notifySuccess(`Product is now ${!product.visible ? "Visible" : "Hidden"}`);
  };

  const containerBG = theme ? "bg-gray-100" : "bg-neutral-950 text-white";
  const cardBG = theme ? "bg-white" : "bg-zinc-800 text-white";
  const borderClr = theme ? "border-gray-200" : "border-gray-700";

  return (
    <div className={`p-6 min-h-screen flex justify-center ${containerBG}`}>
      <div className={`w-full max-w-6xl rounded-xl shadow-md border ${borderClr} ${cardBG}`}>
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b">
          <button
            onClick={() => navigate("/product-onboarding")}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FaArrowLeft size={18} />
          </button>
          <h1 className="font-bold text-xl">Product Details</h1>
        </div>

        {!product ? (
          <div className="text-center py-12 text-gray-500">No product found</div>
        ) : (
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Image */}
              <div className="lg:w-1/3 flex justify-center items-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-72 h-72 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-72 h-72 flex items-center justify-center rounded-lg border border-dashed text-gray-500">
                    <span>No Image Available</span>
                  </div>
                )}
              </div>

              {/* Right Details */}
              <div className="lg:w-2/3">
                {/* Name + Visibility */}
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-semibold">{product.name}</h2>
                  <button
                    onClick={toggleVisibility}
                    className="flex items-center gap-2 px-3 py-1 rounded-md border text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {product.visible ? (
                      <>
                        <Eye size={16} /> Visible
                      </>
                    ) : (
                      <>
                        <EyeOff size={16} /> Hidden
                      </>
                    )}
                  </button>
                </div>

                {/* Reviews */}
                <div className="flex items-center gap-2 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < (product.total_stars || 0) ? "text-yellow-500" : "text-gray-300"}
                      fill={i < (product.total_stars || 0) ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="text-gray-500 text-sm">({product.total_reviews || 0})</span>
                </div>

                {/* Price */}
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {product.mrp && (
                    <span className="line-through text-gray-400">₹{product.mrp}</span>
                  )}
                  {product.price && (
                    <span className="text-2xl font-bold text-emerald-600">₹{product.price}</span>
                  )}
                  {product.category_name && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      {product.category_name}
                    </span>
                  )}
                  {product.subcategory_name && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {product.subcategory_name}
                    </span>
                  )}
                  {product.quantity === 0 && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      Out of Stock
                    </span>
                  )}
                  {product.hsn_code && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      HSN: {product.hsn_code}
                    </span>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t my-6" />

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className={`p-4 rounded-lg border ${borderClr}`}>
                <h4 className="font-semibold mb-2">Identifiers</h4>
                <p>ID: {product.id}</p>
                <p>HSN Code: {product.hsn_code}</p>
                <p>Category ID: {product.category_id}</p>
                <p>Subcategory ID: {product.subcategory_id}</p>
              </div>

              <div className={`p-4 rounded-lg border ${borderClr}`}>
                <h4 className="font-semibold mb-2">Pricing & Stock</h4>
                <p>MRP: ₹{product.mrp}</p>
                <p>Price: ₹{product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Visibility: {product.visible ? "Visible" : "Hidden"}</p>
              </div>

              <div className={`p-4 rounded-lg border ${borderClr}`}>
                <h4 className="font-semibold mb-2">Dates</h4>
                <p>Manufacturing: {product.manufacturing_date}</p>
                <p>Expiry: {product.expiry_date}</p>
              </div>

              <div className={`p-4 rounded-lg border ${borderClr}`}>
                <h4 className="font-semibold mb-2">Reviews</h4>
                <p>Total Stars: {product.total_stars || 0}</p>
                <p>Total Reviews: {product.total_reviews || 0}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Edit
              </button>
              <button className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
