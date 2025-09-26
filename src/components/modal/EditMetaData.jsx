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
import MetaDataServices from "../../services/MetaDataServices";
import { notifySuccess, notifyError } from "../../utils/toast";
import CategoryServices from "../../services/CategoryServices";
import { LoaderCircle } from "lucide-react";

function EditMetaData({ isOpen, onClose, currentProduct, setReload }) {
  const { theme } = useMode();

  const [categoryOfPro, setcategoryOfPro] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryOfPro, setSubCategoryOfPro] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [subCategoryLoading, setSubCategoryLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const [editedData, setEditedData] = useState({
    productName: "",
    productDescription: "",
    code: "",
    mrp: 0,
    image: "",
    id: "",
  });

  useEffect(() => {
    if (currentProduct && isOpen) {
      console.log(currentProduct);
      setEditedData(currentProduct);
      setcategoryOfPro(currentProduct.category);
      setSubCategoryOfPro(currentProduct.subCategory);
    }
  }, [currentProduct, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    console.log(categoryOfPro, subCategoryOfPro);
  }, [categoryOfPro, subCategoryOfPro]);

  useEffect(() => {
    const categoryCall = async () => {
      setCategoryLoading(true);
      try {
        const res = await CategoryServices.FetchAllCategory();
        if (res.success === true) {
          setCategories(res.data);
        }
      } catch (err) {
        if (err === "cookie error") {
          Cookies.remove("EspazeCookie");
          router("/login");
          notifyError("Cookie error, please relogin and try again");
        } else {
          notifyError(err?.response?.data?.message || err.message);
        }
      }
      setCategoryLoading(false);
    };
    if (isOpen) categoryCall();
  }, [isOpen]);

  useEffect(() => {
    const SubCategoryCall = async () => {
      setSubCategoryLoading(true);
      try {
        const res = await CategoryServices.FetchAllSubCategory(categoryOfPro);
        if (res.success === true) {
          setSubCategories(res.data);
        }
      } catch (err) {
        if (err === "cookie error") {
          Cookies.remove("EspazeCookie");
          router("/login");
          notifyError("Cookie error, please relogin and try again");
        } else {
          notifyError(err?.response?.data?.message || err.message);
        }
      }
      setSubCategoryLoading(false);
    };
    if (categoryOfPro && categoryOfPro !== "" && isOpen) {
      SubCategoryCall();
    }
  }, [categoryOfPro]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(editedData);
      const body = {
        name: editedData.productName,
        description: editedData.productDescription,
        image: editedData.image,
        category_id: categoryOfPro,
        subcategory_id: subCategoryOfPro,
        mrp: parseFloat(editedData.mrp),
        hsn_code: editedData.code,
      };
      const res = await MetaDataServices.UpdateMetaData(body, editedData.id);
      if (res.success === true) {
        setReload((prevData) => !prevData);
        notifySuccess(res.message);
      }
    } catch (err) {
      if (err === "cookie error") {
        notifyError("Cookie error, please relogin and try again");
      } else {
        notifyError(err?.response?.data?.message || err.message);
      }
    }
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;
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
          Edit Meta Data
        </DialogTitle>
        <DialogContent className="h-[50vh] w-[70vw] overflow-scroll sideBarNone">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Product Name</label>
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
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Category</label>
                <Select
                  disabled={categoryLoading}
                  value={categoryOfPro}
                  placeholder={"Select Category"}
                  onChange={(_, val) => {
                    setSubCategoryOfPro("");
                    setcategoryOfPro(val);
                  }}
                >
                  {categories ? (
                    categories.map((category) => (
                      <Option key={category.id} value={category.id} label={category.category_name}>
                        {category.category_name}
                      </Option>
                    ))
                  ) : (
                    <Option> No Category Available</Option>
                  )}
                </Select>
              </FormControl>
              <FormControl
                size="lg"
                className={`space-y-1 ${
                  subCategoryLoading ? " cursor-not-allowed" : " cursor-pointer"
                }`}
              >
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Sub Category</label>
                <Select
                  disabled={subCategoryLoading}
                  value={subCategoryOfPro}
                  placeholder={"Select Sub-Category"}
                  onChange={(_, val) => setSubCategoryOfPro(val)}
                >
                  {subCategories !== null ? (
                    subCategories.map((sub) => (
                      <Option key={sub.id} value={sub.id} label={sub.subcategory_name}>
                        {sub.subcategory_name}
                      </Option>
                    ))
                  ) : (
                    <Option>No SubCategory Available</Option>
                  )}
                </Select>
              </FormControl>
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Code</label>
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
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>MRP</label>
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
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>Image</label>
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
                className={`p-2 font-medium rounded-lg w-20 mt-8 flex justify-center items-center
                ${
                  theme
                    ? "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    : "border border-green-500 hover:bg-green-600 hover:text-white text-green-500"
                }`}
              >
                {loading ? <LoaderCircle className="animate-spin h-7" /> : <>Edit</>}
              </button>
            </div>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
export default EditMetaData;
