import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react"; // ← 追加する
import EmployeeDashboard from "./components/EmployeeDashboard";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  useEffect(() => {
    localStorage.removeItem("user"); // ← 一時的にログイン情報をクリア
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
