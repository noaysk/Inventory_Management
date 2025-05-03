import React, { useState, useEffect } from "react";
import AdminInventoryTable from "./AdminInventoryTable";

const AdminDashboard = () => {
  const [inventory, setInventory] = useState([]);  // ✅ 在庫データのステート管理
  const [editMode, setEditMode] = useState(false);  // ✅ 編集モードの状態管理

  // ✅ 在庫データを取得
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/inventory");
        const data = await response.json();
        console.log("📌 API から取得したデータ:", data);
        setInventory(data);
      } catch (error) {
        console.error("❌ データ取得エラー:", error);
      }
    };

    fetchInventory();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/update-inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inventory),
      });

      const data = await response.json();
      console.log("✅ 保存成功:", data.message);
      setEditMode(false);
    } catch (error) {
      console.error("❌ 保存エラー:", error);
    }
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      name: "新しい商品",
      quantity: 1,
      price: 1000,
      supplier: "未設定",
      arrivalDate: "",
    };
    setInventory((prevInventory) => [...prevInventory, newItem]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">管理者ダッシュボード</h1>
      
      <div className="flex justify-between mb-4">
        <div>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setEditMode((prev) => !prev)}
          >
            {editMode ? "編集終了" : "編集"}
          </button>
          {editMode && (
            <button 
              onClick={handleAdd} 
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              追加する
            </button>
          )}
        </div>

        <button 
          onClick={handleSave} 
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          保存する
        </button>
      </div>

      <AdminInventoryTable inventory={inventory} setInventory={setInventory} editMode={editMode} />
    </div>
  );
};

export default AdminDashboard;
