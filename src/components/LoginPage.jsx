import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      localStorage.removeItem("user");
    }
  }, []);

  const handleLogin = () => {
    const adminUser = {
      username: "admin",
      password: "password",
      isAdmin: true,
    };

    if (username === adminUser.username && password === adminUser.password) {
      localStorage.setItem("user", JSON.stringify(adminUser));
      navigate("/admin");
    } else {
      alert("ログイン失敗!!!IDまたはパスワードが間違っています。");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">LogIn</h2>
      <input
        type="text"
        placeholder="ID"
        className="mb-3 p-2 border"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-5 p-2 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="px-8 py-2 bg-sky-500 text-white rounded hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-900"
        onClick={handleLogin}
      >
        LogIn
      </button>
      <button
        className="px-8 mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
        onClick={() => navigate("/")}
      >
        back
      </button>
    </div>
  );
};

export default LoginPage;
