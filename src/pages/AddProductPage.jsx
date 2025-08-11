import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import { useMode } from "../contexts/themeModeContext";
import { notifySuccess, notifyError } from "../utils/toast";

function AddProductPage() {
  const navigate = useNavigate();
  const { theme } = useMode();

  // State to hold all form data, including the new operational fields
  // Now initializing number fields with an empty string to allow leading zeros
  const [formData, setFormData] = useState({
    id: "", // Added ID field
    name: "",
    description: "",
    hsn_code: "",
    category: "",
    subcategory: "",
    mrp: "", // Changed to string
    createdAt: "",
    updatedAt: "",
    totalStars: "", // Changed to string
    totalReviews: "", // Changed to string
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Store the value as a string directly from the input
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    // Convert string values to numbers only on submission
    const dataToSend = {
      ...formData,
      mrp: Number(formData.mrp),
      totalStars: Number(formData.totalStars),
      totalReviews: Number(formData.totalReviews),
    };

    for (const key in dataToSend) {
      // Append non-null values to FormData
      if (dataToSend[key] !== null) {
        data.append(key, dataToSend[key]);
      }
    }

    try {
      await axios.post("/api/products/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notifySuccess("Product added successfully!");
      navigate("/products");
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-5 min-h-full ${theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"}`}
    >
      <style>
        {`
          /* Hide the spinner buttons for number inputs */
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}
      </style>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <IoArrowBackSharp
            className="cursor-pointer"
            size={28}
            onClick={() => navigate(-1)}
          />
          <div className="font-bold text-2xl">Add Details</div>
        </div>
      </div>

      <div
        className={`rounded-lg p-5 ${theme ? "bg-white text-black" : "bg-zinc-800 text-white"}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ID */}
            <div>
              <label htmlFor="id" className="block font-semibold mb-1">
                ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            {/* HSN Code */}
            <div>
              <label htmlFor="hsn_code" className="block font-semibold mb-1">
                HSN Code
              </label>
              <input
                type="text"
                id="hsn_code"
                name="hsn_code"
                value={formData.hsn_code}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Category (example) */}
            <div>
              <label htmlFor="category" className="block font-semibold mb-1">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Subcategory (example) */}
            <div>
              <label htmlFor="subcategory" className="block font-semibold mb-1">
                Subcategory
              </label>
              <input
                type="text"
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* MRP */}
            <div>
              <label htmlFor="mrp" className="block font-semibold mb-1">
                MRP (₹)
              </label>
              <input
                type="number"
                id="mrp"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Created At */}
            <div>
              <label htmlFor="createdAt" className="block font-semibold mb-1">
                Created At
              </label>
              <input
                type="text"
                id="createdAt"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
                placeholder="YYYY-MM-DD"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Updated At */}
            <div>
              <label htmlFor="updatedAt" className="block font-semibold mb-1">
                Updated At
              </label>
              <input
                type="text"
                id="updatedAt"
                name="updatedAt"
                value={formData.updatedAt}
                onChange={handleChange}
                placeholder="YYYY-MM-DD"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Total Stars */}
            <div>
              <label htmlFor="totalStars" className="block font-semibold mb-1">
                Total Stars
              </label>
              <input
                type="number"
                id="totalStars"
                name="totalStars"
                value={formData.totalStars}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Total Reviews */}
            <div>
              <label htmlFor="totalReviews" className="block font-semibold mb-1">
                Total Reviews
              </label>
              <input
                type="number"
                id="totalReviews"
                name="totalReviews"
                value={formData.totalReviews}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Product Image */}
            <div>
              <label htmlFor="image" className="block font-semibold mb-1">
                Product Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="description" className="block font-semibold mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`p-2 px-6 rounded-md font-medium text-white transition-colors duration-200 
                ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} focus:outline-none`}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`p-2 px-6 rounded-md font-medium transition-colors duration-200 
                ${theme ? "bg-gray-200 hover:bg-gray-300 text-black" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;
