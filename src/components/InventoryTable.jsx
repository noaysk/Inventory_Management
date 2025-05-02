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
        {isAdmin && <th className="border p-2">合計金額</th>}
        {isAdmin && <th className="border p-2">仕入先</th>}
        {isAdmin && <th className="border p-2">入荷日</th>}
        {isAdmin && <th className="border p-2">操作</th>}
      </tr>
    </thead>
    
    <tbody>
  {inventory.map((item) => (
    <tr key={item.id}>
      <td className="border p-2">{item.name}</td>
      <td className="border p-2">{item.quantity}</td>
      <td className="border p-2">{item.price}円</td>
      {isAdmin && <td className="border p-2">{item.quantity * item.price}円</td>}
      {isAdmin && <td className="border p-2">{item.supplier}</td>}
      {isAdmin && <td className="border p-2">{item.arrivalDate}</td>}
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
  