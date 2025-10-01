import React, { useState } from "react";
import { X } from "lucide-react";
import { useMode } from "../../contexts/themeModeContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import { LoaderCircle } from "lucide-react";
import MetaDataServices from "../../services/MetaDataServices";
import { downloadAsExcel } from "../../utils/download_ExcelFile";

const SelectedSubcategoriesDisplay = ({
  selectedSubcategoryIds,
  setSelectedCategoryIds,
  setSelectedSubcategoryIds,
  selectedSubcategories,
  setSelectedSubcategories,
}) => {
  const { theme } = useMode();
  const [loading, setLoading] = useState(false);

  const handleRemoveSubcategory = (subcategory) => {
    console.log(subcategory);
    setSelectedCategoryIds((prevData) =>
      prevData.filter((ids) => ids !== subcategory.categoryOfSub)
    );
    setSelectedSubcategories((prevData) =>
      prevData.filter((subcat) => subcat.id !== subcategory.id)
    );
    setSelectedSubcategoryIds((prevData) => prevData.filter((ids) => ids !== subcategory.id));
  };

  const handleSubmit = async () => {
    if (selectedSubcategoryIds.length === 0) return;
    setLoading(true);
    try {
      const result = await MetaDataServices.FetchMetadataBySubCategoryIds(selectedSubcategoryIds);
      if (result.success && result.data?.length > 0) {
        const transformData = result.data.map((metadataRow, index) => ({
          Serial_Number: index + 1,
          ...metadataRow,
          Quantity: null,
          Price: null,
          Manufacturing_Date: null,
          Expiry_Date: null,
        }));

        await downloadAsExcel(transformData, "Metadata_For_Subcategories");
        notifySuccess("Excel file downloaded successfully!");
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <div
      className={`h-[23vh] w-full p-4 flex flex-col  ${
        theme ? "bg-white text-gray-800" : "bg-zinc-800 text-white"
      }`}
    >
      <div className="font-semibold mb-2">Selected Subcategories</div>
      <div className="flex">
        <div className="flex flex-wrap gap-2 flex-grow max-h-32 overflow-x-hidden overflow-y-scroll sideBarNone">
          {selectedSubcategories?.length > 0 ? (
            selectedSubcategories.map((subcategory) => (
              <span
                key={subcategory.id}
                className="px-3 py-1 rounded-full text-sm bg-violet-600 text-white flex items-center"
              >
                {subcategory.name}
                <button
                  onClick={() => handleRemoveSubcategory(subcategory)}
                  className="ml-2 text-white"
                >
                  <X size={16} />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-400">No selection</span>
          )}
        </div>
        <div className=" ml-4">
          <button
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg fixed bottom-3 right-3 shadow hover:scale-105 transition disabled:opacity-50 overflow-hidden"
            disabled={selectedSubcategories.length === 0 || loading}
            onClick={handleSubmit}
          >
            {loading ? <LoaderCircle className=" animate-spin" /> : <span>Submit</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedSubcategoriesDisplay;
