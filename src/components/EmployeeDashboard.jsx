import React from "react";
import InventoryTable from "./InventoryTable";
import '../App.css'

const EmployeeDashboard = () => {
  return (
    <div className="max-sm">
      <h1 className="xl:text-2xl text-xl font-bold mb-4 text-center">在庫一覧</h1>
      <InventoryTable />
    </div>
  );
};

export default EmployeeDashboard;
