import React from "react";
import { X } from "lucide-react";

const SelectedSubcategoriesDisplay = ({
  selectedSubcategoryNames,
  handleRemoveSubcategory,
  handleSave,
  saving,
  theme,
}) => {
  return (
    <div className={`p-4 rounded-lg relative flex flex-col ${theme ? "bg-white" : "bg-transparent"}`}>
      <div className="font-semibold mb-2">Selected Subcategories</div>
      <div className="flex">
        <div className="flex flex-wrap gap-2 flex-grow max-h-32 overflow-y-auto overflow-x-hidden">
          {selectedSubcategoryNames?.length > 0 ? (
            selectedSubcategoryNames.map((name) => (
              <span key={name} className="px-3 py-1 rounded-full text-sm bg-violet-600 text-white flex items-center">
                {name}
                <button
                  onClick={() => handleRemoveSubcategory(name)}
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
        <div className="flex-shrink-0 ml-4">
          <button
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:scale-105 transition disabled:opacity-50 overflow-hidden"
            disabled={selectedSubcategoryNames.length === 0}
            onClick={handleSave}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedSubcategoriesDisplay;