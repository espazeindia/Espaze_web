import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { notifyError } from "../utils/toast";
import { useMode } from "../contexts/themeModeContext";
import MetaDataServices from "../services/MetaDataServices";
import InventoryServices from "../services/InventoryServices";
import EditMetaData from "../components/modal/EditMetaData";
import DeleteMetaData from "../components/modal/DeleteMetaData";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useMode();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(-1);

  const [onboardingData, setOnboardingData] = useState([]);
  const [reload, setReload] = useState(false);

  // ===== Actions =====
  const handleEdit = (data) => {
    setCurrentProduct(data);
    setEditModal(true);
  };

  const handleDelete = (data) => {
    setDeleteProduct(data?.id || -1);
    setCurrentProduct(data);
    setDeleteModal(true);
  };

  // ===== API: Metadata =====
  const fetchProduct = async (pid) => {
    try {
      setLoading(true);
      const result = await MetaDataServices.FetchMetadataById(pid);
      if (result.success) {
        const data = result.data;
        const body = {
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
          created_at: data.created_at,
          updated_at: data.updated_at,
          m_date: data.manufacturing_date,
          e_date: data.expiry_date,
        };
        setProduct(body);
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

  // ===== API: Inventory =====
  const fetchInventory = async (pid) => {
    try {
      setLoading(true);
      const result = await InventoryServices.FetchInventoryById(pid);
      if (result.success) {
        const data = result.data;
        const body = {
          id: data.inventory_product_id,
          hsn_code: data.metadata_hsn_code,
          name: data.metadata_name,
          description: data.metadata_description,
          image: data.metadata_image,
          category_id: data.metadata_category_id,
          subcategory_id: data.metadata_subcategory_id,
          mrp: data.metadata_subcategory_id,
          category_name: data.metadata_category_name,
          subcategory_name: data.metadata_subcategory_name,
          created_at: data.created_at,
          updated_at: data.updated_at,
          total_stars: data.metadata_total_stars,
          total_reviews: data.metadata_total_reviews,
          visible: data.product_visibility,
          quantity: data.product_quantity,
          price: data.product_price,
          e_date: data.product_expiry_date,
          m_date: data.product_manufacturing_date,
        };
        setProduct(body);
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

  // ===== Effect =====
  useEffect(() => {
    if (!id) return;
    if (id.includes("metadata_")) {
      fetchProduct(id.split("metadata_")[1]);
    } else if (id.includes("inventory_")) {
      fetchInventory(id.split("inventory_")[1]);
    }
  }, [id, reload]);

  // ===== UI Helpers =====
  const containerBG = theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white";
  const cardBG = theme ? "bg-white text-black" : "bg-zinc-800 text-white";
  const subText = theme ? "text-zinc-600" : "text-zinc-300";
  const muted = theme ? "text-zinc-500" : "text-zinc-400";
  const borderClr = theme ? "border-zinc-200" : "border-zinc-700";

  const Badge = ({ children, color = "indigo" }) => (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold bg-${color}-100 text-${color}-700 border border-${color}-200`}
    >
      {children}
    </span>
  );

  // Tailwind doesn't allow dynamic color tokens in class string at build-time.
  // For safety, we’ll use fixed badge styles below where needed instead of Badge() with dynamic color.

  // ===== Skeleton =====
  const Skeleton = () => (
    <div className={`rounded-2xl p-5 ${cardBG} border ${borderClr} animate-pulse`}>
      <div className="flex gap-6">
        <div className="w-1/3">
          <div className="w-full h-48 rounded-md bg-zinc-200/60 dark:bg-zinc-700/60" />
        </div>
        <div className="w-2/3 space-y-3">
          <div className="h-6 w-2/3 rounded bg-zinc-200/60 dark:bg-zinc-700/60" />
          <div className="h-4 w-1/3 rounded bg-zinc-200/60 dark:bg-zinc-700/60" />
          <div className="h-20 w-full rounded bg-zinc-200/60 dark:bg-zinc-700/60" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-3/4 rounded bg-zinc-200/60 dark:bg-zinc-700/60" />
        ))}
      </div>
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
      <div className={`rounded-2xl p-5 ${cardBG} border ${borderClr} shadow-sm`}>
        {loading ? (
          <Skeleton />
        ) : !product ? (
          <div className={`text-center py-16 ${muted}`}>No product found</div>
        ) : (
          <>
            {/* Top: Image + Basic Info */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image */}
              <div className="lg:w-1/3 w-full">
                {product.image ? (
                  <div className="group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : (
                  <div className="w-full h-60 flex flex-col gap-2 items-center justify-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div className="text-4xl">🖼️</div>
                    <div className={`${muted}`}>No Image Available</div>
                  </div>
                )}
              </div>

              {/* Primary Info */}
              <div className="lg:w-2/3 w-full">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-2">
                    {product.quantity ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                        Out of Stock
                      </span>
                    )}
                    {product.visible && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 border border-sky-200">
                        Visible
                      </span>
                    )}
                    {product.hsn_code && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">
                        HSN: {product.hsn_code}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={i < (product.total_stars || 0) ? "gold" : "none"}
                      stroke="gold"
                      strokeWidth="2"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.842 1.48 8.289L12 18.896l-7.416 4.541 1.48-8.289-6.064-5.842 8.332-1.151z"
                      />
                    </svg>
                  ))}
                  <span className={`ml-2 ${muted}`}>({product.total_reviews || 0})</span>
                </div>

                {/* Price & Meta */}
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {product.price && (
                    <span className="text-2xl font-semibold text-emerald-600">
                      ₹{product.price}
                    </span>
                  )}
                  {product.mrp && (
                    <span className={`${muted} line-through`}>₹{product.mrp}</span>
                  )}
                  {product.category_name && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                      {product.category_name}
                    </span>
                  )}
                  {product.subcategory_name && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                      {product.subcategory_name}
                    </span>
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

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className={`rounded-xl border ${borderClr} p-4`}>
                <h3 className="font-semibold mb-3">Identifiers</h3>
                <div className={`grid grid-cols-2 gap-y-2 text-sm ${subText}`}>
                  {product.id && <p><span className="font-medium text-current">ID:</span> {product.id}</p>}
                  {product.hsn_code && (
                    <p><span className="font-medium text-current">HSN Code:</span> {product.hsn_code}</p>
                  )}
                  {product.category_id && (
                    <p><span className="font-medium text-current">Category ID:</span> {product.category_id}</p>
                  )}
                  {product.subcategory_id && (
                    <p><span className="font-medium text-current">Subcategory ID:</span> {product.subcategory_id}</p>
                  )}
                </div>
              </div>

              <div className={`rounded-xl border ${borderClr} p-4`}>
                <h3 className="font-semibold mb-3">Pricing & Stock</h3>
                <div className={`grid grid-cols-2 gap-y-2 text-sm ${subText}`}>
                  {product.mrp && <p><span className="font-medium text-current">MRP:</span> ₹{product.mrp}</p>}
                  {product.price && <p><span className="font-medium text-current">Price:</span> ₹{product.price}</p>}
                  {product.quantity !== undefined && (
                    <p><span className="font-medium text-current">Quantity:</span> {product.quantity}</p>
                  )}
                  {product.visible !== undefined && (
                    <p><span className="font-medium text-current">Visibility:</span> {product.visible ? "Visible" : "Hidden"}</p>
                  )}
                </div>
              </div>

              <div className={`rounded-xl border ${borderClr} p-4`}>
                <h3 className="font-semibold mb-3">Dates</h3>
                <div className={`grid grid-cols-2 gap-y-2 text-sm ${subText}`}>
                  {product.m_date && (
                    <p><span className="font-medium text-current">Manufacturing:</span> {product.m_date}</p>
                  )}
                  {product.e_date && (
                    <p><span className="font-medium text-current">Expiry:</span> {product.e_date}</p>
                  )}
                  {product.created_at && (
                    <p><span className="font-medium text-current">Created:</span> {new Date(product.created_at).toLocaleDateString()}</p>
                  )}
                  {product.updated_at && (
                    <p><span className="font-medium text-current">Updated:</span> {new Date(product.updated_at).toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              <div className={`rounded-xl border ${borderClr} p-4`}>
                <h3 className="font-semibold mb-3">Reviews</h3>
                <div className={`grid grid-cols-2 gap-y-2 text-sm ${subText}`}>
                  <p><span className="font-medium text-current">Total Stars:</span> {product.total_stars || 0}</p>
                  <p><span className="font-medium text-current">Total Reviews:</span> {product.total_reviews || 0}</p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-center md:justify-end gap-4 mt-8">
              <button
                onClick={() => handleEdit(product)}
                className="flex items-center gap-2 px-6 py-2.5 text-sm md:text-base rounded-lg font-medium cursor-pointer
                  border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition-colors"
              >
                <FaEdit />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(product)}
                disabled={deleting}
                className="flex items-center gap-2 px-6 py-2.5 text-sm md:text-base rounded-lg font-medium cursor-pointer
                  border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-60"
              >
                <FaTrash />
                <span>{deleting ? "Deleting..." : "Delete"}</span>
              </button>
            </div>

            {/* Modals */}
            <EditMetaData
              isOpen={editModal}
              onClose={() => setEditModal(false)}
              currentProduct={currentProduct}
              setOnboardingData={setOnboardingData}
            />

            <DeleteMetaData
              isOpen={deleteModal}
              onClose={() => setDeleteModal(false)}
              currentProduct={currentProduct}
              setOnboardingData={setOnboardingData}
              setReload={setReload}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
