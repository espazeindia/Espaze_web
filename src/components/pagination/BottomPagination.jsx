import React, { useState } from "react";
import { useMode } from "../../contexts/themeModeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

function BottomPagination({ page, setPage, limit, setLimit, totalDetails, loading ,textSize }) {
  const { theme } = useMode();

  // State to track which 3 pages are currently visible
  const [pageWindow, setPageWindow] = useState(0); // 0 = pages 1,2,3, 1 = pages 2,3,4, etc.

  const handleChange = (newValue) => {
    setPage(0);
    setLimit(newValue);
    setPageWindow(0); // Reset page window when limit changes
  };

  // Get the 3 pages to display in the current window
  const getVisiblePages = () => {
    const totalPages = totalDetails.total_pages || 1;
    const startPage = pageWindow + 1; // Start from pageWindow + 1
    const pages = [];

    for (let i = 0; i < 3; i++) {
      const pageNum = startPage + i;
      if (pageNum <= totalPages) {
        pages.push(pageNum);
      }
    }

    return pages;
  };

  // Navigate left in the page window (slide one page left)
  const navigateLeft = () => {
    if (pageWindow > 0) {
      setPageWindow(pageWindow - 1);
    }
  };

  // Navigate right in the page window (slide one page right)
  const navigateRight = () => {
    const totalPages = totalDetails.total_pages || 1;
    const maxWindow = Math.max(0, totalPages - 3); // Maximum window position
    if (pageWindow < maxWindow) {
      setPageWindow(pageWindow + 1);
    }
  };

  const visiblePages = getVisiblePages();
  const currentPage = page + 1; // Convert to 1-based indexing
  const totalPages = totalDetails.total_pages || 1;
  const maxWindow = Math.max(0, totalPages - 3);
  const canGoLeft = pageWindow > 0;
  const canGoRight = pageWindow < maxWindow;

  return (
    <div
      className={`p-2 mt-2 text-${textSize} ${
        theme ? "text-[#4110a2]" : "text-[#b898fa]"
      }  font-semibold flex items-center justify-between `}
    >
      <div className=" flex items-center ">
        <div className="mx-3">
          Showing <span className={theme ? "text-zinc-800" : "text-white"}>{page * limit + 1}</span>{" "}
          -
          <span className={theme ? "text-zinc-800" : "text-white"}>
            {" "}
            {totalDetails.total < page * limit + limit
              ? totalDetails.total
              : parseInt(page * limit + limit)}{" "}
          </span>
          of {" "}
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
          className={` focus:outline-0 cursor-pointer  p-1 ${
            theme ? "text-zinc-800" : "text-white"
          }`}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className=" flex items-center gap-3">
          {/* Left Navigation Arrow - for page window (always visible) */}
          <div
            className={` rounded-full h-8 w-8 flex justify-center items-center text-lg font-bold border transition-colors ${
              canGoLeft
                ? `${
                    theme ? "text-black hover:bg-gray-200" : "text-white hover:bg-gray-700"
                  } cursor-pointer ${theme ? "border-gray-300" : "border-gray-600"}`
                : `${
                    theme ? "text-gray-400 border-gray-200" : "text-gray-600 border-gray-700"
                  } cursor-not-allowed`
            }`}
            onClick={canGoLeft ? navigateLeft : undefined}
            title={canGoLeft ? "Previous page window" : "Cannot go left"}
          >
            <ChevronLeft className="w-4 h-4" />
          </div>

          {/* Static Page Numbers - Always show exactly 3 */}
          <div className="flex gap-2">
            {visiblePages.map((pageNum) => (
              <div
                key={pageNum}
                className={` rounded-full h-8 w-8 flex justify-center items-center text-sm font-bold ${
                  pageNum === currentPage
                    ? "bg-[#7e50da] text-white cursor-default"
                    : `${
                        theme ? "text-black" : "text-white"
                      } cursor-pointer hover:bg-gray-200 transition-colors border ${
                        theme ? "border-gray-300" : "border-gray-600"
                      }`
                }`}
                onClick={() => pageNum !== currentPage && setPage(pageNum - 1)}
              >
                {pageNum}
              </div>
            ))}
            {/* Fill empty slots if less than 3 pages */}
            {/* {visiblePages.length < 3 &&
              Array.from({ length: 3 - visiblePages.length }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className={` rounded-full h-8 w-8 flex justify-center items-center text-sm font-bold ${
                    theme ? "text-gray-400 border-gray-200" : "text-gray-600 border-gray-700"
                  } border cursor-default`}
                >
                  -
                </div>
              ))} */}
          </div>

          {/* Right Navigation Arrow - for page window (always visible) */}
          <div
            className={` rounded-full h-8 w-8 flex justify-center items-center text-lg font-bold border transition-colors ${
              canGoRight
                ? `${
                    theme ? "text-black hover:bg-gray-200" : "text-white hover:bg-gray-700"
                  } cursor-pointer ${theme ? "border-gray-300" : "border-gray-600"}`
                : `${
                    theme ? "text-gray-400 border-gray-200" : "text-gray-600 border-gray-700"
                  } cursor-not-allowed`
            }`}
            onClick={canGoRight ? navigateRight : undefined}
            title={canGoRight ? "Next page window" : "Cannot go right"}
          >
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
}

export default BottomPagination;
