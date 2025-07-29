import React from "react";
import { useMode } from "../../contexts/themeModeContext";
function BottomPagination({ page, setPage, limit, setLimit }) {
  const { theme } = useMode();

  return (
    <div
      className={`p-2 text-sm ${
        theme ? "text-[#4110a2]" : "text-[#b898fa]"
      }  font-semibold`}
    >
      Number of rows :
      <select
      className = {`ml-2 focus:outline-0 p-1 ${theme ? "text-zinc-800":"text-white"}`}>
        <option>10</option>

        <option>20</option>

        <option>25</option>
      </select>
    </div>
  );
}

export default BottomPagination;
