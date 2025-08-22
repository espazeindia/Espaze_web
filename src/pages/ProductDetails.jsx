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


  const handleEdit = (data) => {
  setCurrentProduct(data);
  setEditModal(true);
};

const handleDelete = (id) => {
  setDeleteProduct(id);
  setDeleteModal(true);
};



 const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const result = await MetaDataServices.FetchMetadataById(id);
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
          e_date: data.expiry_date
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

  const fetchInventory = async (id) => {
    try {
      setLoading(true);
      const result = await InventoryServices.FetchInventoryById(id);
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

  useEffect(() => {
    if (id.includes("metadata_")) {
      fetchProduct(id.split("metadata_")[1]);
    }
    if (id.includes("inventory_")) {
      fetchInventory(id.split("inventory_")[1]);
    }
  }, [id]);

  return (
    <div
      className={`p-5 min-h-full ${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      }`}
    >
      <div className="flex items-center mb-5">
        <FaArrowLeft
          className="cursor-pointer mr-3"
          size={20}
          onClick={() => navigate("/product-onboarding")}
        />
        <h1 className="font-bold text-xl">Product Details</h1>
      </div>

      <div
        className={`rounded-lg p-5 ${
          theme ? "bg-white text-black" : "bg-zinc-800 text-white"
        }`}
      >
        {loading ? (
          <div>Loading...</div>
        ) : !product ? (
          <div>No product found</div>
        ) : (
          <>
            <div className="flex gap-6">
              <div className="w-1/3">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center border rounded-md text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>

              <div className="w-2/3">
                <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
                <div className="flex items-center mb-2">
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
                  <span className="ml-2 text-gray-500">
                    ({product.total_reviews || 0})
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {product.quantity && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-sm rounded">
                      In Stock
                    </span>
                  )}
                  {product.visible && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-sm rounded">
                      Visible
                    </span>
                  )}
                  {product.price && (
                    <span className="font-bold">₹{product.price}</span>
                  )}
                  {product.hsn_code && (
                    <span className="text-gray-500">
                      HSN Code {product.hsn_code}
                    </span>
                  )}
                </div>

                {product.description && (
                  <p className="text-sm text-gray-600">{product.description}</p>
                )}
              </div>
            </div>

<div className="mt-6 border rounded-lg p-4">
  <h3 className="font-bold mb-3">More Details</h3>
  <div className="grid grid-cols-2 gap-y-2 text-sm">
    {product.id && (
      <p><strong>ID:</strong> {product.id}</p>
    )}
    {product.category_name && (
      <p><strong>Category:</strong> {product.category_name}</p>
    )}
    {product.subcategory_name && (
      <p><strong>Sub Category:</strong> {product.subcategory_name}</p>
    )}
    {product.category_id && (
      <p><strong>Category ID:</strong> {product.category_id}</p>
    )}
    {product.subcategory_id && (
      <p><strong>Subcategory ID:</strong> {product.subcategory_id}</p>
    )}
    {product.mrp && (
      <p><strong>MRP:</strong> ₹{product.mrp}</p>
    )}
    {product.price && (
      <p><strong>Price:</strong> ₹{product.price}</p>
    )}
    {product.created_at && (
      <p><strong>Created At:</strong> {new Date(product.created_at).toLocaleDateString()}</p>
    )}
    {product.updated_at && (
      <p><strong>Updated At:</strong> {new Date(product.updated_at).toLocaleDateString()}</p>
    )}
    <p><strong>Total Stars:</strong> {product.total_stars || 0}</p>
    <p><strong>Total Reviews:</strong> {product.total_reviews || 0}</p>
    {product.m_date && (
      <p><strong>Manufacturing Date:</strong> {product.m_date}</p>
    )}
    {product.e_date && (
      <p><strong>Expiry Date:</strong> {product.e_date}</p>
    )}
    {product.quantity && (
      <p><strong>Quantity:</strong> {product.quantity}</p>
    )}
  </div>
</div>

<div className="flex justify-center gap-6 mt-8">
  <button
    onClick={() => handleEdit(product)}
    className="flex items-center space-x-2 px-10 py-3 text-lg rounded-md font-medium cursor-pointer 
    border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
  >
    <FaEdit />
    <span>Edit</span>
  </button>

  <button
    onClick={() => handleDelete(product)}
    disabled={deleting}
    className="flex items-center space-x-2 px-10 py-3 text-lg rounded-md font-medium cursor-pointer
    border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
  >
    <FaTrash />
    <span>{deleting ? "Deleting..." : "Delete"}</span>
  </button>
</div>

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
