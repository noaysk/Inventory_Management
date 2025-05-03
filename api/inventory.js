// api/inventory.js

export default function handler(req, res) {
    const inventory = [
      { id: 1, name: "商品1", quantity: 10 },
      { id: 2, name: "商品2", quantity: 5 },
    ];
  
    res.status(200).json(inventory);
  }
  