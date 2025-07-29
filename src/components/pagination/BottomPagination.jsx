import React from "react";
import { useMode } from "../../contexts/themeModeContext";
function BottomPagination({ page, setPage, limit, setLimit }) {
  const { theme } = useMode();

  const handleChange = (newValue) => {
    console.log(newValue)
    setLimit(newValue);
  };

  return (
    <div
      className={`p-2 mt-2 text-sm ${
        theme ? "text-[#4110a2]" : "text-[#b898fa]"
      }  font-semibold flex items-center justify-between `}
    >
      <div>
        Number of rows :
        <select
          style={{
            color: theme ? "#27272a" : "#ffffff",
            backgroundColor: theme ? "#ffffff" : "#27272a",
          }}
          value={limit}
          onChange={(e) => handleChange(e.target.value)}
          className={`ml-2 focus:outline-0 p-1 ${theme ? "text-zinc-800" : "text-white"}`}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>
      </div>

      <div className=" mr-10">
        <div className=" rounded-full h-7 text-sm font-bold  w-7 flex justify-center items-center  bg-[#d3bffc] text-[#4110a2] cursor-pointer">
          {page + 1}
        </div>
      </div>
    </div>
  );
}

export default BottomPagination;
