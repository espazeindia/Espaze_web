import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react"; // 👁️ icons
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
  const [reload, setReload] = useState(false);

  const fetchProduct = async (pid) => {
    try {
      setLoading(true);
      const result = await MetaDataServices.FetchMetadataById(pid);
      if (result.success) {
        const data = result.data;
        setProduct({
          id: data.id,
          hsn_code: data.hsn_code,
          name: data.name,
          description: data.description,
          image: data.image,
          category_id: data.category_id,
          subcategory_id: data.subcategory_id,
          mrp: data.mrp,
          category_name: data.category_name,
          subcategory_name: data.subcategory_name,
          total_stars: data.total_stars,
          total_reviews: data.total_reviews,
          m_date: data.manufacturing_date,
          e_date: data.expiry_date,
          visible: data.visible,
        });
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
        const data = result.data;
        setProduct({
          id: data.inventory_product_id,
          hsn_code: data.metadata_hsn_code,
          name: data.metadata_name,
          description: data.metadata_description,
          image: data.metadata_image,
          category_id: data.metadata_category_id,
          subcategory_id: data.metadata_subcategory_id,
          mrp: data.metadata_mrp,
          category_name: data.metadata_category_name,
          subcategory_name: data.metadata_subcategory_name,
          total_stars: data.metadata_total_stars,
          total_reviews: data.metadata_total_reviews,
          visible: data.product_visibility,
          quantity: data.product_quantity,
          price: data.product_price,
          e_date: data.product_expiry_date,
          m_date: data.product_manufacturing_date,
        });
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
  }, [id, reload]);

  // 🔘 Toggle product visibility
  const toggleVisibility = () => {
    setProduct((prev) => ({ ...prev, visible: !prev.visible }));
    notifySuccess(`Product is now ${!product.visible ? "Visible" : "Hidden"}`);
  };

  const containerBG = theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white";
  const cardBG = theme ? "bg-white text-black" : "bg-zinc-800 text-white";
  const subText = theme ? "text-zinc-600" : "text-zinc-300";
  const muted = theme ? "text-zinc-500" : "text-zinc-400";
  const borderClr = theme ? "border-zinc-200" : "border-zinc-700";

  return (
    <div className={`p-5 min-h-screen flex justify-center items-start ${containerBG}`}>
      <div className={`w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg border ${borderClr} ${cardBG}`}>
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b">
          <button
            onClick={() => navigate("/product-onboarding")}
            className={`p-2 rounded-lg border ${borderClr} hover:bg-zinc-100 dark:hover:bg-zinc-700 transition`}
            aria-label="Back"
          >
            <FaArrowLeft size={18} />
          </button>
          <h1 className="font-bold text-xl">Product Details</h1>
        </div>

        {!product ? (
          <div className={`text-center py-16 ${muted}`}>No product found</div>
        ) : (
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Product Image */}
            <div className="lg:w-1/3 w-full p-6 flex justify-center items-center border-r">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-64 h-64 object-cover rounded-xl border shadow-md"
                />
              ) : (
                <div className="w-64 h-64 flex items-center justify-center rounded-xl border border-dashed">
                  <span>No Image</span>
                </div>
              )}
            </div>

            {/* Right Side - Product Info */}
            <div className="lg:w-2/3 w-full p-6">
              {/* Name + Visibility Toggle */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <button
                  onClick={toggleVisibility}
                  className="flex items-center gap-2 px-3 py-1 rounded-md border text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
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

              {/* Price Section */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {product.price && (
                  <span className="text-2xl font-semibold text-emerald-600">
                    ₹{product.price}
                  </span>
                )}
                {product.mrp && (
                  <span className={`${muted}`}>Seller's Price: ₹{product.mrp}</span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className={`mt-4 leading-relaxed ${subText}`}>{product.description}</p>
              )}

              {/* Divider */}
              <div className={`my-6 border-t ${borderClr}`} />

              {/* More Details */}
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                {/* Identifiers */}
                <div>
                  <h4 className="font-medium text-current mb-2">Identifiers</h4>
                  {product.id && <p>ID: {product.id}</p>}
                  {product.hsn_code && <p>HSN Code: {product.hsn_code}</p>}
                  {product.category_name && <p>Category: {product.category_name}</p>}
                  {product.subcategory_name && <p>Subcategory: {product.subcategory_name}</p>}
                </div>

                {/* Pricing & Stock */}
                <div>
                  <h4 className="font-medium text-current mb-2">Pricing & Stock</h4>
                  {product.mrp && <p>Seller's Price: ₹{product.mrp}</p>}
                  {product.price && <p>Price: ₹{product.price}</p>}
                  {product.quantity !== undefined && <p>Quantity: {product.quantity}</p>}
                  {product.visible !== undefined && <p>Visibility: {product.visible ? "Visible" : "Hidden"}</p>}
                </div>

                {/* Dates (without heading ✅) */}
                <div>
                  {product.m_date && <p>Manufacturing: {product.m_date}</p>}
                  {product.e_date && <p>Expiry: {product.e_date}</p>}
                </div>

                {/* Reviews */}
                <div>
                  <h4 className="font-medium text-current mb-2">Reviews</h4>
                  <p>Total Stars: {product.total_stars || 0}</p>
                  <p>Total Reviews: {product.total_reviews || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;

