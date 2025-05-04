import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../firebase";

import EmployeeDashboard from "./components/EmployeeDashboard";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const db = getFirestore(firebaseApp);
      const inventoryCollection = collection(db, "inventory");
      const inventorySnapshot = await getDocs(inventoryCollection);
      const inventoryList = inventorySnapshot.docs.map(doc => doc.data());
      setInventory(inventoryList);
    };

    fetchInventory();
    localStorage.removeItem("user");
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
