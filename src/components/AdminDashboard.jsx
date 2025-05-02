import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">管理者用在庫管理</h1>
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
        新しい商品を追加
      </button>
      {/* InventoryTableコンポーネントを拡張してアドミン用表示 */}
    </div>
  );
};

export default AdminDashboard;
