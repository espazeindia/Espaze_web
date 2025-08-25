import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Eye, EyeOff, Image as ImageIcon } from "lucide-react"; // 👁️ + 🖼️ icon
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
        const data = result.data;
        setProduct({
          id: data.id,
          hsn_code: data.hsn_code,
          name: data.name,
          description: data.description,
          image: data.image,
          category_name: data.category_name,
          subcategory_name: data.subcategory_name,
          mrp: data.mrp,
          total_stars: data.total_stars,
          total_reviews: data.total_reviews,
          m_date: data.manufacturing_date,
          e_date: data.expiry_date,
          visible: data.visible,
        });
      } else notifyError(result.message || "Failed to fetch product details");
    } catch (err) {
      if (err === "cookie error") navigate("/login");
      else notifyError(err?.response?.data?.message || err.message);
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
          category_name: data.metadata_category_name,
          subcategory_name: data.metadata_subcategory_name,
          mrp: data.metadata_mrp,
          total_stars: data.metadata_total_stars,
          total_reviews: data.metadata_total_reviews,
          visible: data.product_visibility,
          quantity: data.product_quantity,
          price: data.product_price,
          e_date: data.product_expiry_date,
          m_date: data.product_manufacturing_date,
        });
      } else notifyError(result.message || "Failed to fetch product details");
    } catch (err) {
      if (err === "cookie error") navigate("/login");
      else notifyError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    if (id.includes("metadata_")) fetchProduct(id.split("metadata_")[1]);
    else if (id.includes("inventory_")) fetchInventory(id.split("inventory_")[1]);
  }, [id]);

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
    <div className={`p-5 min-h-full ${containerBG}`}>
      {/* Header */}
      <div className="flex items-center mb-5">
        <button
          onClick={() => navigate("/product-onboarding")}
          className={`mr-3 p-2 rounded-lg border ${borderClr} hover:bg-zinc-100 dark:hover:bg-zinc-700 transition`}
          aria-label="Back"
        >
          <FaArrowLeft size={18} />
        </button>
        <h1 className="font-bold text-xl">Product Details</h1>
      </div>

      {/* Card */}
      <div className={`rounded-2xl p-6 ${cardBG} border ${borderClr} shadow-md`}>
        {!product ? (
          <div className={`text-center py-16 ${muted}`}>No product found</div>
        ) : (
          <>
            {/* Image + Info */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3 w-full flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover rounded-xl border shadow-sm"
                  />
                ) : (
                  <div className="w-full h-60 flex flex-col items-center justify-center rounded-xl border border-dashed text-center text-sm text-gray-500">
                    <ImageIcon size={28} className="mb-2 text-gray-400" />
                    <span>No Image Available</span>
                  </div>
                )}
              </div>

              <div className="lg:w-2/3 w-full">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-2xl font-bold">{product.name}</h2>

                  {/* Visibility toggle */}
                  <button
                    onClick={toggleVisibility}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm shadow-sm ${
                      product.visible
                        ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                        : "bg-red-100 text-red-700 border-red-300"
                    }`}
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
                    <span className={`${muted} line-through`}>₹{product.mrp}</span>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p className={`mt-4 leading-relaxed ${subText}`}>
                    {product.description}
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className={`my-6 border-t ${borderClr}`} />

            {/* More Details */}
            <div className={`rounded-xl border ${borderClr} p-5 shadow-sm`}>
              <h3 className="font-semibold mb-4 text-lg">More Details</h3>
              <div className={`grid md:grid-cols-2 gap-6 text-sm ${subText}`}>
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
                  {product.visible !== undefined && (
                    <p>
                      Visibility:{" "}
                      <span className={product.visible ? "text-emerald-600" : "text-red-600"}>
                        {product.visible ? "Visible" : "Hidden"}
                      </span>
                    </p>
                  )}
                </div>

                {/* Dates (without heading) */}
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
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
