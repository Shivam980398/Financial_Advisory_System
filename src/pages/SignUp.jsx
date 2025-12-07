import React, { useContext } from "react";
import FormComponent from "../components/formComponent";
import { signupFormFields } from "../assets/signupFormFields";
import { useNavigate } from "react-router-dom";
import { userDetail } from "../context/userDetail";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  // const { setEmail, setPassword, setFirstName, setLastName, setNumber } =
  //   useContext(userDetail);
  // const { email, password, firstName, lastName, number } =
  //   useContext(userDetail);
  const {
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
  } = useContext(userDetail);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("password:", password);

    if (!firstName) return toast.error("First name is required");
    if (!lastName) return toast.error("Last name is required");
    if (!email) return toast.error("Email is required");
    if (!password) return toast.error("Password is required");
    if (!phone) return toast.error("Phone number is required");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be 8-16 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
      );
    }

    try {
      const backendUrl = "https://sofia-node.onrender.com/api/v1";
      const payload = {
        firstName,
        lastName,
        email,
        password,
        phone,
      };
      // (currState === "SignUp")
      const response = await axios.post(`${backendUrl}/signup`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      // Success Handling
      if (response.status === 200 || response.status === 201) {
        if (response.data?.token) {
          Cookies.set("token", response.data.token, { expires: 1 });
        }

        toast.success("Account Created Successfully");
        login();
        navigate("/expensesinputform");
        // setLogin(true);
        // setDisplayLogin(false);
      } else {
        toast.error(response.data?.message || "SignUP failed");
      }
    } catch (error) {
      console.error("Signup error", error);
      if (error.response) {
        //Server responded with a status other than 2xx
        console.error(
          "Server response :",
          error.response.data,
          error.response.status
        );
        toast.error(
          error.response.data?.message ||
            `signup failed(${error.response.status})`
        );
      } else if (error.request) {
        //Request was made but no response received
        console.error("No response received:", error.request);
        toast.error(
          ` signup failed: No response from server -check your network connection `
        );
      } else {
        toast.error(` signup failed ` + error.message);
      }
    }
  };

  return (
    <div>
      <div className="w-35 m-5">
        <h1 className="font-sans font-bold text-xl ">
          Create Your PopX account
        </h1>
      </div>

      <FormComponent
        fields={signupFormFields}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPassword={setPassword}
        setPhone={setPhone}
        email={email}
        firstName={firstName}
        lastName={lastName}
        password={password}
        // confirmPassword={confirmPassword}
        phone={phone}
      />
      {/* 
      <div className="px-3">
        <label className="text-sm font-semibold px-2 text-[#6C25FF]">
          <span className="text-red-600">*</span>
          Are you an Agency?{" "}
        </label>
        <br />
        <input type="radio" name="agency" value="yes" className="ml-3" /> Yes
        <input type="radio" name="agency" value="no" className="ml-1" /> No
        <span className="text-red-600">*</span>
      </div> */}
      <div className="absolute bottom-8 ml-5 flex justify-center align-bottom self-end ">
        <button
          type="submit"
          className="w-80 bg-[#6C25FF] align-bottom text-white text-xl py-2 px-12 rounded-md font-medium"
          onClick={handleSubmit}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignUp;
