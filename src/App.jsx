import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeDashboard from  "./components/EmployeeDashboard";
import AdminDashboard from  "./components/AdminDashboard";
import LoginPage from  "./components/LoginPage";
import ProtectedRoute from  "./components/ProtectedRoute";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));  // ✅ ユーザー情報を取得！

  return (
    <Router>
      <Routes>
        {/* ✅ 社員（全員がアクセス可能） */}
        <Route path="/" element={<EmployeeDashboard />} />

        {/* ✅ ログインページ */}
        <Route path="/login" element={<LoginPage />} />

        {/* ✅ 管理者専用ルート（Adminのみアクセス可能） */}
        <Route 
          path="/admin" 
          element={<ProtectedRoute user={user}><AdminDashboard /></ProtectedRoute>} 
        />
      </Routes>
    </Router>
  );
};

export default App;
