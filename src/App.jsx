import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import LandingScreen from "./pages/LandingScreen";
import SignUp from "./pages/SignUp";
import Login from "./pages/LoginScreen";
import AccountSettings from "./pages/AccountSetting";
import Dashboard from "./components/dashboard";
import ExpensesInputForm from "./pages/expensesInputForm";
import ResetPass from "./pages/resetPassword";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./components/protectedAuth";
import History from "./pages/History";
import { DashboardContextProvider } from "./context/dashboardContext";
import VerifyOtp from "./pages/verifyOtp";
import ResetPassword from "./pages/resetPassword";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-fit min-w-[375px]  min-h-[588px] h-fit bg-gray-199 border-2 border-gray-300 m-3 ">
        {/* <Router> */}
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          {/* <Route path="/resetpassword/:token" element={<ResetPass />} /> */}
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* Forget Password → Reset Password */}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accountsettings"
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <DashboardContextProvider>
                  <Dashboard />
                </DashboardContextProvider>
              </ProtectedRoute>
            }
          />

          <Route
            path="/expensesinputform"
            element={
              <ProtectedRoute>
                <ExpensesInputForm />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* </Router> */}
      </div>
      {/* <Dashboard /> */}
    </div>
  );
};

export default App;
