import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

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
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        showNotification(data.message || "Sign in failed!", "error");
        return;
      }
      dispatch(signInSuccess(data));
      showNotification("Sign in successful!", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      dispatch(signInFailure(error.message));
      showNotification("An error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF] p-4">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <p>{notification.message}</p>
        </div>
      )}

      <div className="w-full max-w-sm p-6 sm:p-8 rounded-3xl shadow-2xl bg-[#FFFFFF] border border-[#E9EEF7]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0E1A] text-center mb-6 sm:mb-8">
          Sign In
        </h1>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-[#E9EEF7] bg-[#FFFFFF] text-[#0A0E1A] placeholder-[#6E7687] focus:border-[#00B6FF] text-sm sm:text-base"
            id="email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border border-[#E9EEF7] bg-[#FFFFFF] text-[#0A0E1A] placeholder-[#6E7687] focus:border-[#00B6FF] text-sm sm:text-base"
            id="password"
            onChange={handleChange}
            required
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 rounded-xl bg-[#00B6FF] text-[#FAFAFA] font-semibold text-base sm:text-lg hover:bg-[#179B4A] transition-colors duration-300"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          <OAuth />
        </form>

        <div className="flex flex-col sm:flex-row gap-2 mt-4 text-sm sm:text-base justify-center items-center">
          <p className="text-[#6E7687]">Don't have an account?</p>
          <Link
            to="/Signup"
            className="text-[#00B6FF] hover:text-[#179B4A] hover:underline"
          >
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
