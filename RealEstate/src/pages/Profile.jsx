import { useSelector } from "react-redux";
import { useRef, useState } from "react";

export default function Profile() {
  const fileRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Show preview when file is selected
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  // Upload avatar to backend
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !user?._id) {
      alert("Please select an image and make sure you are logged in.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', user._id);
    try {
      const res = await fetch('/api/user/upload-avatar', {
        method: 'POST',
        body: JSON.stringify({
          userId: user._id,
          avatar: file, // base64 string
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      alert(data.message);
      // Optionally, refresh user info here
    } catch (err) {
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
    console.log('Avatar:', user?.avatar);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-6 mt-10">
      <h1 className="text-4xl font-bold  text-center mb-4">Profile</h1>
      <form className="w-full flex flex-col items-center space-y-5" onSubmit={handleUpload}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={ user?.avatar || "https://via.placeholder.com/150"}
          className="rounded-full h-28 w-28 object-cover border-4 border-indigo-300 shadow-md hover:scale-105 transition-transform duration-300 mb-2 cursor-pointer"
          alt="profile"
        />
        <div className="w-full flex flex-col space-y-4">
          <input
            type="text"
            placeholder="username"
            className="border-2 border-indigo-200 focus:border-indigo-500 p-3 rounded-lg transition-colors duration-200 shadow-sm w-full"
            value={user?.username || ''}
            readOnly
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-indigo-200 focus:border-indigo-500 p-3 rounded-lg transition-colors duration-200 shadow-sm w-full"
            value={user?.email || ''}
            readOnly
          />
          <input
            type="text"
            placeholder="Phone"
            className="border-2 border-indigo-200 focus:border-indigo-500 p-3 rounded-lg transition-colors duration-200 shadow-sm w-full"
            value={user?.phone || ''}
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200"
          disabled={loading}
        >
          {loading ? 'UPDATING...' : 'UPDATE'}
        </button>
      </form>
      <div className="flex justify-between w-full ">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
