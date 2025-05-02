import React, { useState, useEffect } from "react";
import AdminInventoryTable from "./AdminInventoryTable";

const AdminDashboard = () => {
  const [inventory, setInventory] = useState([]);  // ✅ 在庫データのステート管理
  const [editMode, setEditMode] = useState(false);  // ✅ 編集モードの状態管理

  useEffect(() => {
    fetch("http://localhost:5000/api/inventory")  // ✅ APIからデータ取得！
      .then((response) => response.json())
      .then((data) => {
        console.log("📌 API から取得したデータ:", data);  // ✅ データ確認
        setInventory(data);
      })
      .catch((error) => console.error("❌ データ取得エラー:", error));
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/update-inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inventory),  // ✅ 削除後のデータを送る！
      });
  
      const data = await response.json();
      console.log("✅ 保存成功:", data.message);
      setEditMode(false);  // ✅ 保存後に編集モードをOFFに！
    } catch (error) {
      console.error("❌ 保存エラー:", error);
    }
  };
  
  
  
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">管理者ダッシュボード</h1>
      
      {/* ✅ ボタンをテーブルの外に配置 */}
      <div className="flex justify-between mb-4">
      <button 
        onClick={() => setEditMode(!editMode)} 
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {editMode ? "編集を終了" : "編集モード"}
      </button>
      <button 
        onClick={handleSave} 
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        保存する
      </button>
    </div>
    


      {/* ✅ 在庫テーブル（編集可能） */}
      <AdminInventoryTable inventory={inventory} setInventory={setInventory} editMode={editMode} />
    </div>
  );
};

export default AdminDashboard;
