import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMode } from "../contexts/themeModeContext";
import axios from "axios";
import { notifyError } from "../utils/toast";
import { IoArrowBackSharp } from "react-icons/io5"; 

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useMode();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
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

  return (
    <div
      className={`p-5 min-h-full ${theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"}`}
    >
  
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <IoArrowBackSharp
            className="cursor-pointer"
            size={28}
            onClick={() => navigate(-1)}
          />
          <div className="font-bold text-2xl">Product Details</div>
        </div>

        <div className="flex gap-2">
          <button
            className={`p-1 px-7 rounded-md font-medium cursor-pointer hover:bg-green-600 hover:text-white 
            ${theme ? "text-green-600 border-1 border-green-600" : "text-green-500 border-1 border-green-500"}`}
          >
            Add
          </button>
          <button
            className={`p-1 px-7 rounded-md font-medium cursor-pointer hover:bg-red-600 hover:text-white 
            ${theme ? "text-red-600 border-1 border-red-600" : "text-red-500 border-1 border-red-500"}`}
          >
            Delete
          </button>
        </div>
      </div>


      <div
        className={`rounded-lg p-5 ${theme ? "bg-white text-black" : "bg-zinc-800 text-white"}`}
      >
        {loading ? (
          <div>Loading...</div>
        ) : !product ? (
          <div>No product found</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr><td className="py-2 font-semibold">ID</td><td>{product.id}</td></tr>
              <tr><td className="py-2 font-semibold">Name</td><td>{product.name}</td></tr>
              <tr><td className="py-2 font-semibold">Description</td><td>{product.description}</td></tr>
              <tr><td className="py-2 font-semibold">HSN Code</td><td>{product.hsn_code}</td></tr>
              <tr><td className="py-2 font-semibold">Category</td><td>{product.category_name}</td></tr>
              <tr><td className="py-2 font-semibold">Subcategory</td><td>{product.subcategory_name}</td></tr>
              <tr><td className="py-2 font-semibold">MRP</td><td>₹{product.mrp}</td></tr>
              <tr><td className="py-2 font-semibold">Created At</td><td>{product.created_at}</td></tr>
              <tr><td className="py-2 font-semibold">Updated At</td><td>{product.updated_at}</td></tr>
              <tr><td className="py-2 font-semibold">Total Stars</td><td>{product.total_stars}</td></tr>
              <tr><td className="py-2 font-semibold">Total Reviews</td><td>{product.total_reviews}</td></tr>
              {product.image && (
                <tr>
                  <td className="py-2 font-semibold">Image</td>
                  <td><img src={product.image} alt="Product" className="w-32 rounded-md border" /></td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
