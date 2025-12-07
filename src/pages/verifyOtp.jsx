import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ResetPassword from "./resetPassword";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const email = localStorage.getItem("pendingEmail");

  const handleVerify = async () => {
    if (!otp) return toast.error("Enter OTP");

    try {
      const backendUrl = "https://sofia-node.onrender.com/api/v1";
      //   const backendUrl = "http://localhost:4001/api/v1";

      await axios.post(`${backendUrl}/verify_otp`, { email, otp });

      toast.success("OTP verified successfully!");
      setVerified(true);
      console.log("verified status:", otp);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
      setVerified(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-3">Verify OTP</h1>
      <p className="mb-3">OTP sent to: {email}</p>
      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={verified}
          className={`border p-2 w-full transition-opacity duration-300 ${
            verified ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
        />
        {verified && (
          <span className="text-green-500 font-semibold text-xl">
            ✓ Verified
          </span>
        )}
      </div>
      {!verified && (
        <button
          onClick={handleVerify}
          className="bg-[#6C25FF] text-white w-full p-2 rounded mb-3"
        >
          Verify OTP
        </button>
      )}

      {verified && <ResetPassword email={email} otp={otp} />}
    </div>
  );
};

export default VerifyOtp;
