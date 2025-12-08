import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import Cookies from "js-cookie";

export const FetchUserDetailContext = createContext();

export const FetchUserDetailProvider = ({ children, value }) => {
  const [image, setImage] = useState(null);

  // User Data (you will later replace this with real API)
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    id: "",
  });

  // Edit Modal State
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(user);

  // Upload Image Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // Display uploaded image
      localStorage.setItem("profileImage", reader.result); // Save
    };
    reader.readAsDataURL(file);
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return "?";
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return firstInitial + lastInitial;
  };
  //   useEffect(() => {
  //     // Fetch user data from API when component mounts
  //     const storedImage = localStorage.getItem("profileImage");
  //     if (storedImage) {
  //       setImage(storedImage);
  //     }
  //     const fetchUserData = async () => {
  //       try {
  //         const backend = "https://sofia-node.onrender.com/api/v1";
  //         const token = Cookies.get("token");
  //         const res = await axios.get(`${backend}/profile`, {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         setUser(res.data.user);
  //         console.log("User data:", res.data);
  //         // console.log("user data:", res.data.user);
  //         // setEditData(res.data);
  //       } catch (error) {
  //         toast.error("Failed to fetch user data");
  //       }
  //     };

  //     fetchUserData();
  //   }, []);

  // Save Profile Handler
  const handleSave = async () => {
    try {
      const backend = "https://sofia-node.onrender.com/api/v1";

      const token = Cookies.get("token");

      const res = await axios.put(
        `${backend}/profile`,
        {
          firstName: editData.firstName,
          lastName: editData.lastName,
          phone: editData.phone,
          email: editData.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Profile updated");
      setUser(res.data.user);
      setOpenEdit(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update");
    }
  };

  return (
    <FetchUserDetailContext.Provider
      value={{
        image,
        setImage,
        user,
        setUser,
        openEdit,
        setOpenEdit,
        editData,
        setEditData,
        handleImageUpload,
        handleSave,
        getInitials,
      }}
    >
      {children}
    </FetchUserDetailContext.Provider>
  );
};
