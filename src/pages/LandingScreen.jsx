import React from "react";
import { useNavigate } from "react-router-dom";

const LandingScreen = () => {
  const navigate = useNavigate(); // React Router Hook for navigation

  return (
    <div className="flex flex-col w-full">
      <div className="h-80 w-full"></div>
      <div className="flex flex-col p-6">
        <h1 className="text-2xl font-sans font-bold text-gray-900">
          Welcome to <span className="text-[#6C25FF]">FLAFAT</span>
        </h1>
        <div className="w-[300px]">
          <p className="mt-2 text-sm text-gray-600 leading-tight whitespace-pre-wrap">
            <span className="text-white">
              {" "}
              {"Financial Literacy and,\n Fraud Awareness Tool."}
            </span>
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 w-full flex flex-col gap-4">
          <button
            onClick={() => navigate("/SignUp")}
            className="w-full py-2 bg-[#6C25FF] text-white rounded-md font-medium"
          >
            Create Account
          </button>
          <button
            onClick={() => navigate("/Login")}
            className="w-full py-2 text-black text-sm font-medium border bg-[#CEBAFB] rounded-md"
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
