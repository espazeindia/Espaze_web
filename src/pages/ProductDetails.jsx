import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash, FaStar, FaEye } from "react-icons/fa";
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
  const [deleting, setDeleting] = useState(false);

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
          visible:data.product_visibility,
          quantity:data.product_quantity,
          price:data.product_price,
          e_date:data.product_expiry_date,
          m_date:data.product_manufacturing_date
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
      className={`p-5 min-h-full ${theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"}`}
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          {/* <IoArrowBackSharp
            className="cursor-pointer"
            size={28}
            onClick={() => navigate(-1)}
          /> */}
          <div className="font-bold text-2xl">Product Details</div>
        </div>

        {/* Action Buttons - keeping original styling and position */}
        <div className="flex space-x-2">
          <button
            // onClick={handleEdit}
            className="flex items-center space-x-2 border border-[rgb(0,166,62)] text-[rgb(0,166,62)] hover:bg-[rgb(0,166,62)] hover:text-white rounded py-[4px] px-[28px] transition-colors"
          >
            <FaEdit />
            <span>Edit</span>
          </button>

          <button
            // onClick={handleDelete}
            disabled={deleting}
            className="flex items-center space-x-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded py-[4px] px-[28px] transition-colors"
          >
            <FaTrash />
            <span>{deleting ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      </div>

      <div className={`rounded-lg p-5 ${theme ? "bg-white text-black" : "bg-zinc-800 text-white"}`}>
        {loading ? (
          <div>Loading...</div>
        ) : !product ? (
          <div>No product found</div>
        ) : (
          <div className="flex gap-8">
            <div className="w-1/3">
              <div className="mb-4">
                <p className="font-semibold mb-2">Image</p>
                {product.image ? (
                  <img src={product.image} alt="Product" className="w-full rounded-md border" />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center border rounded-md text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold mb-1">Description</p>
              </div>
            </div>

            <div className="w-2/3">
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <td className="py-2 font-semibold">ID</td>
                    <td>{product.id}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Name</td>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">HSN Code</td>
                    <td>{product.hsn_code}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Category</td>
                    <td>{product.category_name}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Subcategory</td>
                    <td>{product.subcategory_name}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">MRP</td>
                    <td>₹{product.mrp}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Created At</td>
                    <td>{product.created_at}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Updated At</td>
                    <td>{product.updated_at}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Total Stars</td>
                    <td>{product.total_stars}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Total Reviews</td>
                    <td>{product.total_reviews}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
