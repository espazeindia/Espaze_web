import React from "react";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { useMode } from "../../contexts/themeModeContext";

export default function StatCard({ title, value, change, icon, iconBgClass }) {
  const isPositive = change.value >= 0;
  const { theme } = useMode();

  return (
    <div className={`${theme ? "bg-white":"bg-zinc-900 "} rounded-lg p-5 shadow-md w-full`}>
      <div className="flex justify-between items-center">
        <div>
          <p className={`${theme ? "text-zinc-800":"text-zinc-300"} font-semibold`}>{title}</p>
          <p className={`${theme ? "text-black":"text-white"} text-2xl font-bold mt-1`}> {value}</p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgClass}`}>
          {icon}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
          <span className={`${theme ? "text-zinc-700":"text-gray-300"} text-sm mr-2`}>{change.label}</span>
            <span
              className={`flex items-center border pl-2 rounded-full  text-xs font-medium ${
                isPositive ? "text-green-500 border-green-500" : "text-red-500 border-red-500"
              }`}
            >
              {Math.abs(change.value)}%
              {isPositive ? (
                <ArrowDropUp className=" text-2xl" />
              ) : (
                <ArrowDropDown className="text-2xl" />
              )}
              
              
            </span>
            
          </div>
    </div>
  );
}
