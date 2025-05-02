import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InventoryTable from "./InventoryTable";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch("/inventory.json") // ✅ JSONファイルからデータ取得
      .then((response) => response.json())
      .then((data) => setInventory(data));
  }, []);

  return (
    <div className="p-6 relative">
      <div className="grid grid-cols-3 gap-4">
        <div></div>
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">在庫一覧</h1>
        </div>
        <div className="text-right">
          {/* ✅ 管理者ログインボタンをそのまま残す！ */}
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-sky-500 mb-4 text-white rounded hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-900"
          >
            管理者ログイン
          </button>
        </div>
      </div>
      
      <InventoryTable inventory={inventory} isAdmin={false} />
    </div>
  );
};

export default EmployeeDashboard;
