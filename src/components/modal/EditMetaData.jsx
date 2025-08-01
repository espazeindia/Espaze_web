import React, { use, useEffect, useState } from "react";
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
import ProductOnboardingServices from "../../services/ProductOnboardingServices";
import { notifySuccess,notifyError } from "../../utils/toast";

function EditMetaData({ isOpen, onClose, currentProduct, setOnboardingData }) {
  const { theme } = useMode();

  const [editedData, setEditedData] = useState({
    productName: "",
    productDescription: "",
    category: "",
    subCategory: "",
    code: "",
    mrp: 0,
    image: "",
    id: "",
  });

  useEffect(() => {
    console.log(currentProduct);
    setEditedData(currentProduct);
  }, [currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(editedData)
      const body = {
        name: editedData.productName,
        description: editedData.productDescription,
        image: editedData.image,
        category_id: editedData.category,
        subcategory_id: editedData.subCategory,
        mrp: parseFloat(editedData.mrp),
        hsn_code: editedData.code,
      };
      const res = await ProductOnboardingServices.UpdateMetaData(body,editedData.id);
      if (res.success === true) {
         setOnboardingData((prevData) =>
          prevData.map((data) =>
            data.id === editedData.id ? editedData : data
          )
        );
        notifySuccess(res.message);
      }
    } catch (err) {
      if (err === "cookie error") {
        notifyError("Cookie error, please relogin and try again");
      } else {
        notifyError(err?.response?.data?.message || err.message);
      }
    }
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
        <ModalClose
          style={{ zIndex: "10", color: "#ffffff", fontWeight: "bold" }}
        />
        <DialogTitle sx={theme ? { color: "#000000" } : { color: "#ffffff" }}>
          Edit Meta Data
        </DialogTitle>
        <DialogContent className="h-[50vh] w-[70vw] overflow-scroll sideBarNone">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Product Name
                </label>
                <Input
                  sx={
                    theme
                      ? {
                          backgroundColor: "#f4f4f5",
                          color: "#27272a",
                          border: "none",
                        }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="productName"
                  value={editedData.productName}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter Product Name"
                />
              </FormControl>
              <FormControl size="lg" className="space-y-1 row-span-2">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Product Description
                </label>
                <Textarea
                  className="h-full p-2"
                  maxRows={4}
                  sx={
                    theme
                      ? {
                          backgroundColor: "#f4f4f5",
                          color: "#27272a",
                          border: "none",
                        }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="productDescription"
                  value={editedData.productDescription}
                  onChange={handleChange}
                  required
                  placeholder="Enter Product Description"
                />
              </FormControl>
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Category
                </label>
                <Input
                  sx={
                    theme
                      ? {
                          backgroundColor: "#f4f4f5",
                          color: "#27272a",
                          border: "none",
                        }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="category"
                  value={editedData.category}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter Category"
                />
              </FormControl>
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Sub Category
                </label>
                <Input
                  sx={
                    theme
                      ? {
                          backgroundColor: "#f4f4f5",
                          color: "#27272a",
                          border: "none",
                        }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="subCategory"
                  value={editedData.subCategory}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter Sub Category"
                />
              </FormControl>
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Code
                </label>
                <Input
                  sx={
                    theme
                      ? {
                          backgroundColor: "#f4f4f5",
                          color: "#27272a",
                          border: "none",
                        }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="code"
                  value={editedData.code}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter Code"
                />
              </FormControl>
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  MRP
                </label>
                <Input
                  sx={
                    theme
                      ? {
                          backgroundColor: "#f4f4f5",
                          color: "#27272a",
                          border: "none",
                        }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="mrp"
                  type="number"
                  min={0}
                  value={editedData.mrp}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter MRP"
                />
              </FormControl>
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Image
                </label>
                <Input
                  sx={
                    theme
                      ? {
                          backgroundColor: "#f4f4f5",
                          color: "#27272a",
                          border: "none",
                        }
                      : {
                          backgroundColor: "#27272a",
                          color: "#ffffff",
                          border: "none",
                        }
                  }
                  name="image"
                  type="file"
                  accept="images/*"
                  // value={formData.productName}
                  // onChange={handleChange}
                  size="lg"
                  placeholder="select Image"
                />
              </FormControl>
            </div>
            <div className="flex justify-end">
              <button
                className={`p-2 font-medium rounded-lg w-20 mt-8 
                ${
                  theme
                    ? "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    : "border border-green-500 hover:bg-green-600 hover:text-white text-green-500"
                }`}
              >
                Edit
              </button>
            </div>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
export default EditMetaData;
