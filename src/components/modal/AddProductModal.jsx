import React, { useEffect, useState } from "react";
import {
  colors,
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedValue = name === "price" ? Math.max(0, value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
      subCategory: "", // Reset subCategory when category changes
    }));
  };

  const handleSubCategoryChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      subCategory: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const modifiedData = {
      id: products.length + 1,
      name: formData.productName,
      category_id: { name: formData.category },
      subCategory_id: { name: formData.subCategory },
      manufacturingDate: formData.manufacturingDate,
      expiryDate: formData.expiryDate,
      code: formData.code,
      price: formData.price,
      quantity: formData.quantity,
      status: "show",
    };

    setProducts((prevData) => [...prevData, modifiedData]);
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
        sx={
          theme
            ? { backgroundColor: "#ffffff", border: "none" }
            : { backgroundColor: "#18181b", border: "none" }
        }
      >
        <ModalClose style={{ zIndex: "10", color: "#ffffff", fontWeight: "bold" }} />
        <DialogTitle sx={theme ? { color: "#000000" } : { color: "#ffffff" }}>
          Add Product
        </DialogTitle>
        <DialogContent className="h-[50vh] w-[70vw] overflow-scroll sideBarNone">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              {/* Product Name */}
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Product Name</label>
                <Input
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter Product Name"
                />
              </FormControl>

              {/* Product Description */}
              <FormControl size="lg" className="row-span-2">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Product Description
                </label>
                <Textarea
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 h-full sideBarNone"
                  maxRows={4}
                  placeholder="Enter Product Description"
                />
              </FormControl>

              {/* Category */}
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Category</label>
                <Select
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  placeholder="Select Category"
                  onChange={(_, value) => handleCategoryChange(value)}
                  required
                  value={formData.category}
                  name="category"
                  slotProps={{
                    listbox: { sx: { maxHeight: 150, overflowY: "auto" } },
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
              <FormControl
                size="lg"
                className={`space-y-1 ${!formData.category ? "cursor-not-allowed" : ""}`}
              >
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Sub Category</label>
                <Select
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  placeholder="Select Sub Category"
                  onChange={(_, value) => handleSubCategoryChange(value)}
                  required
                  value={formData.subCategory}
                  name="subCategory"
                  disabled={!formData.category}
                  slotProps={{
                    listbox: { sx: { maxHeight: 150, overflowY: "auto" } },
                  }}
                >
                  {formData.category &&
                    categories[formData.category]?.map((subCategory) => (
                      <Option key={subCategory} value={subCategory}>
                        {subCategory}
                      </Option>
                    ))}
                </Select>
              </FormControl>

              {/* Product Code */}
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Code</label>
                <Input
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter Product Code"
                />
              </FormControl>

              {/* Price */}
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Price</label>
                <Input
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter Product Price"
                />
              </FormControl>

              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Quantity</label>
                <Input
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter Product Quantity"
                />
              </FormControl>

              {/* Manufacturing Date */}
              <FormControl size="lg" className={`space-y-1  ${theme ? "" : "darkMode"}`}>
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Manufacturing Date
                </label>
                <Input
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="manufacturingDate"
                  value={formData.manufacturingDate}
                  onChange={handleChange}
                  type="date"
                  required
                  size="lg"
                />
              </FormControl>

              {/* Expiry Date (Cannot be earlier than Manufacturing Date) */}
              <FormControl size="lg" className={`space-y-1  ${theme ? "" : "darkMode"}`}>
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Expiry Date</label>
                <Input
                  sx={
                    theme
                      ? { backgroundColor: "#f4f4f5", color: "#27272a", border: "none" }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  type="date"
                  required
                  size="lg"
                  min={formData.manufacturingDate}
                />
              </FormControl>
            </div>

            {/* Submit Button */}
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className={` ${
                  theme ? " border-purple-500 border-2 bg-purple-100 text-purple-500 hover:bg-purple-500 hover:text-white" : "bg-purple-500 text-white hover:bg-white hover:text-black "
                } 
                px-6 py-2  transition-all duration-500  rounded-lg hover:cursor-pointer`}
              >
                Add
              </button>
            </div>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}

export default AddProductDetails;
