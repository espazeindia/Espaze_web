import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Image as ImageIcon, Star, Pencil } from "lucide-react";
import { Switch } from "@mui/joy";
import { notifyError } from "../utils/toast";
import { useMode } from "../contexts/themeModeContext";
import MetaDataServices from "../services/MetaDataServices";
import InventoryServices from "../services/InventoryServices";
import Cookies from "js-cookie";
import EditModalComponent from "../components/modal/UpdateInventory"; // keep as in your project

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useMode();

  const userRole = Cookies.get("userRole") || "seller";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFromInventory, setIsFromInventory] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const transformProduct = (d, isInventory = false) => ({
    id: isInventory ? d.inventory_product_id : d.id,
    hsn_code: isInventory ? d.metadata_hsn_code : d.hsn_code,
    name: isInventory ? d.metadata_name : d.name,
    description: isInventory ? d.metadata_description : d.description,
    image: isInventory ? d.metadata_image : d.image,
    category_name: isInventory ? d.metadata_category_name : d.category_name,
    subcategory_name: isInventory ? d.metadata_subcategory_name : d.subcategory_name,
    total_stars: isInventory ? d.metadata_total_stars ?? 0 : d.total_stars ?? 0,
    total_reviews: isInventory ? d.metadata_total_reviews ?? 0 : d.total_reviews ?? 0,
    visible: isInventory ? (d.product_visibility || "hidden") : d.visible || "hidden",
    quantity: isInventory ? (d.product_quantity ?? 0) : undefined,
    price: isInventory ? (d.product_price ?? 0) : d.price ?? 0,
    mrp: isInventory
      ? d.product_mrp && d.product_mrp > 0
        ? d.product_mrp
        : d.product_price ?? 0
      : d.mrp && d.mrp > 0
      ? d.mrp
      : d.price ?? 0,
    e_date: isInventory ? d.product_expiry_date : d.expiry_date,
    m_date: isInventory ? d.product_manufacturing_date : d.manufacturing_date,
  });

  const fetchProduct = async (pid) => {
    try {
      setLoading(true);
      const result = await MetaDataServices.FetchMetadataById(pid);
      if (result?.success) setProduct(transformProduct(result.data));
      else notifyError(result.message || "Failed to fetch product details");
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
      if (result?.success) setProduct(transformProduct(result.data, true));
      else notifyError(result.message || "Failed to fetch product details");
    } catch (err) {
      if (err === "cookie error") navigate("/login");
      else notifyError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    if (id.includes("metadata_")) {
      setIsFromInventory(false);
      fetchProduct(id.split("metadata_")[1]);
    } else if (id.includes("inventory_")) {
      setIsFromInventory(true);
      fetchInventory(id.split("inventory_")[1]);
    }
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const containerBG = theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white";
  const cardBG = theme ? "bg-white text-black" : "bg-zinc-800 text-white";
  const subText = theme ? "text-zinc-600" : "text-zinc-300";
  const muted = theme ? "text-zinc-500" : "text-zinc-400";
  const borderClr = theme ? "border-zinc-200" : "border-zinc-700";

  const Badge = ({ children, className = "" }) => (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${className}`}>
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
    <div className={`p-5 min-h-full flex flex-col ${containerBG}`}>
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

      {/* Content Card */}
      <div className={`rounded-2xl p-6 flex-1 ${cardBG} border ${borderClr} shadow-md`}>
        {!product ? (
          <div className={`text-center py-16 ${muted}`}>No product found</div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image */}
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

              {/* Info */}
              <div className="lg:w-2/3 w-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    {isFromInventory && (
                      <p className="text-lg font-semibold mt-1">Price: ₹{product.price}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    {/* Hidden/Visible Badge with switch */}
                    {isFromInventory && (
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            product.visible === "hidden"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-green-100 text-green-700 border-green-200"
                          }
                        >
                          {product.visible === "hidden" ? "Hidden" : "Visible"}
                        </Badge>

                        <Switch
                          checked={product.visible !== "hidden"}
                          onChange={(e) =>
                            setProduct((prev) => ({
                              ...prev,
                              visible: e.target.checked ? "visible" : "hidden",
                            }))
                          }
                          sx={{
                            "--Switch-trackRadius": "13px",
                            "--Switch-trackWidth": "36px",
                            "--Switch-trackHeight": "18px",
                            "--Switch-thumbSize": "12px",
                            "&.Mui-checked": { "--Switch-trackBackground": "#16a34a" },
                          }}
                        />
                      </div>
                    )}

                    {/* Stock Badge */}
                    {isFromInventory && (
                      <Badge
                        className={
                          product.quantity === 0
                            ? "bg-pink-100 text-pink-700 border-pink-200"
                            : "bg-green-100 text-green-700 border-green-200"
                        }
                      >
                        {product.quantity === 0 ? "Out of Stock" : "In Stock"}
                      </Badge>
                    )}

                    {/* HSN Badge */}
                    {product.hsn_code && (
                      <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
                        HSN: {product.hsn_code}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Stars count={product.total_stars} />
                  <span className={`text-xs ${muted}`}>({product.total_reviews})</span>
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

                {product.description && (
                  <p className={`mt-4 leading-relaxed ${subText}`}>{product.description}</p>
                )}
              </div>
            </div>

            <div className={`my-6 border-t ${borderClr}`} />

            {/* More Details */}
            <div className={`rounded-xl border ${borderClr} p-5`}>
              <h3 className="font-bold mb-4 text-xl">More Details</h3>
              <div className={`grid md:grid-cols-2 gap-6 text-sm ${subText}`}>
                {userRole === "operations" && (
                  <p>
                    <span className="font-semibold">Product ID: </span>
                    {product.id}
                  </p>
                )}
                <p>
                  <span className="font-semibold">HSN Code: </span>
                  {product.hsn_code || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Category: </span>
                  {product.category_name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Subcategory: </span>
                  {product.subcategory_name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">MRP: </span>₹{product.mrp}
                </p>
                {isFromInventory && (
                  <>
                    <p>
                      <span className="font-semibold">Price: </span>₹{product.price}
                    </p>
                    <p>
                      <span className="font-semibold">Manufacturing: </span>
                      {formatDate(product.m_date)}
                    </p>
                    <p>
                      <span className="font-semibold">Expiry: </span>
                      {formatDate(product.e_date)}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity: </span>
                      {product.quantity}
                    </p>
                    <p>
                      <span className="font-semibold">Visibility: </span>
                      {product.visible}
                    </p>
                  </>
                )}
                <p>
                  <span className="font-semibold">Total Stars: </span>
                  {product.total_stars}
                </p>
                <p>
                  <span className="font-semibold">Total Reviews: </span>
                  {product.total_reviews}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating Bottom-Right Edit Button (inventory style FAB) */}
      {isFromInventory && (
        <button
          onClick={() => setOpenEditModal(true)}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition"
          aria-label="Edit product"
        >
          <Pencil size={20} />
        </button>
      )}

      {/* Update Product Modal — use same props as InventoryTable expects */}
      {openEditModal && (
        <EditModalComponent
          isOpen={openEditModal}
          onClose={() => setOpenEditModal(false)}
          data={product}
          setReload={() => {}} // optional noop; pass real setter if available
        />
      )}
    </div>
  );
}

export default ProductDetails;
