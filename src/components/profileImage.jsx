import React, { useEffect } from "react";

const ProfileImage = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

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
  return <div></div>;
};

export default ProfileImage;
