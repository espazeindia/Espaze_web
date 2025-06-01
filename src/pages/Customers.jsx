import React from "react";
import { useMode } from "../contexts/themeModeContext";

export default function Customers() {
  const { theme } = useMode();
  return (
    <div
      className={`w-full p-5 h-full  ${
        theme ? " bg-zinc-100 text-black " : "bg-neutral-950 text-white"
      } overflow-scroll sideBarNone`}
    >
      <h1 className="text-2xl font-bold    transition-all duration-1000 hover:scale-[110%]">
        Customers
      </h1>
      <div className={` ${theme ? "bg-white" : "  bg-zinc-800"} m-8  rounded-lg shadow p-6`}>
        <div className="flex items-center justify-center h-64">
          <p className={theme ? "text-gray-700" : "text-gray-400"}>
            Customers page content will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}
