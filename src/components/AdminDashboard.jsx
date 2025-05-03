import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
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
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setInventory(data);
    };
    fetchInventory();
  }, []);

  const handleAddItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "inventory"), newItem);
      setInventory((prev) => [...prev, { ...newItem, id: docRef.id }]);
      setNewItem({
        name: "",
        quantity: 1,
        price: 0,
        supplier: "",
        arrivalDate: "",
      });
    } catch (error) {
      console.error("アイテム追加エラー:", error);
    }
  };

  const handleEditItem = async (index, key, value) => {
    const updatedItem = { ...inventory[index], [key]: value };
    const itemDoc = doc(db, "inventory", inventory[index].id);
    try {
      await updateDoc(itemDoc, updatedItem);
      setInventory((prev) =>
        prev.map((item, i) => (i === index ? updatedItem : item))
      );
    } catch (error) {
      console.error("アイテム更新エラー:", error);
    }
  };

  const handleDeleteItem = async (index) => {
    const itemDoc = doc(db, "inventory", inventory[index].id);
    try {
      await deleteDoc(itemDoc);
      setInventory((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("アイテム削除エラー:", error);
    }
  };

  return (
    <div className="p-6">
  <h1 className="text-2xl font-bold mb-4">管理者ダッシュボード</h1>

  {/* スマホ対応：テーブルに横スクロール */}
  <div className="mb-4 overflow-x-auto sm:overflow-x-visible">
  <table className="min-w-[800px] sm:w-full table-fixed border-collapse border">
    <tbody>
      <tr>
        <td className="border p-2 w-[200px] sm:w-2/6">
          <input
            type="text"
            placeholder="商品名"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full break-words"
          />
        </td>
        <td className="border p-2 w-[120px] sm:w-1/6">
          <input
            type="number"
            placeholder="数量"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            className="w-full"
          />
        </td>
        <td className="border p-2 w-[120px] sm:w-1/6">
          <input
            type="number"
            placeholder="価格"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="w-full"
          />
        </td>
        <td className="border p-2 w-[140px] sm:w-1/6">
          {Number(newItem.price || 0) * Number(newItem.quantity || 0)} 円
        </td>
        <td className="border p-2 w-[180px] sm:w-1/6">
          <input
            type="text"
            placeholder="仕入先"
            value={newItem.supplier}
            onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
            className="w-full break-words"
          />
        </td>
        <td className="border p-2 w-[160px] sm:w-1/6">
          <input
            type="date"
            value={newItem.arrivalDate}
            onChange={(e) => setNewItem({ ...newItem, arrivalDate: e.target.value })}
            className="w-full"
          />
        </td>
        <td className="border p-2 w-[100px] sm:w-1/6 text-center">
          <button
            onClick={handleAddItem}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            追加
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>


  {/* テーブルもスクロール対応 */}
  <div className="w-full overflow-x-auto">
    <AdminInventoryTable
      inventory={inventory}
      setInventory={setInventory}
      editMode={true}
      onEdit={handleEditItem}
      onDelete={handleDeleteItem}
    />
  </div>
</div>

  );
};

export default AdminDashboard;
