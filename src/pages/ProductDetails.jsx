import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash, FaStar, FaEye } from "react-icons/fa";
import axios from "axios";
import { notifyError, notifySuccess } from "../utils/toast";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/category/getMetadata/${id}`);
        setProduct(res.data);
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Edit Handler
  const handleEdit = () => {
    navigate(`/product-onboarding?id=${id}`);
  };

  // Delete Handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeleting(true);
      // TODO: Add backend API route for deleting product
      await axios.delete(`/api/products/${id}`);
      notifySuccess("Product deleted successfully");
      navigate("/products");
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    } finally {
      setDeleting(false);
    }
  };

  // Helper function to render stars
  const renderStars = (totalStars) => {
    const stars = [];
    const rating = Math.min(5, Math.max(0, totalStars || 0));
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i < rating ? "text-yellow-400" : "text-gray-300"} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="p-6">
      {/* Header with Back Arrow - keeping original styling */}
      <div className="flex items-center justify-between mb-6">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-xl text-gray-600 hover:text-gray-800" />
          <h1 className="text-3xl font-bold">Product Details</h1>
        </div>

        {/* Action Buttons - keeping original styling and position */}
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 border border-[rgb(0,166,62)] text-[rgb(0,166,62)] hover:bg-[rgb(0,166,62)] hover:text-white rounded py-[4px] px-[28px] transition-colors"
          >
            <FaEdit />
            <span>Edit</span>
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center space-x-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded py-[4px] px-[28px] transition-colors"
          >
            <FaTrash />
            <span>{deleting ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      </div>

      {/* Product Details Card */}
      <div className="bg-white shadow rounded p-6">
        {loading ? (
          <div>Loading...</div>
        ) : !product ? (
          <div>No product found</div>
        ) : (
          <>
            {/* Main Product Section */}
            <div className="grid grid-cols-5 gap-8 mb-8">
              {/* Square Image Section */}
              <div className="flex items-center justify-center border border-dashed border-gray-300 rounded aspect-square bg-gray-100">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full rounded"
                  />
                ) : (
                  <span className="text-gray-400">No Image Available</span>
                )}
              </div>

              {/* Product Info Section */}
              <div className="col-span-4">
                {/* Product Name */}
                <h2 className="text-4xl font-bold mb-4">{product.name || "Product Name"}</h2>
                
                {/* Rating and Reviews */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    {renderStars(product.total_stars)}
                  </div>
                  <span className="text-gray-600">({product.total_reviews || 0})</span>
                </div>

                {/* Status Badges */}
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    (product.quantity && product.quantity > 0) 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                    }`}>
                      {(product.quantity && product.quantity > 0) ? 'In Stock' : 'Out of Stock'}
                      </span>
                      <div className="flex items-center space-x-1 text-green-600">
                        <FaEye />
                        <span className="text-sm">Visible</span>
                      </div>
                </div>

                {/* Price and Code */}
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold">
                    ₹ {product.mrp || "0"}
                  </div>
                  <div className="text-right mr-183">
                    <div className="text-sm text-gray-500">Code</div>
                    <div className="font-semibold">{product.hsn_code || "N/A"}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="text-gray-600 leading-relaxed">
                  {product.description || "No description available"}
                </div>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-lg mb-8">
              
              {/* <div className="flex">
                <span className="font-semibold w-40">Name :</span>
                <span>{product.name || "//add details"}</span>
              </div> */}
              {/* <div className="flex">
                <span className="font-semibold w-40">HSN Code :</span>
                <span>{product.hsn_code || "//add details"}</span>
              </div> */}
              <div className="flex">
                <span className="font-semibold w-40">Category :</span>
                <span>{product.category_name || "//add details"}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-49">Subcategory :</span>
                <span>{product.subcategory_name || "//add details"}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-40">MRP :</span>
                <span>₹ {product.mrp || "//add MRP"}</span>
              </div>
              <div className="flex">
                  <span className="font-semibold w-48 whitespace-nowrap">Manufacturing Date :</span>
                  <span>{product.created_at ? new Date(product.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "//add details"}</span>
                </div>
                
                <div className="flex">
                  <span className="font-semibold w-40">Expiry Date :</span>
                  <span>{product.updated_at ? new Date(product.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "//add details"}</span>
                </div>
                
                <div className="flex">
                  <span className="font-semibold w-49">Quantity :</span>
                  <span>{product.quantity || "//add details"}</span>
                </div>
              
            </div>

            {/* More Details Section */}
            <div className="border-t pt-6">
              <h3 className="text-2xl font-bold mb-6">More Details</h3>
              
              <div className="grid grid-cols-2 gap-x-16 gap-y-4">
               <div className="flex">
                <span className="font-medium text-gray-600 w-32">ID :</span>
                <span>{product.id || "//add details"}</span>
               </div>
               <div className="flex">
                <span className="font-medium text-gray-600 w-32">Created At :</span>
                <span>{product.created_at || "//add details"}</span>
               </div>
               <div className="flex">
                <span className="font-medium text-gray-600 w-32">Updated At :</span>
                <span>{product.updated_at || "//add details"}</span>
               </div>
               <div className="flex">
                <span className="font-medium text-gray-600 w-32">Total Stars :</span>
                <span>{product.total_stars || "//add details"}</span>
               </div>
               <div className="flex">
                <span className="font-medium text-gray-600 w-32">Total Reviews :</span>
                <span>{product.total_reviews || "//add details"}</span>
               </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}