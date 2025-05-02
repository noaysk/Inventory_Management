import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./components/EmployeeDashboard";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 従業員ページ（閲覧のみ） */}
        <Route path="/" element={<EmployeeDashboard />} />

        {/* 管理者ページ（ログインしないとアクセス不可） */}
        <Route path="/admin" element={<AdminDashboard />} />


        {/* ログインページ */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
