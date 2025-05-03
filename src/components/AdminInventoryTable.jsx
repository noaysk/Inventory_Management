const AdminInventoryTable = ({ inventory, editMode, onEdit, onDelete }) => {
    const handleEdit = (index, key, value) => {
      onEdit(index, key, value);
    };
  
    const handleDelete = (index) => {
      onDelete(index);
    };
  
    return (
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">商品名</th>
            <th className="border p-2">数量</th>
            <th className="border p-2">価格</th>
            <th className="border p-2">合計金額</th>
            <th className="border p-2">仕入先</th>
            <th className="border p-2">入荷日</th>
            {editMode && <th className="border p-2">操作</th>}
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={item.id}>
              <td className="border p-2">
                {editMode ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleEdit(index, "name", e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="border p-2">
                {editMode ? (
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleEdit(index, "quantity", e.target.value)}
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td className="border p-2">
                {editMode ? (
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleEdit(index, "price", e.target.value)}
                  />
                ) : (
                  item.price
                )}
              </td>
              <td className="border p-2">{item.quantity * item.price}円</td>
              <td className="border p-2">
                {editMode ? (
                  <input
                    type="text"
                    value={item.supplier}
                    onChange={(e) => handleEdit(index, "supplier", e.target.value)}
                  />
                ) : (
                  item.supplier
                )}
              </td>
              <td className="border p-2">
                {editMode ? (
                  <input
                    type="date"
                    value={item.arrivalDate}
                    onChange={(e) => handleEdit(index, "arrivalDate", e.target.value)}
                  />
                ) : (
                  item.arrivalDate
                )}
              </td>
              {editMode && (
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(index)}
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
  