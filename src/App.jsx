// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../firebase"; // firebaseAppをインポート

import EmployeeDashboard from "./components/EmployeeDashboard";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [inventory, setInventory] = useState([]); // Inventory用のstate追加

  useEffect(() => {
    const fetchInventory = async () => {
      const db = getFirestore(firebaseApp); // firebaseAppを使用してFirestoreを取得
      const inventoryCollection = collection(db, "inventory"); // Firestoreのコレクション
      const inventorySnapshot = await getDocs(inventoryCollection); // データを取得
      const inventoryList = inventorySnapshot.docs.map(doc => doc.data()); // データをマップして取得
      setInventory(inventoryList); // 取得したデータをstateにセット
    };

    fetchInventory(); // コンポーネントがマウントされたときにデータを取得
    localStorage.removeItem("user"); // ← 一時的にログイン情報をクリア
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard inventory={inventory} /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
