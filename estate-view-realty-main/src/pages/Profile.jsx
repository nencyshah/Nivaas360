
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect, useCallback } from "react";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signInFailure, signInSuccess, signOutUserStart, signOutUserSuccess, signOutUserFailure } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // Sign out handler removed

  const handleFileUpload = useCallback(
    (file) => {
      setUploading(true);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        try {
          const base64Image = reader.result;
          const res = await fetch(`/api/user/upload/${user._id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ avatar: base64Image }),
          });

          const data = await res.json();
          if (data.success === false) {
            console.error(data.message);
          } else {
            dispatch(signInSuccess(data));
          }
        } catch (err) {
          console.error("Error uploading image:", err);
        } finally {
          setUploading(false);
        }
      };

      reader.onerror = () => {
        console.error("Error reading file");
        setUploading(false);
      };
    },
    [user._id, dispatch]
  );

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file, handleFileUpload]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError(null);
    setUpdateSuccess(false);
    try {
      const res = await fetch(`/api/user/update/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setUpdateError(data.message);
      } else {
        dispatch(signInSuccess(data));
        setUpdateSuccess(true);
      }
    } catch (err) {
      setUpdateError("Update failed. Please try again.", err);
    } finally {
      setUpdateLoading(false);
    }
  };
    const handleDeleteUser = async () => {
    // Add confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${user._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ← ADD THIS - Critical fix!
      });

      const data = await res.json();
      console.log("Delete response:", data); // Debug log

      if (res.ok) {
        dispatch(deleteUserSuccess());

        // Clear cookies
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Navigate to signup page after successful deletion
        navigate("/signup");

        // Show success message
        alert("Account deleted successfully!");
      } else {
        dispatch(deleteUserFailure(data.message || "Failed to delete account"));
      }
    } catch (error) {
      console.error("Delete error:", error); // Debug log
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
  try {
    dispatch(signOutUserStart());
    
    const res = await fetch("/api/auth/signout", { 
      method: "POST", 
      credentials: "include",
    });
    
    // Check if response is ok first
    if (!res.ok) {
      const errorData = await res.json();
      dispatch(signOutUserFailure(errorData.message || "Sign out failed"));
      return;
    }
    
    const data = await res.json();
    console.log('Signout response:', data); // Debug log
    
    // Clear cookie on frontend (with proper options)
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; httpOnly=false; secure=false;";
    
    dispatch(signOutUserSuccess());
    navigate("/signin");
    
  } catch (error) {
    console.error('Signout error:', error); // Debug log
    dispatch(signOutUserFailure(error.message));
  }
};
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-6 mt-10">
      <h1 className="text-4xl font-bold  text-center mb-4">Profile</h1>
      <form
        className="w-full flex flex-col items-center space-y-5"
        onSubmit={handleSubmit}
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <div className="relative">
          <img
            onClick={() => fileRef.current.click()}
            src={user?.avatar || "https://via.placeholder.com/150"}
            className="rounded-full h-28 w-28 object-cover border-4 border-indigo-300 shadow-md hover:scale-105 transition-transform duration-300 mb-2 cursor-pointer"
            alt="profile"
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <p className="text-white font-medium">Uploading...</p>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border-2 border-indigo-200 focus:border-indigo-500 p-3 rounded-lg transition-colors duration-200 shadow-sm w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-indigo-200 focus:border-indigo-500 p-3 rounded-lg transition-colors duration-200 shadow-sm w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border-2 border-indigo-200 focus:border-indigo-500 p-3 rounded-lg transition-colors duration-200 shadow-sm w-full"
          />
        </div>
        {updateError && (
          <p className="text-red-500 text-sm mt-2">{updateError}</p>
        )}
        {updateSuccess && (
          <p className="text-green-500 text-sm mt-2">Profile updated!</p>
        )}
        <button
          type="submit"
          disabled={updateLoading}
          className="w-full mt-4 px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-60"
        >
          {updateLoading ? "Updating..." : "UPDATE"}
        </button>
      </form>
      <div className="flex justify-between w-full ">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
