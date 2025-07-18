import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response data:", data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      if (res.ok) {
        alert("Signup successful!");
        console.log("Success:", data);
      } else {
        alert(`Signup failed: ${data.message || "Unknown error"}`);
        console.error("Error:", data);
      }
      navigate("/signin");
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF] p-4">
      <div className="w-full max-w-sm p-6 sm:p-8 rounded-3xl shadow-2xl bg-[#FFFFFF] border border-[#E9EEF7]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0E1A] text-center mb-6 sm:mb-8">Sign up</h1>
  
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
          <Link to="/Signin" className="text-[#00B6FF] hover:text-[#179B4A] hover:underline">
            <span>Sign In</span>
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
