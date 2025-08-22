import React, { useState } from "react";
import {
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Textarea,
} from "@mui/joy";
import { useMode } from "../../contexts/themeModeContext";

function AddProductDetails({ isOpen, onClose, products, setProducts }) {
  const { theme } = useMode();

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    category: "",
    subCategory: "",
    code: "",
    price: 0,
    quantity: 0,
    manufacturingDate: "",
    expiryDate: "",
  });

  // Categories & sub-categories
  const categories = {
    "fruits-vegetables": ["Fruits", "Vegetables", "Organic Produce"],
    clothes: ["Men", "Women", "Kids", "Accessories"],
    electronics: ["Mobiles", "Laptops", "TVs", "Cameras"],
    "home-appliances": ["Kitchen Appliances", "Furniture", "Decor"],
    "beauty-personal-care": ["Skincare", "Haircare", "Makeup"],
    "toys-games": ["Board Games", "Outdoor Toys", "Video Games"],
    "books-stationery": ["Fiction", "Non-fiction", "Office Supplies"],
    grocery: ["Dairy", "Snacks", "Beverages"],
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;
    if (name === "price" || name === "quantity") {
      updatedValue = Math.max(0, Number(value)); // Prevent negatives
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
      subCategory: "", // reset on change
    }));
  };

  const handleSubCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      subCategory: value,
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.expiryDate < formData.manufacturingDate) {
      alert("Expiry date cannot be earlier than Manufacturing date.");
      return;
    }

    const modifiedData = {
      id: products.length + 1,
      name: formData.productName,
      description: formData.productDescription,
      category_id: { name: formData.category },
      subCategory_id: { name: formData.subCategory },
      manufacturingDate: formData.manufacturingDate,
      expiryDate: formData.expiryDate,
      code: formData.code,
      price: formData.price,
      quantity: formData.quantity,
      status: "show",
    };

    setProducts((prev) => [...prev, modifiedData]);

    // Reset
    setFormData({
      productName: "",
      productDescription: "",
      category: "",
      subCategory: "",
      code: "",
      price: 0,
      quantity: 0,
      manufacturingDate: "",
      expiryDate: "",
    });

    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalDialog
        size="lg"
        sx={{
          border: "none",
          borderRadius: "16px",
          p: 2,
          backgroundColor: theme ? "#ffffff" : "#18181b",
        }}
      >
        <ModalClose sx={{ zIndex: 10, color: theme ? "#000000" : "#ffffff" }} />
        <DialogTitle sx={{ color: theme ? "#000000" : "#ffffff" }}>
          Add Product
        </DialogTitle>

        <DialogContent className="h-[60vh] w-[70vw] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              {/* Product Name */}
              <FormControl size="lg">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Product Name
                </label>
                <Input
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  placeholder="Enter Product Name"
                  sx={{
                    backgroundColor: theme ? "#f4f4f5" : "#27272a",
                    color: theme ? "#27272a" : "#ffffff",
                    border: "none",
                  }}
                />
              </FormControl>

              {/* Code */}
              <FormControl size="lg">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Product Code
                </label>
                <Input
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  placeholder="Enter Product Code"
                  sx={{
                    backgroundColor: theme ? "#f4f4f5" : "#27272a",
                    color: theme ? "#27272a" : "#ffffff",
                    border: "none",
                  }}
                />
              </FormControl>

              {/* Product Description */}
              <FormControl size="lg" className="col-span-2">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Product Description
                </label>
                <Textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  required
                  placeholder="Enter Product Description"
                  minRows={3}
                  sx={{
                    backgroundColor: theme ? "#f4f4f5" : "#27272a",
                    color: theme ? "#27272a" : "#ffffff",
                    border: "none",
                  }}
                />
              </FormControl>

              {/* Category */}
              <FormControl size="lg">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Category
                </label>
                <Select
                  value={formData.category}
                  placeholder="Select Category"
                  onChange={(_, value) => handleCategoryChange(value)}
                  required
                  slotProps={{
                    listbox: { sx: { maxHeight: 150, overflowY: "auto" } },
                  }}
                  sx={{
                    backgroundColor: theme ? "#f4f4f5" : "#27272a",
                    color: theme ? "#27272a" : "#ffffff",
                    border: "none",
                  }}
                >
                  {Object.keys(categories).map((category) => (
                    <Option key={category} value={category}>
                      {category.replace("-", " ").toUpperCase()}
                    </Option>
                  ))}
                </Select>
              </FormControl>

              {/* Sub Category */}
              <FormControl size="lg">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Sub Category
                </label>
                <Select
                  value={formData.subCategory}
                  placeholder="Select Sub Category"
                  onChange={(_, value) => handleSubCategoryChange(value)}
                  required
                  disabled={!formData.category}
                  slotProps={{
                    listbox: { sx: { maxHeight: 150, overflowY: "auto" } },
                  }}
                  sx={{
                    backgroundColor: theme ? "#f4f4f5" : "#27272a",
                    color: theme ? "#27272a" : "#ffffff",
                    border: "none",
                  }}
                >
                  {formData.category &&
                    categories[formData.category]?.map((sub) => (
                      <Option key={sub} value={sub}>
                        {sub}
                      </Option>
                    ))}
                </Select>
              </FormControl>

              {/* Price */}
              <FormControl size="lg">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Price
                </label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="Enter Price"
                  sx={{
                    backgroundColor: theme ? "#f4f4f5" : "#27272a",
                    color: theme ? "#27272a" : "#ffffff",
                    border: "none",
                  }}
                />
              </FormControl>

              {/* Quantity */}
              <FormControl size="lg">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Quantity
                </label>
                <Input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  placeholder="Enter Quantity"
                  sx={{
                    backgroundColor: theme ? "#f4f4f5" : "#27272a",
                    color: theme ? "#27272a" : "#ffffff",
                    border: "none",
                  }}
                />
              </FormControl>

              {/* Manufacturing Date */}
              <FormControl size="lg">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Manufacturing Date
                </label>
                <Input
                  type="date"
                  name="manufacturingDate"
                  value={formData.manufacturingDate}
                  onChange={handleChange}
                  required
                  sx={{
                    backgroundColor: theme ? "#f4f4f5" : "#27272a",
                    color: theme ? "#27272a" : "#ffffff",
                    border: "none",
                  }}
                />
              </FormControl>

              {/* Expiry Date */}
              <FormControl size="lg">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Expiry Date
                </label>
                <Input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  min={formData.manufacturingDate}
                  sx={{
                    backgroundColor: theme ? "#f4f4f5" : "#27272a",
                    color: theme ? "#27272a" : "#ffffff",
                    border: "none",
                  }}
                />
              </FormControl>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  theme
                    ? "border-2 border-purple-500 bg-purple-100 text-purple-600 hover:bg-purple-500 hover:text-white"
                    : "bg-purple-600 text-white hover:bg-white hover:text-black border-2 border-purple-500"
                }`}
              >
                Add Product
              </button>
            </div>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

export default AddProductDetails;
