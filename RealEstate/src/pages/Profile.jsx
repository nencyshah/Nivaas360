// import { useSelector } from "react-redux";
// import { useRef, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Profile() {
//   const fileRef = useRef(null);
//   const { user } = useSelector((state) => state.user);
//   const [file, setFile] = useState(undefined);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     if (selectedFile) {
//       setPreview(URL.createObjectURL(selectedFile));
//     } else {
//       setPreview(null);
//     }
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file || !user?._id) {
//       alert("Please select an image and make sure you are logged in.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await fetch('/api/user/upload-avatar', {
//         method: 'POST',
//         body: JSON.stringify({
//           userId: user._id,
//           avatar: file,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await res.json();
//       alert(data.message);
//     } catch (err) {
//       alert('Upload failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
//       <div className="bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-white">
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6">Profile</h1>

//         <form className="flex flex-col items-center space-y-5" onSubmit={handleUpload}>
//           <input
//             type="file"
//             ref={fileRef}
//             hidden
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//           <img
//             onClick={() => fileRef.current.click()}
//             src={preview || user?.avatar || "https://via.placeholder.com/150"}
//             className="rounded-full h-28 w-28 object-cover border-4 border-indigo-400 shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
//             alt="profile"
//           />

//           <input
//             type="text"
//             placeholder="username"
//             className="w-full p-3 rounded-xl border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:border-indigo-500"
//             value={user?.username || ''}
//             readOnly
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 rounded-xl border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:border-indigo-500"
//             value={user?.email || ''}
//             readOnly
//           />
//           <input
//             type="text"
//             placeholder="Phone"
//             className="w-full p-3 rounded-xl border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:border-indigo-500"
//             value={user?.phone || ''}
//             readOnly
//           />

//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-semibold hover:from-pink-700 hover:to-indigo-700"
//             disabled={loading}
//           >
//             {loading ? 'UPDATING...' : 'UPDATE'}
//           </button>

//           <Link to="/create-listing" className="w-full">
//             <button
//               type="button"
//               className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700"
//             >
//               Create Listing
//             </button>
//           </Link>
//         </form>

//         <div className="flex justify-between items-center mt-6 text-sm">
//           <span className="text-red-500 cursor-pointer hover:underline">Delete account</span>
//           <span className="text-red-500 cursor-pointer hover:underline">Sign out</span>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect, useCallback } from "react";
import { signInSuccess } from "../redux/user/userSlice";
// import { useNavigate } from "react-router-dom";
// import { signOut } from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
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
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
