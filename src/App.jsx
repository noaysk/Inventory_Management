import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import EmployeeDashboard from "./components/EmployeeDashboard";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/login" element={<LoginPage onLogin={setIsAdmin} />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
