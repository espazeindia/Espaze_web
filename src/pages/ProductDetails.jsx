import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Eye, EyeOff, Image as ImageIcon, Star } from "lucide-react";
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

  // ---------- API ----------
  const fetchProduct = async (pid) => {
    try {
      setLoading(true);
      const result = await MetaDataServices.FetchMetadataById(pid);
      if (result.success) {
        const d = result.data;
        setProduct({
          id: d.id,
          hsn_code: d.hsn_code,
          name: d.name,
          description: d.description,
          image: d.image,
          category_name: d.category_name,
          subcategory_name: d.subcategory_name,
          mrp: d.mrp,
          total_stars: d.total_stars,
          total_reviews: d.total_reviews,
          m_date: d.manufacturing_date,
          e_date: d.expiry_date,
          visible: d.visible,
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
        const d = result.data;
        setProduct({
          id: d.inventory_product_id,
          hsn_code: d.metadata_hsn_code,
          name: d.metadata_name,
          description: d.metadata_description,
          image: d.metadata_image,
          category_name: d.metadata_category_name,
          subcategory_name: d.metadata_subcategory_name,
          mrp: d.metadata_mrp,
          total_stars: d.metadata_total_stars,
          total_reviews: d.metadata_total_reviews,
          visible: d.product_visibility,
          quantity: d.product_quantity,
          price: d.product_price,
          e_date: d.product_expiry_date,
          m_date: d.product_manufacturing_date,
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

  // ---------- Visibility Toggle (UI only) ----------
  const toggleVisibility = () => {
    setProduct((p) => ({ ...p, visible: !p.visible }));
    notifySuccess(`Product is now ${!product.visible ? "Visible" : "Hidden"}`);
  };

  // ---------- Theme helpers ----------
  const containerBG = theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white";
  const cardBG = theme ? "bg-white text-black" : "bg-zinc-800 text-white";
  const subText = theme ? "text-zinc-600" : "text-zinc-300";
  const muted = theme ? "text-zinc-500" : "text-zinc-400";
  const borderClr = theme ? "border-zinc-200" : "border-zinc-700";

  // ---------- Small UI helpers ----------
  const Badge = ({ children, className = "" }) => (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${className}`}
    >
      {children}
    </span>
  );

  const Stars = ({ count = 0 }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < count ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}
        />
      ))}
    </div>
  );

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
            {/* === Top: Image + Info (ditto layout) === */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image Box */}
              <div className="lg:w-1/3 w-full">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 p-3 bg-zinc-50 dark:bg-zinc-900 h-60 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-600 text-gray-500">
                      <ImageIcon size={26} className="mb-2 text-gray-400" />
                      <span className="text-sm">No Image Available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:w-2/3 w-full">
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-bold">{product.name}</h2>

                  {/* Right-side badges: Visibility, Stock, HSN */}
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={
                        product.visible
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }
                    >
                      <button onClick={toggleVisibility} className="flex items-center gap-1">
                        {product.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                        {product.visible ? "Visible" : "Hidden"}
                      </button>
                    </Badge>

                    <Badge
                      className={
                        product.quantity && product.quantity > 0
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }
                    >
                      {product.quantity && product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>

                    {product.hsn_code && (
                      <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
                        HSN: {product.hsn_code}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stars + count */}
                <div className="flex items-center gap-2 mt-2">
                  <Stars count={product.total_stars || 0} />
                  <span className={`text-xs ${muted}`}>({product.total_reviews || 0})</span>
                </div>

                {/* Category chips */}
                <div className="flex items-center gap-2 mt-2">
                  {product.category_name && (
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                      {product.category_name}
                    </Badge>
                  )}
                  {product.subcategory_name && (
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                      {product.subcategory_name}
                    </Badge>
                  )}
                </div>

                {/* Price */}
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {product.price && (
                    <span className="text-2xl font-semibold text-emerald-600">
                      ₹{product.price}
                    </span>
                  )}
                  {product.mrp && (
                    <span className={`${muted}`}>Seller&apos;s Price: ₹{product.mrp}</span>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p className={`mt-4 leading-relaxed ${subText}`}>{product.description}</p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className={`my-6 border-t ${borderClr}`} />

            {/* === More Details === */}
            <div className={`rounded-xl border ${borderClr} p-5`}>
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
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-md p-4 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Pricing & Stock</h4>
                  <div className="space-y-2 text-gray-700">
                    {product.mrp && (
                      <p>
                        <span className="font-medium">Seller&apos;s Price:</span>{" "}
                        <span className="line-through text-red-500">₹{product.mrp}</span>
                      </p>
                    )}
                    {product.price && (
                      <p>
                        <span className="font-medium">Current Price:</span>{" "}
                        <span className="text-green-600 font-semibold">₹{product.price}</span>
                      </p>
                    )}
                    {product.quantity !== undefined && (
                      <p>
                        <span className="font-medium">Quantity Available:</span> {product.quantity}
                      </p>
                    )}
                    {product.visible !== undefined && (
                      <p>
                        <span className="font-medium">Visibility:</span>{" "}
                        {product.visible ? (
                          <span className="text-green-600 font-semibold">Visible</span>
                        ) : (
                          <span className="text-red-500 font-semibold">Hidden</span>
                        )}
                      </p>
                    )}
                  </div>
                </div>


                {/* Dates (heading removed intentionally) */}
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
