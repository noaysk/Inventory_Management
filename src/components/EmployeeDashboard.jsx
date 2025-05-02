import React from "react";
import { useNavigate } from "react-router-dom";
import InventoryTable from "./InventoryTable";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 relative">
      <div className="grid grid-cols-3 gap-4">
        <div></div>
       
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">在庫一覧</h1>
        </div>
        <div className="text-right">
        <button
          onClick={() => navigate("/login")}
          className=" px-4 py-2 bg-sky-500 mb-4  text-white rounded hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-900" 
        >
          ログイン
        </button>
      </div>
      </div>
      <InventoryTable />
    </div>
  );
};

export default EmployeeDashboard;
