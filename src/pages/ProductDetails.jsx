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

  const transformProduct = (d, isInventory = false) => ({
    id: isInventory ? d.inventory_product_id : d.id,
    hsn_code: isInventory ? d.metadata_hsn_code : d.hsn_code,
    name: isInventory ? d.metadata_name : d.name,
    description: isInventory ? d.metadata_description : d.description,
    image: isInventory ? d.metadata_image : d.image,
    category_name: isInventory ? d.metadata_category_name : d.category_name,
    subcategory_name: isInventory ? d.metadata_subcategory_name : d.subcategory_name,
    mrp: isInventory ? d.metadata_mrp : d.mrp,
    total_stars: isInventory ? d.metadata_total_stars : d.total_stars,
    total_reviews: isInventory ? d.metadata_total_reviews : d.total_reviews,
    visible: isInventory ? d.product_visibility : d.visible,
    quantity: isInventory ? d.product_quantity : undefined,
    price: isInventory ? d.product_price : undefined,
    e_date: isInventory ? d.product_expiry_date : d.expiry_date,
    m_date: isInventory ? d.product_manufacturing_date : d.manufacturing_date,
  });

  const fetchProduct = async (pid) => {
    try {
      setLoading(true);
      const result = await MetaDataServices.FetchMetadataById(pid);
      if (result.success) {
        setProduct(transformProduct(result.data));
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
        setProduct(transformProduct(result.data, true));
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
    setProduct((p) => ({ ...p, visible: !p.visible }));
    notifySuccess(`Product is now ${!product.visible ? "Visible" : "Hidden"}`);
  };

  const containerBG = theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white";
  const cardBG = theme ? "bg-white text-black" : "bg-zinc-800 text-white";
  const subText = theme ? "text-zinc-600" : "text-zinc-300";
  const muted = theme ? "text-zinc-500" : "text-zinc-400";
  const borderClr = theme ? "border-zinc-200" : "border-zinc-700";

  const Badge = ({ children, className = "" }) => (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${className}`}
    >
      {children}
    </span>
  );

  const Stars = React.memo(({ count = 0 }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < count ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}
        />
      ))}
    </div>
  ));

  return (
    <div className={`p-5 min-h-full ${containerBG}`}>
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

      <div className={`rounded-2xl p-6 ${cardBG} border ${borderClr} shadow-md`}>
        {!product ? (
          <div className={`text-center py-16 ${muted}`}>No product found</div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3 w-full">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 p-3 bg-zinc-50 dark:bg-zinc-900 h-60 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name || "Product image"}
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

              <div className="lg:w-2/3 w-full">
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-bold">{product.name}</h2>
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

                <div className="flex items-center gap-2 mt-2">
                  <Stars count={product.total_stars || 0} />
                  <span className={`text-xs ${muted}`}>({product.total_reviews || 0})</span>
                </div>

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

                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {product.price && (
                    <span className="text-2xl font-semibold text-emerald-600">
                      ₹{product.price}
                    </span>
                  )}
                  {product.mrp && (
                    <span className={`${muted}`}>Price: ₹0</span>
                  )}
                </div>

                {product.description && (
                  <p className={`mt-4 leading-relaxed ${subText}`}>{product.description}</p>
                )}
              </div>
            </div>

            <div className={`my-6 border-t ${borderClr}`} />

            <div className={`rounded-xl border ${borderClr} p-5`}>
              <h3 className="font-bold mb-4 text-xl">More Details</h3>

              <div className={`grid md:grid-cols-2 gap-6 text-sm ${subText}`}>
                <div>
                  <h4 className="font-bold text-lg text-current mb-2">Identifiers</h4>
                  {product.id && <p>Product ID: {product.id}</p>}
                  {product.hsn_code && <p>HSN Code: {product.hsn_code}</p>}
                  {product.category_name && <p>Category: {product.category_name}</p>}
                  {product.subcategory_name && <p>Subcategory: {product.subcategory_name}</p>}
                </div>

                <div>
                  <h4 className="font-bold text-lg text-current mb-2">Pricing & Stock</h4>
                  {product.mrp && <p> MRP: ₹{product.mrp}</p>}
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

                <div>
                  {product.m_date && <p>Manufacturing: {product.m_date}</p>}
                  {product.e_date && <p>Expiry: {product.e_date}</p>}
                </div>

                <div>
                  <h4 className="font-bold text-lg text-current mb-2">Reviews</h4>
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
