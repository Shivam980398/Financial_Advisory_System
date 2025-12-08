import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserDetailProvider from "./context/userDetail.jsx";
import DataToSendProvider from "./context/dataToSend.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { FetchUserDetailProvider } from "./context/fetchUserDetailContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FetchUserDetailProvider>
        <UserDetailProvider>
          <DataToSendProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </DataToSendProvider>
        </UserDetailProvider>
      </FetchUserDetailProvider>
    </BrowserRouter>
  </StrictMode>
  // document.getElementById("root")
);
