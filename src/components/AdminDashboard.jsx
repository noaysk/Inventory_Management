import React, { useState, useEffect } from "react";
import InventoryTable from "./InventoryTable";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch("/inventory.json")
      .then((response) => response.json())
      .then((data) => {
        // ✅ `totalPrice` を `price × quantity` で自動計算
        const updatedInventory = data.map(item => ({
          ...item,
          totalPrice: item.price * item.quantity
        }));
        setInventory(updatedInventory);
      });
  }, []);

  const handleEdit = (item) => {
    setInventory(inventory.map((i) => (i.id === item.id ? item : i)));
  };

  const handleDelete = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">管理者ページ</h1>
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-red-700"
        >
          ログアウト
        </button>
      </div>

      {/* ✅ 管理者用在庫テーブル（編集・削除OK） */}
      <InventoryTable inventory={inventory} isAdmin={true} onEdit={handleEdit} onDelete={handleDelete} />

      

      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
        新しい商品を追加
      </button>
    </div>
  );
};

export default AdminDashboard;
