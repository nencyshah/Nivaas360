import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../Components/OAuth";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response data:", data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data.user));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-sm p-6 sm:p-8 rounded-3xl shadow-2xl bg-gray-950 border border-gray-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-6 sm:mb-8">Sign In</h1>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
        <input
  type="email"
  placeholder="Email"
  className="w-full p-3 rounded-xl border border-gray-600 bg-gray-200 text-gray-900 placeholder-gray-500 focus:border-indigo-500 text-sm sm:text-base"
  id="email"
  onChange={handleChange}
  required
/>

<input
  type="password"
  placeholder="Password"
  className="w-full p-3 rounded-xl border border-gray-600 bg-gray-200 text-gray-900 placeholder-gray-500 focus:border-indigo-500 text-sm sm:text-base"
  id="password"
  onChange={handleChange}
  required
/>


          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-base sm:text-lg hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          <OAuth />
        </form>

        <div className="flex flex-col sm:flex-row gap-2 mt-4 text-sm sm:text-base justify-center items-center">
          <p className="text-gray-400">Don't have an account?</p>
          <Link to="/Signup" className="text-indigo-400 hover:underline">
            <span>Sign Up</span>
          </Link>
        </div>

        {error && (
          <div className="text-red-500 mt-4 text-center text-sm sm:text-base">
            <p>Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
