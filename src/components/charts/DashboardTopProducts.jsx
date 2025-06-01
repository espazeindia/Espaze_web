import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMode } from "../../contexts/themeModeContext";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);
// Product data for the chart
const productData = [
  { name: "Wireless Headphones", value: 25 },
  { name: "Smart Watches", value: 20 },
  { name: "Bluetooth Speakers", value: 18 },
  { name: "Wireless Chargers", value: 15 },
  { name: "Phone Cases", value: 22 },
];

// Colors for each section
const colors = ["#b974f4", "#fd5934", "#f59e0b", "#0891b2", "#8c52ff"];

// Chart.js data configuration
const data = {
  labels: productData.map((item) => item.name),
  datasets: [
    {
      data: productData.map((item) => item.value),
      backgroundColor: colors,
      hoverBackgroundColor: colors.map((color) => `${color}CC`), // Light hover effect
      borderWidth: 2,
    },
  ],
};

// Chart.js options for a donut chart

export function ProductsChart() {
  const { theme } = useMode();
  const options = {
    responsive: true,
    cutout: "60%", // Creates the donut effect
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          color: "#ffffff", // White text for legend
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            let value = tooltipItem.raw;
            return ` ${tooltipItem.label}: ${value}%`;
          },
        },
        backgroundColor: theme ? "#f5f3ff" : "#27272a",
        titleColor: theme?"#000000":"#ffffff",
        bodyColor: theme?"#000000":"#ffffff",
        borderColor: theme?"#000000":"#e5e7eb",
        borderWidth: 1,
      },
    },
  };
  return (
    <div
      className={`${
        theme ? "bg-white" : "bg-neutral-900"
      } p-5 rounded-lg shadow-md w-full h-full flex flex-col justify-between`}
    >
      <h2 className={`${theme ? "text-black" : "text-white"} text-lg font-semibold`}>
        Top Products
      </h2>
      <div className="h-[75%] flex items-center justify-center mb-5">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
