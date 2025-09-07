// src/pages/AdminDashboard.jsx
import React from "react";
import WarehouseServices from "./WarehouseServices";
import OperationGuyOnboarding from "./OperationGuyOnboarding";

function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Warehouse Management Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Warehouse Information</h2>
        <WarehouseServices />
      </div>

      {/* Operations Guy Onboarding Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Operations Guy Onboarding</h2>
        <OperationGuyOnboarding />
      </div>
    </div>
  );
}

export default AdminDashboard;
