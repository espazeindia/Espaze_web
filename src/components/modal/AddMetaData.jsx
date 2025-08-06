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
import { notifyError, notifySuccess } from "../../utils/toast";
import ProductOnboardingServices from "../../services/ProductOnboardingServices";
import { LoaderCircle } from "lucide-react";
import CategoryServices from "../../services/CategoryServices";

function AddMetaData({ isOpen, onClose, setReload }) {
  const { theme } = useMode();
  const [categoryOfPro, setcategoryOfPro] = useState("");
  const [categories,setCategories] = useState([])
  const [subCategories,setSubCategories] = useState([])
  const [subCategoryOfPro,setSubCategoryOfPro] = useState("")
  const [loading, setLoading] = useState(false);
  const [saveData, setSaveData] = useState({
    productName: "",
    productDescription: "",
    code: "",
    mrp: 0,
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaveData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

    useEffect(() => {
    const categoryCall = async () => {
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
    };
    if(isOpen)categoryCall();
  }, [isOpen]);

  useEffect(() => {
    const SubCategoryCall = async () => {
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
    };
    if(categoryOfPro !== "" && isOpen ){
      SubCategoryCall()
    };
  }, [categoryOfPro]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const body = {
        name: saveData.productName,
        description: saveData.productDescription,
        image: saveData.image,
        category_id: categoryOfPro,
        subcategory_id: saveData.subCategory,
        mrp: parseFloat(saveData.mrp),
        hsn_code: saveData.code,
      };
      const res = await ProductOnboardingServices.CreateMetaData(body);
      if (res.success === true) {
        notifySuccess(res.message);
        setReload((prevData) => !prevData);
      }
    } catch (err) {
      if (err === "cookie error") {
        notifyError("Cookie error, please relogin and try again");
      } else {
        notifyError(err?.response?.data?.message || res.message);
      }
    }
    setLoading(false);
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
          Add Meta Data
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
                  value={saveData.productName}
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
                  value={saveData.productDescriptio}
                  onChange={handleChange}
                  required
                  placeholder="Enter Product Description"
                />
              </FormControl>
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Category
                </label>
                <Select
                  value={categoryOfPro}
                  onChange={(_, val) => setcategoryOfPro(val)}
                >
                  {categories.map((category) => (
                    <Option
                      key={category.id}
                      value={category.id}
                      label={category.category_name}
                    >
                      {category.category_name}
                    </Option>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Sub Category
                </label>
                 <Select
                  value={subCategoryOfPro}
                  onChange={(_, val) => setSubCategoryOfPro(val)}
                >
                  {subCategories !==null ? subCategories.map((sub) => (
                    <Option
                      key={sub.id}
                      value={sub.id}
                      label={sub.subcategory_name}
                    >
                      {sub.subcategory_name}
                    </Option>
                  )):
                  <Option>
                    No SubCategory available
                  </Option>}
                </Select>
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
                  value={saveData.code}
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
                  value={saveData.mrp}
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
                className={`p-2 font-medium rounded-lg w-20 mt-8 flex justify-center items-center
                ${
                  theme
                    ? "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    : "border border-green-500 hover:bg-green-600 hover:text-white text-green-500"
                }`}
              >
                {loading ? (
                  <LoaderCircle className="animate-spin h-7" />
                ) : (
                  <>Add</>
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
export default AddMetaData;
