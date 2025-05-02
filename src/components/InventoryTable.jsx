const InventoryTable = ({ inventory, isAdmin, onEdit, onDelete }) => {
    const handleChange = (id, field, value) => {
      const updatedInventory = inventory.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      );
      onEdit(updatedInventory);
    };
  
    return (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">商品名</th>
            <th className="border p-2">数量</th>
            <th className="border p-2">価格</th>
            <th className="border p-2">合計金額</th>
            <th className="border p-2">仕入先</th>
            <th className="border p-2">入荷日</th> {/* ✅ 追加！ */}
            {isAdmin && <th className="border p-2">操作</th>}
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">
                {isAdmin ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleChange(item.id, "name", e.target.value)}
                    className="border p-1 w-32"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="border p-2">
                {isAdmin ? (
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleChange(item.id, "quantity", Number(e.target.value))}
                    className="border p-1 w-16 text-center"
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td className="border p-2">
                {isAdmin ? (
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleChange(item.id, "price", Number(e.target.value))}
                    className="border p-1 w-16 text-center"
                  />
                ) : (
                  `${item.price}円`
                )}
              </td>
              <td className="border p-2">{item.quantity * item.price}円</td>
              <td className="border p-2">
                {isAdmin ? (
                  <input
                    type="text"
                    value={item.supplier}
                    onChange={(e) => handleChange(item.id, "supplier", e.target.value)}
                    className="border p-1 w-32"
                  />
                ) : (
                  item.supplier
                )}
              </td>
              <td className="border p-2">
                {isAdmin ? (
                  <input
                    type="date"
                    value={item.arrivalDate}
                    onChange={(e) => handleChange(item.id, "arrivalDate", e.target.value)}
                    className="border p-1 w-32"
                  />
                ) : (
                  item.arrivalDate
                )}
              </td>
              {isAdmin && (
                <td className="border p-2">
                  <button className="text-red-500" onClick={() => onDelete(item.id)}>削除</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default InventoryTable;
  