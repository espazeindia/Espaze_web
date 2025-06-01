import React, { useState } from "react";
import { useMode } from "../../contexts/themeModeContext";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export default function SalesChart({salesData}) {
  const { theme } = useMode();

  return (
    <div className={`${theme ? "bg-white border border-zinc-100":"bg-zinc-900 border border-zinc-800"} rounded-lg p-5 shadow-md w-full`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`${theme ? "text-black":"text-white"} text-lg font-semibold`}>Sales Overview</h2>
      </div>

      <div style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8c52ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8c52ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme ? "#a1a1aa" : "#9ca3af", fontSize: 13 }}
              dy={2}
            />
            <YAxis
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
              axisLine={false}
              tickLine={false}
              tick={ theme ? "fill : #a1a1aa" : "fill: #9ca3af" }
              dx={-2}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme ? "#d4d4d8":"#e5e7eb"}/>
            <Tooltip
              formatter={(value) => [`Sales: ₹${value.toLocaleString()}`]}
              contentStyle={{
                backgroundColor: theme ? "#f5f3ff" : "#27272a",
                color: theme? "#5b21b6" : "#ffffff",
                borderColor: theme ? "#ffffff" : "#e5e7eb",
                borderRadius: "0.375rem",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#8c52ff"
              fillOpacity={1}
              fill="url(#salesGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
