import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = ({ email, otp }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  console.log("ResetPassword props - email:", email, "otp:", otp);

  const handleReset = async () => {
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    if (!otp || !email) return toast.error("OTP or email missing");

    try {
      // const backendUrl = "localhost:4001/api/v1";
      const backendUrl = "https://sofia-node.onrender.com/api/v1";

      console.log("otp is", otp);

      await axios.post(`${backendUrl}/updatePasswordWithOtp`, {
        email,
        otp,
        password,
        confirmPassword,
      });

      toast.success("Password updated successfully ! Please login.");
      localStorage.removeItem("pendingEmail");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="p-4 border rounded mt-4 bg-gray-50">
      <h2 className="text-lg font-bold mb-3">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleReset}
        className="bg-[#6C25FF] text-white w-full p-2 rounded"
      >
        Update Password
      </button>
    </div>
  );
};

export default ResetPassword;
