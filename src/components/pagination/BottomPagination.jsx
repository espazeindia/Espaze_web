import React from "react";
import { useMode } from "../../contexts/themeModeContext";
function BottomPagination({ page, setPage, limit, setLimit, pageDetails, totalDetails, loading }) {
  const { theme } = useMode();

  const handleChange = (newValue) => {
    setPage(0);
    setLimit(newValue);
  };

  return (
    <div
      className={`p-2 mt-2 ${
        theme ? "text-[#4110a2]" : "text-[#b898fa]"
      }  font-semibold flex items-center justify-between `}
    >
      <div className=" flex items-center ">
        <div className="mx-5">
          Showing <span className={theme ? "text-zinc-800" : "text-white"}>{page * limit + 1}</span>{" "}
          -
          <span className={theme ? "text-zinc-800" : "text-white"}>
            {" "}
            {totalDetails.total < page * limit + limit
              ? totalDetails.total
              : parseInt(page * limit + limit)}{" "}
          </span>
          of Total{" "}
          <span className={theme ? "text-zinc-800" : "text-white"}>{totalDetails.total}</span>{" "}
          Results
        </div>
        Number of rows :
        <select
          style={{
            color: theme ? "#27272a" : "#ffffff",
            backgroundColor: theme ? "#ffffff" : "#27272a",
          }}
          value={limit}
          onChange={(e) => handleChange(e.target.value)}
          className={` focus:outline-0 p-1 ${theme ? "text-zinc-800" : "text-white"}`}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      (loading ? <div>Loading...</div> :
      <div className=" flex gap-3 mr-10">
        {!pageDetails.next && page - 2 >= 0 && (
          <div
            className={` rounded-full h-7 text-sm font-bold  w-7 flex justify-center items-center  ${
              theme ? "text-black" : "text-white"
            } cursor-pointer`}
            onClick={() => setPage(page - 2)}
          >
            {page - 1}
          </div>
        )}
        {pageDetails.prev && (
          <div
            className={` rounded-full h-7 text-sm font-bold  w-7 flex justify-center items-center  ${
              theme ? "text-black" : "text-white"
            } cursor-pointer`}
            onClick={() => setPage(page - 1)}
          >
            {page}
          </div>
        )}
        <div className=" rounded-full h-7 text-sm font-bold  w-7 flex justify-center items-center  bg-[#7e50da] text-white cursor-pointer">
          {page + 1}
        </div>
        {pageDetails.next && page + 2 <= totalDetails.total_pages && (
          <div
            className={` rounded-full h-7 text-sm font-bold  w-7 flex justify-center items-center  ${
              theme ? "text-black" : "text-white"
            } cursor-pointer`}
            onClick={() => setPage(page + 1)}
          >
            {page + 2}
          </div>
        )}
        {!pageDetails.prev && page + 3 <= totalDetails.total_pages && (
          <div
            className={` rounded-full h-7 text-sm font-bold  w-7 flex justify-center items-center  ${
              theme ? "text-black" : "text-white"
            } cursor-pointer`}
            onClick={() => setPage(page + 2)}
          >
            {page + 3}
          </div>
        )}
      </div>
      )
    </div>
  );
}

export default BottomPagination;
