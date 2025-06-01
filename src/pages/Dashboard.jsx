import React, { useEffect, useState } from "react";
import StatCard from "../components/cards/StatsCards";
import DashboardSalesChart from "../components/charts/DashboardSalesChart";
import { ProductsChart } from "../components/charts/DashboardTopProducts";
import { AttachMoney, ShoppingCart, People, LocalOffer } from "@mui/icons-material";
import { useMode } from "../contexts/themeModeContext";

const salesData = [
  ...Array.from({ length: 50 }, (_, i) => {
    const baseDate = new Date("2025-02-15");
    baseDate.setDate(baseDate.getDate() + i);
    return {
      date: baseDate.toISOString().split("T")[0],
      total_sales: i * 200,
      sales_growth: parseFloat((Math.random() * 5).toFixed(2)), // Convert to number
      new_orders: Math.floor(Math.random() * 50),
      orders_growth: parseFloat((Math.random() * 10 - 5).toFixed(2)), // Convert to number
      new_customers: Math.floor(Math.random() * 20),
      customers_growth: parseFloat((Math.random() * 5 - 2).toFixed(2)), // Convert to number
      avg_order_value: Math.floor(Math.random() * 20),
      avg_order_growth: parseFloat((Math.random() * 5 - 3).toFixed(2)), // Convert to number
      sales: Math.floor(Math.random() * 1000),
    };
  }),
];

const formatCurrency = (value) => ` ₹ ${value}`;

function Dashboard() {
  const { theme } = useMode();

  const [dateData, setDateData] = useState({
    from: "",
    to: "",
  });

  const [stats, setStats] = useState({
    total_sales: 0,
    sales_growth: 0.0,
    new_orders: 0,
    orders_growth: 0.0,
    new_customers: 0,
    customers_growth: 0.0,
    avg_order_value: 0,
    avg_order_growth: 0.0,
  });
  const [salesOverviewData,setSalesOverviewData]=useState([])
  const[pastPrevious,setPastPrevious] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDateData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const currentDate = new Date();
    const prevDate = new Date(currentDate);
    const pastPrevious = new Date(currentDate);
    prevDate.setMonth(prevDate.getMonth() - 1);
    pastPrevious.setMonth(pastPrevious.getMonth() - 2);
    setPastPrevious(pastPrevious.toISOString().split("T")[0])
    if (prevDate.getMonth() === currentDate.getMonth()) {
        prevDate.setDate(0);
    }
    const defaultDateData = {
      from: prevDate.toISOString().split("T")[0],
      to: currentDate.toISOString().split("T")[0],
    };
    setDateData(defaultDateData);
}, []);

  useEffect(() => {
    const changeDateData = () => {
      let filterData = salesData.filter((data) => data.date >= dateData.from);
      filterData = filterData.filter((data) => data.date <= dateData.to);
      let sumTotal = filterData.reduce(
        (acc, data) => {
          (acc.total_sales = data.total_sales),
            (acc.sales_growth += data.sales_growth),
            (acc.new_orders += data.new_orders),
            (acc.orders_growth += data.orders_growth),
            (acc.new_customers += data.new_customers),
            (acc.customers_growth += data.customers_growth),
            (acc.avg_order_growth += data.avg_order_growth),
            (acc.avg_order_value += data.avg_order_value);
          return acc;
        },
        {
          total_sales: 0,
          sales_growth: 0.0,
          new_orders: 0,
          orders_growth: 0.0,
          new_customers: 0,
          customers_growth: 0.0,
          avg_order_value: 0,
          avg_order_growth: 0.0,
        }
      );
      sumTotal = {
        ...sumTotal,
        sales_growth: sumTotal.sales_growth.toFixed(2),
        orders_growth: sumTotal.orders_growth.toFixed(2),
        customers_growth: sumTotal.customers_growth.toFixed(2),
        avg_order_growth: sumTotal.avg_order_growth.toFixed(2),
      };
      setStats(sumTotal);
      const TransformedSalesData = filterData.map((data) => {
        return { name: data.date.slice(5,10), sales: data.sales || 0
         };
      });
      setSalesOverviewData(TransformedSalesData)
      
    };
    changeDateData();
  }, [dateData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = String(date.getFullYear()).slice(2); // last 2 digits
    return `${day} ${month} ${year}`;
  };
  
  return (
    <div
      className={`${
        theme ? "bg-zinc-100 text-black" : "bg-neutral-950 text-white"
      } w-full min-h-full  p-5`}
    >
      <div className="text-2xl font-bold mb-5 flex justify-between">
        Dashboard Overview
        <div className={`${theme? "":"darkMode"} flex gap-3 items-center`}>
          <label className="text-sm font-medium">From</label>
          <input
            type="date"
            name="from"
            value={dateData.from}
            onChange={handleChange}
            className={`${theme ? "bg-white border border-zinc-100 text-black":"bg-zinc-800 border border-zinc-700 text-white"}
             text-xs p-[6px] font-medium rounded-md`}
          />
          <label className="text-sm font-medium">To</label>
          <input
            name="to"
            value={dateData.to}
            onChange={handleChange}
            className={`${theme ? "bg-white border border-zinc-100 text-black":"bg-zinc-800 border border-zinc-700 text-white"}
             text-xs p-[6px] font-medium rounded-md`}
            type="date"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <StatCard
          title="Total Sales"
          value={formatCurrency(stats?.total_sales) || 0}
          change={{ value: stats?.sales_growth || 0, label: `${formatDate(pastPrevious)} to ${formatDate(dateData.from)}` }}
          icon={<AttachMoney style={{ color: "#9e6ffc" }} />}
          iconBgClass="bg-blue-50 dark:bg-violet-500/30"
        />

        <StatCard
          title="New Orders"
          value={stats?.new_orders?.toString() || "0"}
          change={{ value: stats?.orders_growth || 0, label: `${formatDate(pastPrevious)} to ${formatDate(dateData.from)}` }}
          icon={<ShoppingCart style={{ color: "#1976d2" }} />}
          iconBgClass="bg-blue-50 dark:bg-blue-500/30"
        />

        <StatCard
          title="New Customers"
          value={stats?.new_customers?.toString() || "0"}
          change={{
            value: stats?.customers_growth || 0,
            label: `${formatDate(pastPrevious)} to ${formatDate(dateData.from)}`,
          }}
          icon={<People style={{ color: "#4caf50" }} />}
          iconBgClass="bg-green-50 dark:bg-green-500/30"
        />

        <StatCard
          title="Average Order"
          value={stats?.avg_order_value || 0}
          change={{
            value: stats?.avg_order_growth || 0,
            label: `${formatDate(pastPrevious)} to ${formatDate(dateData.from)}`,
          }}
          icon={<LocalOffer style={{ color: "#ff9800" }} />}
          iconBgClass="bg-amber-50 dark:bg-amber-500/30"
        />
      </div>
      <div className="mt-5 flex gap-5">
        <div className="w-8/12">
          <DashboardSalesChart salesData={salesOverviewData} />
        </div>
        <div className="w-4/12">
          <ProductsChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
