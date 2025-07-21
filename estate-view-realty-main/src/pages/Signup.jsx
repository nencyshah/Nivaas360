import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({ role: "buyer" });
  const [setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  // Handle notifications
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name || e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      formData.role === "seller"
        ? "/api/auth/signup/seller"
        : "/api/auth/signup/buyer";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data = {};
      const text = await res.text();
      if (text) {
        data = JSON.parse(text);
      }

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        if (
          data.message &&
          (data.message.toLowerCase().includes("email") ||
            data.message.toLowerCase().includes("duplicate"))
        ) {
          showNotification("User already exists with this email!", "error");
        } else {
          showNotification(data.message || "Signup failed!", "error");
        }
        return;
      }

      setLoading(false);
      if (res.ok) {
        showNotification("Signup successful!", "success");
        setTimeout(() => navigate("/signin"), 1500);
      } else {
        showNotification(data.message || "Signup failed!", "error");
        setLoading(false);
      }
    } catch (error) {
      showNotification("An error occurred. Please try again.", "error");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Custom notification */}
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

      <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF] p-4">
        <div className="w-full max-w-sm p-6 sm:p-8 rounded-3xl shadow-2xl bg-[#FFFFFF] border border-[#E9EEF7]">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0E1A] text-center mb-6 sm:mb-8">
            Sign up
          </h1>

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-xl border border-[#E9EEF7] bg-[#FFFFFF] text-[#0A0E1A] placeholder-[#6E7687] focus:border-[#00B6FF] text-sm sm:text-base"
              id="username"
              onChange={handleChange}
              required
            />

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

            {/* Role selection */}
            <div className="flex gap-4 items-center">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={formData.role === "buyer"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Buyer
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  checked={formData.role === "seller"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Seller
              </label>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-xl bg-[#00B6FF] text-[#FAFAFA] font-semibold text-base sm:text-lg hover:bg-[#179B4A] transition-colors duration-300"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <div className="flex flex-col sm:flex-row gap-2 mt-4 text-sm sm:text-base justify-center items-center">
            <p className="text-[#6E7687]">Already have an account?</p>
            <Link
              to="/Signin"
              className="text-[#00B6FF] hover:text-[#179B4A] hover:underline"
            >
              <span>Sign In</span>
            </Link>
          </div>

          
        </div>
      </div>
    </>
  );
}
