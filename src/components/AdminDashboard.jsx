import React, { useState, useEffect } from "react";
import  {db}  from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";  // 必要な関数をインポート
import AdminInventoryTable from "./AdminInventoryTable";



const AdminDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    price: 0,
    supplier: "",
    arrivalDate: "",
  });

  useEffect(() => {
    const fetchInventory = async () => {
      const querySnapshot = await getDocs(collection(db, "inventory"));
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setInventory(data);
    };
    fetchInventory();
  }, []);

  const handleAddItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "inventory"), newItem);
      setInventory((prevInventory) => [...prevInventory, { ...newItem, id: docRef.id }]);
      setNewItem({ name: "", quantity: 1, price: 0, supplier: "", arrivalDate: "" }); // Reset after adding
    } catch (error) {
      console.error("アイテム追加エラー:", error);
    }
  };

  const handleEditItem = async (index, key, value) => {
    const updatedItem = { ...inventory[index], [key]: value };
    const itemDoc = doc(db, "inventory", inventory[index].id);
    try {
      await updateDoc(itemDoc, updatedItem);
      setInventory((prevInventory) =>
        prevInventory.map((item, i) => (i === index ? updatedItem : item))
      );
    } catch (error) {
      console.error("アイテム更新エラー:", error);
    }
  };

  const handleDeleteItem = async (index) => {
    const itemDoc = doc(db, "inventory", inventory[index].id);
    try {
      await deleteDoc(itemDoc);
      setInventory((prevInventory) => prevInventory.filter((_, i) => i !== index));
    } catch (error) {
      console.error("アイテム削除エラー:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">管理者ダッシュボード</h1>
      
      {/* 商品追加フォーム */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="商品名"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="mb-2 p-2 border"
        />
        <input
          type="number"
          placeholder="数量"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="mb-2 p-2 border"
        />
        <input
          type="number"
          placeholder="価格"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="mb-2 p-2 border"
        />
        <p className="mb-2">
        合計金額: {Number(newItem.price || 0) * Number(newItem.quantity || 0)} 円
      </p>

        <input
          type="text"
          placeholder="仕入先"
          value={newItem.supplier}
          onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
          className="mb-2 p-2 border"
        />
        <input
          type="date"
          placeholder="入荷日"
          value={newItem.arrivalDate}
          onChange={(e) => setNewItem({ ...newItem, arrivalDate: e.target.value })}
          className="mb-2 p-2 border"
        />
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          商品追加
        </button>
      </div>

      {/* 管理者用在庫一覧テーブル */}
      <AdminInventoryTable
        inventory={inventory}
        setInventory={setInventory}
        editMode={true}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
};

export default AdminDashboard;
