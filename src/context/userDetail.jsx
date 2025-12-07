import { createContext, useState } from "react";

export const userDetail = createContext(null);

const UserDetailProvider = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
  };

  return (
    <userDetail.Provider value={contextValue}>
      {props.children}
    </userDetail.Provider>
  );
};

export default UserDetailProvider;
