const InventoryTable = ({ inventory }) => {
  return (
    <table className="w-full table-fixed border-collapse border border-gray-300">
      <thead className="">
        <tr className="bg-gray-100 dark:bg-sky-950">
          <th className="border p-2 w-1/2">商品名</th>
          <th className="border p-2 w-1/4">数量</th>
          <th className="border p-2 w-1/4">価格</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item.id}>
            <td className="border p-2 break-words text-left">{item.name}</td>
            <td className="border p-2 text-right">{item.quantity}</td>
            <td className="border p-2 text-right">{item.price}円</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
