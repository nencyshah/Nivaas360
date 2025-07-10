import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !user?._id) {
      alert("Please select an image and make sure you are logged in.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/user/upload-avatar', {
        method: 'POST',
        body: JSON.stringify({
          userId: user._id,
          avatar: file,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-white">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6">Profile</h1>

        <form className="flex flex-col items-center space-y-5" onSubmit={handleUpload}>
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
          <img
            onClick={() => fileRef.current.click()}
            src={preview || user?.avatar || "https://via.placeholder.com/150"}
            className="rounded-full h-28 w-28 object-cover border-4 border-indigo-400 shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
            alt="profile"
          />

          <input
            type="text"
            placeholder="username"
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:border-indigo-500"
            value={user?.username || ''}
            readOnly
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:border-indigo-500"
            value={user?.email || ''}
            readOnly
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full p-3 rounded-xl border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:border-indigo-500"
            value={user?.phone || ''}
            readOnly
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-semibold hover:from-pink-700 hover:to-indigo-700"
            disabled={loading}
          >
            {loading ? 'UPDATING...' : 'UPDATE'}
          </button>

          <Link to="/create-listing" className="w-full">
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700"
            >
              Create Listing
            </button>
          </Link>
        </form>

        <div className="flex justify-between items-center mt-6 text-sm">
          <span className="text-red-500 cursor-pointer hover:underline">Delete account</span>
          <span className="text-red-500 cursor-pointer hover:underline">Sign out</span>
        </div>
      </div>
    </div>
  );
}
