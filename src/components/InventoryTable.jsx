const InventoryTable = ({ inventory }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">商品名</th>
          <th className="border p-2">数量</th>
          <th className="border p-2">価格</th>
        </tr>
      </thead>
      <tbody className="text-right">
        {inventory.map((item) => (
          <tr key={item.id}>
            <td className="border p-2">{item.name}</td>
            <td className="border p-2">{item.quantity}</td>
            <td className="border p-2">{item.price}円</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
