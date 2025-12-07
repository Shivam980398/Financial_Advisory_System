import { useEffect, useState } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { toast } from "react-toastify";
// import { Cookie } from "lucide-react";
import Cookies from "js-cookie";

export default function AccountSettings() {
  // const [image, setImage] = useState("https://i.pravatar.cc/100");
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
  useEffect(() => {
    // Fetch user data from API when component mounts
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setImage(storedImage);
    }
    const fetchUserData = async () => {
      try {
        const backend = "https://sofia-node.onrender.com/api/v1";
        const token = Cookies.get("token");
        const res = await axios.get(`${backend}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        console.log("User data:", res.data);
        // console.log("user data:", res.data.user);
        // setEditData(res.data);
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

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
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-5">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          {image ? (
            <img
              src={image}
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover border"
            />
          ) : (
            <span
              className="w-full h-full rounded-full border flex items-center justify-center 
             bg-gray-200 text-3xl font-bold text-gray-700"
            >
              {getInitials(user.firstName, user.lastName)}
            </span>
          )}

          {/* Camera Button */}
          <label
            htmlFor="imageUpload"
            className="absolute bottom-0 right-0 bg-[var(--primary-color)] text-white 
                       p-1 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer 
                       border border-white shadow-md"
          >
            <PhotoCameraIcon fontSize="small" />
          </label>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* Name & ID */}
        <h2 className="mt-3 text-lg font-semibold">
          {user?.firstName} {user?.lastName}
        </h2>

        {/* Edit Button */}
        <button
          onClick={() => {
            setEditData(user);
            setOpenEdit(true);
          }}
          className="mt-3 bg-[var(--primary-color)] text-white text-sm px-4 py-2 
                     rounded-md shadow hover:opacity-90"
        >
          Edit Profile
        </button>
      </div>

      <div className="my-6 border-t border-gray-300" />

      {/* User Details */}
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500"> First Name</p>
          <p className="text-sm font-medium">{user?.firstName}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500"> Last Name</p>
          <p className="text-sm font-medium">{user?.lastName}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Email</p>
          <p className="text-sm font-medium">{user?.email}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Phone Number</p>
          <p className="text-sm font-medium">{user?.phone}</p>
        </div>
      </div>

      {/* ---------- EDIT PopUp ---------- */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-lg font-bold mb-3">Edit Profile</h2>

            <input
              className="border w-full p-2 mb-2 rounded"
              placeholder="First Name"
              value={editData.firstName}
              onChange={(e) =>
                setEditData({ ...editData, firstName: e.target.value })
              }
            />
            <input
              className="border w-full p-2 mb-2 rounded"
              placeholder="Last Name"
              value={editData.lastName}
              onChange={(e) =>
                setEditData({ ...editData, lastName: e.target.value })
              }
            />
            <input
              className="border w-full p-2 mb-2 rounded"
              placeholder="Phone"
              value={editData.phone}
              onChange={(e) =>
                setEditData({ ...editData, phone: e.target.value })
              }
            />
            <input
              className="border w-full p-2 mb-2 rounded"
              placeholder="Email"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />

            <div className="flex justify-between mt-3">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[var(--primary-color)] text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
