// src/pages/WelcomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { userDetail } from "../context/userDetail";
import { useContext } from "react";
const WelcomePage = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const { setPassword, setEmail } = useContext(userDetail);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center mb-8">
        <FaUserCircle className="text-6xl text-gray-600 mb-2" />
        <h2 className="text-xl font-semibold">{userName}</h2>
      </div>
      <h1 className="text-3xl font-bold mb-4">
        Welcome Back {userName.firstName} 👋
      </h1>
      <p className="mb-6 text-gray-600">What would you like to do?</p>
      <div className="space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/report")}
        >
          Go to Reports
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/expensesinputform")}
        >
          Input new details
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/accountsettings")}
        >
          Go to Settings
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/history")}
        >
          History
        </button>
      </div>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-6"
        onClick={() => {
          localStorage.removeItem("userName");
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
          setPassword("");
          setEmail("");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default WelcomePage;
