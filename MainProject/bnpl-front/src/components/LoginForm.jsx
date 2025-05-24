// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/token/`, {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);

      // Fetch user role
      const profile = await axios.get(`${API_BASE_URL}/api/me/`, {
        headers: { Authorization: `Token ${res.data.token}` },
      });

      localStorage.setItem("role", profile.data.role);

      // Role-based redirect
      if (profile.data.is_merchant === true) {
        navigate("/merchant-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 max-w-sm mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        className="w-full border p-2"
        type="userName"
        placeholder="UserName"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <input
        className="w-full border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default Login;
