// EmployeeDashboard.jsx
import React, { useState, useEffect } from "react";
import {db} from "../../firebase";  // default exportに合わせてインポート
import { collection, getDocs } from "firebase/firestore";
import InventoryTable from "./InventoryTable";
import { useNavigate } from "react-router-dom";

// EmployeeDashboardコンポーネント
const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const querySnapshot = await getDocs(collection(db, "inventory"));
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setInventory(data);
    };
    fetchInventory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">在庫一覧</h1>
      <InventoryTable inventory={inventory} isAdmin={false} />
      
      {/* ログインボタン */}
      <div className="text-right mt-4">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-900"
        >
          管理者ログイン
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
