import React, { useState, useEffect, useMemo } from "react";
import {
  FormControl,
  Input,
  Option,
  Select,
} from "@mui/joy";
import { notifyError, notifySuccess } from "../utils/toast";
import CategoryServices from "../services/CategoryServices";
import { useMode } from "../contexts/themeModeContext";

const warehouseOptions = [
  "Main Warehouse A",
  "Secondary Warehouse B",
  "East-Side Storage",
];

const AddRacks = () => {
  const { theme } = useMode();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    segment: 0,
    volume: 0.0,
    selectedCategory: "",
    selectedSubCategory: "",
    selectedWarehouse: "",
  });

  const [categoryLoading, setCategoryLoading] = useState(false);
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);

  const commonInputStyles = useMemo(() => ({
    '--Input-radius': '0.375rem',
    '--Input-paddingInline': '0.75rem',
    '--Input-minHeight': 'auto',
    paddingBlock: '0.625rem',
    fontSize: '0.875rem',
    backgroundColor: theme ? '#ffffff' : '#171717',
    border: `1px solid ${theme ? '#d1d5db' : '#404040'}`,
    color: theme ? '#111827' : '#ffffff',
    transition: 'border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      backgroundColor: theme ? '#f9fafb' : '#262626',
    },
    '&:focus-within': {
      outline: 'none',
      '--Input-focusedHighlight': 'transparent',
      borderColor: 'transparent',
      boxShadow: `0 0 0 2px ${theme ? '#a855f7' : '#c084fc'}`,
    },
    '& input::placeholder': {
        color: '#9ca3af',
        opacity: 1,
    },
  }), [theme]);


  const fetchData = async (service, setter, loadingSetter, errorMessage) => {
    loadingSetter(true);
    try {
      const res = await service();
      if (res.success) {
        setter(res.data);
      } else {
        notifyError(errorMessage);
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    } finally {
      loadingSetter(false);
    }
  };

  useEffect(() => {
    fetchData(
      CategoryServices.FetchAllCategory,
      setCategories,
      setCategoryLoading,
      "Failed to fetch categories."
    );
  }, []);

  useEffect(() => {
    if (formData.selectedCategory) {
      fetchData(
        () => CategoryServices.FetchAllSubCategory(formData.selectedCategory),
        setSubCategories,
        setSubCategoryLoading,
        "Failed to fetch subcategories."
      );
    }
  }, [formData.selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (_, newValue) => {
    setFormData((prev) => ({
        ...prev,
        selectedCategory: newValue,
        selectedSubCategory: "",
    }));
    setSubCategories([]);
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
        setFormData((prev) => ({
            ...prev,
            [name]: 0,
        }));
    }
  };

  const validateFormData = () => {
    const segment = parseFloat(formData.segment);
    if (!Number.isInteger(segment) || segment <= 0) {
      return "Segment must be an integer greater than 0.";
    }

    const volume = parseFloat(formData.volume);
    if (!Number.isInteger(volume) || volume <= 0) {
      return "Volume must be an integer greater than 0.";
    }

    if (!formData.selectedCategory) {
      return "Please select a category.";
    }
    if (!formData.selectedSubCategory) {
      return "Please select a sub-category.";
    }
    if (!formData.selectedWarehouse) {
      return "Please select a warehouse.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateFormData();
    if (errorMessage) {
      notifyError(errorMessage);
      return;
    }

    // TODO: Implement Add Rack API call when RackServices is available.
    notifyError("Add rack functionality is not implemented yet.");
  };

  return (
    <>
      <div  className={`p-4 md:p-6 ${theme ? "bg-gray-50" : "bg-neutral-900"}`}
        style={{ minHeight: '93vh' }}
        >
        <div className="flex-col items-center gap-6 mb-4">
          <h1 className={`text-xl md:text-2xl font-semibold mb-5 ${theme ? "text-gray-900" : "text-white"}`}>
            Add Racks
          </h1>
          <div className={`w-full border rounded-xl shadow-sm p-4 md:p-6 ${theme ? "bg-white border-gray-200" : "bg-neutral-800 border-neutral-700"}`}>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <FormControl className="space-y-1.5">
                  <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                    Category
                  </label>
                  <Select
                    disabled={categoryLoading}
                    value={formData.selectedCategory}
                    placeholder={categoryLoading ? "Loading..." : "Select Category"}
                    required
                    onChange={handleCategoryChange}
                    sx={{...commonInputStyles, minHeight: '41px', color: formData.selectedCategory ? (theme ? '#111827' : '#ffffff') : '#9ca3af'}}
                  >
                    {categories.map((category) => (
                      <Option key={category.id} value={category.id}>
                        {category.category_name}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="space-y-1.5">
                  <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                    Sub Category
                  </label>
                  <Select
                    disabled={subCategoryLoading || !formData.selectedCategory}
                    value={formData.selectedSubCategory}
                    placeholder={
                      subCategoryLoading
                        ? "Loading..."
                        : !formData.selectedCategory
                        ? "Select a category first"
                        : "Select Sub-Category"
                    }
                    required
                    onChange={(_, val) => handleSelectChange("selectedSubCategory", val)}
                    sx={{...commonInputStyles, minHeight: '41px', color: formData.selectedSubCategory ? (theme ? '#111827' : '#ffffff') : '#9ca3af'}}
                  >
                    {subCategories.map((sub) => (
                      <Option key={sub.id} value={sub.id}>
                        {sub.subcategory_name}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="space-y-1.5">
                  <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                    Warehouse
                  </label>
                  <Select
                    value={formData.selectedWarehouse}
                    required
                    placeholder="Select warehouse"
                    onChange={(_, val) => handleSelectChange("selectedWarehouse", val)}
                    sx={{...commonInputStyles, minHeight: '41px', color: formData.selectedWarehouse ? (theme ? '#111827' : '#ffffff') : '#9ca3af'}}
                  >
                    {warehouseOptions.map((opt) => (
                      <Option key={opt} value={opt}>
                        {opt}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="space-y-1.5">
                  <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                    Segment
                  </label>
                  <Input
                    type="number"
                    min={0}
                    name="segment"
                    value={formData.segment}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    required
                    placeholder="Enter segment"
                    sx={commonInputStyles}
                  />
                </FormControl>
                <FormControl className="space-y-1.5">
                  <label className={`text-sm font-medium ${theme ? "text-gray-700" : "text-gray-300"}`}>
                    Volume
                  </label>
                  <Input
                    type="number"
                    min={0.0}
                    name="volume"
                    value={formData.volume}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    required
                    placeholder="Enter Volume"
                    sx={commonInputStyles}
                  />
                </FormControl>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className={`w-full p-2.5 text-white font-semibold rounded-md transition-all duration-200 ${theme ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-700 hover:bg-purple-800"}`}
                >
                  Add Rack
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default AddRacks;
