import React, { useState, useEffect } from "react";
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
import { useMode } from "../contexts/themeModeContext";
import { notifyError, notifySuccess } from "../utils/toast";
import { LoaderCircle } from "lucide-react";
import CategoryServices from "../services/CategoryServices";
import { Segment } from "@mui/icons-material";

const AddRacks = ({ isOpen, onClose, setReload }) => {
  const { theme } = useMode();
  const [categoryOfPro, setcategoryOfPro] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryOfPro, setSubCategoryOfPro] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [subCategoryLoading, setSubCategoryLoading] = useState(true);
  const [warehouse, setWarehouse] = useState([]);
  const [saveData, setSaveData] = useState({
    segment: 0,
    volume: 0.0,
  });

  const warehouseOptions = [
    "Main Warehouse A",
    "Secondary Warehouse B",
    "East-Side Storage",
  ];

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
      setCategoryLoading(true);
      try {
        const res = await CategoryServices.FetchAllCategory();
        console.log("Categories fetched:", res.data);
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
      setSubCategoryOfPro("");
      SubCategoryCall();
    }
  }, [categoryOfPro]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    onClose();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="flex-col items-center gap-6 mb-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-5">
          Add Racks
        </h1>
        <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Category
                </label>
                <Select
                  disabled={categoryLoading}
                  value={categoryOfPro}
                  placeholder={"Select Category"}
                  required
                  onChange={(_, val) => setcategoryOfPro(val)}
                >
                  {categories ? (
                    categories.map((category) => (
                      <Option
                        key={category.id}
                        value={category.id}
                        label={category.category_name}
                      >
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
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Sub Category
                </label>
                <Select
                  disabled={subCategoryLoading}
                  value={subCategoryOfPro}
                  required
                  placeholder={"Select Sub-Category"}
                  onChange={(_, val) => setSubCategoryOfPro(val)}
                >
                  {subCategories !== null ? (
                    subCategories.map((sub) => (
                      <Option
                        key={sub.id}
                        value={sub.id}
                        label={sub.subcategory_name}
                      >
                        {sub.subcategory_name}
                      </Option>
                    ))
                  ) : (
                    <Option>No SubCategory Available</Option>
                  )}
                </Select>
              </FormControl>
              <FormControl size="lg" className={`space-y-1 cursor-pointer}`}>
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Warehouse
                </label>
                <Select
                  value={warehouse}
                  required
                  placeholder={"Select warehouse"}
                  onChange={(e) => setWarehouse(e.target.value)}
                >
                  <option value="" disabled>
                    Select Warehouse
                  </option>
                  {warehouseOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Segment
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
                  name="segment"
                  type="number"
                  min={0}
                  value={saveData.segment}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter segment"
                />
              </FormControl>
              <FormControl size="lg" className="space-y-1">
                <label className={theme ? "text-zinc-800" : "text-zinc-300"}>
                  Volume
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
                  name="volume"
                  type="number"
                  min={0.0}
                  value={saveData.volume}
                  onChange={handleChange}
                  required
                  size="lg"
                  placeholder="Enter Volume"
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
        </div>
      </div>
    </div>
  );
};

export default AddRacks;
