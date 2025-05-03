import React, { useEffect, useRef, useState } from "react";

const AdminInventoryTable = ({ inventory, editMode, onEdit, onDelete }) => {
  const [localInventory, setLocalInventory] = useState([]);
  const isComposingRef = useRef(false);

  useEffect(() => {
    setLocalInventory(inventory);
  }, [inventory]);

  const handleChange = (index, key, value) => {
    const updated = [...localInventory];
    updated[index][key] = value;
    setLocalInventory(updated);
    if (!isComposingRef.current) {
      onEdit(index, key, value);
    }
  };

  const handleCompositionEnd = (index, key, e) => {
    isComposingRef.current = false;
    handleChange(index, key, e.target.value);
  };

  return (
    <table className="w-full table-fixed border-collapse border text-sm">
      <thead>
        <tr className="bg-gray-100 dark:bg-sky-950">
          <th className="border p-2 w-2/6">商品名</th>
          <th className="border p-2 w-1/6">数量</th>
          <th className="border p-2 w-1/6">単価</th>
          <th className="border p-2 w-1/6">合計金額</th>
          <th className="border p-2 w-1/6">仕入先</th>
          <th className="border p-2 w-1/6">入荷日</th>
          {editMode && <th className="border p-2 w-1/6">操作</th>}
        </tr>
      </thead>
      <tbody>
        {localInventory.map((item, index) => (
          <tr key={item.id}>
            <td className="border p-2 break-words text-left">
              {editMode ? (
                <input
                  type="text"
                  value={item.name}
                  className="w-full break-words text-left"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  onCompositionStart={() => (isComposingRef.current = true)}
                  onCompositionEnd={(e) => handleCompositionEnd(index, "name", e)}
                />
              ) : (
                item.name
              )}
            </td>
            <td className="border p-2">
              {editMode ? (
                <input
                  className="w-full"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleChange(index, "quantity", e.target.value)}
                />
              ) : (
                item.quantity
              )}
            </td>
            <td className="border p-2">
              {editMode ? (
                <input
                  className="w-full"
                  type="number"
                  value={item.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                />
              ) : (
                item.price
              )}
            </td>
            <td className="border p-2">
              {item.quantity * item.price} 円
            </td>
            <td className="border p-2 break-words text-left">
              {editMode ? (
                <input
                  className="w-full break-words text-left"
                  type="text"
                  value={item.supplier}
                  onChange={(e) => handleChange(index, "supplier", e.target.value)}
                  onCompositionStart={() => (isComposingRef.current = true)}
                  onCompositionEnd={(e) => handleCompositionEnd(index, "supplier", e)}
                />
              ) : (
                item.supplier
              )}
            </td>
            <td className="border p-2">
              {editMode ? (
                <input
                  className="w-full"
                  type="date"
                  value={item.arrivalDate}
                  onChange={(e) => handleChange(index, "arrivalDate", e.target.value)}
                />
              ) : (
                item.arrivalDate
              )}
            </td>
            {editMode && (
              <td className="border p-2 text-center">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onDelete(index)}
                >
                  削除
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminInventoryTable;
