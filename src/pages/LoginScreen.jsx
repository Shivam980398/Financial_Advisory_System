import React from "react";
import FormComponent from "../components/formComponent";
import { useNavigate } from "react-router-dom";
import { userDetail } from "../context/userDetail";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
const loginFields = {
  email: {
    label: "Email",
    placeholder: "Enter your email",
    required: true,
    type: "text",
  },
  password: {
    label: "Password",
    placeholder: "Enter password",
    required: true,
    type: "password",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const { email, password, setEmail, setPassword } = useContext(userDetail);
  const {} = useContext(userDetail);
  const [currState, setCurrState] = React.useState("login");
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      const backendUrl = "https://sofia-node.onrender.com/api/v1";
      if (currState === "login") {
        response = await axios.post(`${backendUrl}/login`, {
          email,
          password,
        });
        if (response.status === 200 && response.data) {
          Cookies.set("token", response.data.token, { expires: 1 });
          const userName =
            response.data.user.firstName + " " + response.data.user.lastName ||
            "User";
          localStorage.setItem("userName", userName);
          toast.success("Login Successful");
          login();

          navigate("/dashboard");

          // setLogin(true);
          // setDisplayLogin(false);
        } else {
          if (error.response && error.response.data) {
            toast.error(error.response.data.message || `Login failed`);
          } else {
            toast.error(`Login failed due to invalid credentials`);
          }
        }
      } else if (currState === "forgetPassword") {
        response = await axios.post(`${backendUrl}/forgetPassword`, {
          email,
        });
        if (response.status === 200 && response.data) {
          toast.success("To Reset Password OTP Sent to your Email");
          localStorage.setItem("pendingEmail", email);
          navigate("/verify-otp");
        } else {
          if (error.response && error.response.data) {
            toast.error(error.response.data.message || `Reset failed`);
          } else {
            toast.error(`Reset failed due to invalid credentials`);
          }
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || `Login failed`);
      } else {
        toast.error(`Login failed due to network error`);
      }
    }
  };
  return (
    <>
      <div className="w-35 m-5 mb-0">
        <h1 className="font-sans font-bold text-xl ">
          {currState === "login"
            ? "Login to your PopX account"
            : "Forget Password"}
        </h1>
      </div>
      <div className="w-55 m-3 ml-5">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,</p>
      </div>
      <FormComponent
        fields={
          currState === "login" ? loginFields : { email: loginFields.email }
        }
        setEmail={setEmail}
        setPassword={setPassword}
      />
      <div className="  flex justify-center mt-4">
        <button
          className="w-80 bg-[#6C25FF] align-bottom text-white text-xl py-2 rounded-md font-medium"
          onClick={handleSubmit}
        >
          {currState === "login" ? "Login" : "Reset Password"}
        </button>
      </div>
      {currState === "login" ? (
        <div className="w-55 flex justify-between mt-4 pr-1">
          <div>
            <span
              className="text-blue-500 cursor-pointer fw-500 absolute ml-2 mr-5 mt-2"
              onClick={() => setCurrState("forgetPassword")}
            >
              Forget Password
            </span>
          </div>
          <div>
            <span
              className="text-blue-500 cursor-pointer fw-500 absolute ml-2 mr-5 mt-2"
              onClick={() => navigate("/signup")}
            >
              Create New Account
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Login;
