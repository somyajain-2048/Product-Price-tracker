import { useState } from "react";

import api from "../api/axios";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      console.log(response.data);

      // SAVE TOKEN
      localStorage.setItem("token", response.data.token);

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[300px]">
        <h1 className="text-3xl font-bold">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-black text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
