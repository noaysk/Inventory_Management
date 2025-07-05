import React, { useState, useEffect, useMemo } from "react";
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

      // ▼ 仕入先の50音順でソート
      const sortedData = data.sort((a, b) =>
        a.supplier.localeCompare(b.supplier, "ja")
      );

      setInventory(sortedData);
    };
    fetchInventory();
  }, []);

  const handleAddItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "inventory"), newItem);
      const newItemWithId = { ...newItem, id: docRef.id };

      setInventory((prev) =>
        [...prev, newItemWithId].sort((a, b) =>
          a.supplier.localeCompare(b.supplier, "ja")
        )
      );

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

      const updatedInventory = inventory.map((item, i) =>
        i === index ? updatedItem : item
      );

      setInventory(
        updatedInventory.sort((a, b) =>
          a.supplier.localeCompare(b.supplier, "ja")
        )
      );
    } catch (error) {
      console.error("アイテム更新エラー:", error);
    }
  };

  const handleDeleteItem = async (index) => {
    const itemDoc = doc(db, "inventory", inventory[index].id);
    try {
      await deleteDoc(itemDoc);
      const updatedInventory = inventory.filter((_, i) => i !== index);

      setInventory(
        updatedInventory.sort((a, b) =>
          a.supplier.localeCompare(b.supplier, "ja")
        )
      );
    } catch (error) {
      console.error("アイテム削除エラー:", error);
    }
  };

  // ▼ 仕入先の50音順でソートの下にそのまま
const totalAmount = useMemo(() => {
  return inventory.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);
}, [inventory]);


  return (
    <div className="p-6">
      <div className="grid grid-cols-2 mb-4">
        <h1 className="text-2xl font-bold">ダッシュボード</h1>
        <div className="flex flex-wrap justify-end">
          <h2 className="">合計金額</h2>
          <p className="ml-5 text-xl font-bold">{totalAmount.toLocaleString()} 円</p>
        </div>
      </div>
      <div className="mb-4 overflow-x-auto sm:overflow-x-visible">
        <table className="min-w-[800px] sm:w-full table-fixed border-collapse border">
          <tbody>
            <tr>
              <td className="border p-2 w-[200px] sm:w-2/6">
                <textarea
                  type="text"
                  placeholder="商品名"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="w-full break-words"
                />
              </td>
              <td className="border p-2 w-[120px] sm:w-1/6">
                <input
                  type="number"
                  placeholder="数量"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: e.target.value })
                  }
                  className="w-full"
                />
              </td>
              <td className="border p-2 w-[120px] sm:w-1/6">
                <input
                  type="number"
                  placeholder="価格"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
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
                  onChange={(e) =>
                    setNewItem({ ...newItem, supplier: e.target.value })
                  }
                  className="w-full break-words"
                />
              </td>
              <td className="border p-2 w-[160px] sm:w-1/6">
                <input
                  type="date"
                  value={newItem.arrivalDate}
                  onChange={(e) =>
                    setNewItem({ ...newItem, arrivalDate: e.target.value })
                  }
                  className="w-full"
                />
              </td>
              <td className="border p-2 w-[100px] sm:w-1/6 text-center">
                <button
                  onClick={handleAddItem}
                  className="bg-green-500 hover:bg-green-700 text-white px-5 py-2 rounded"
                >
                  追加
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
