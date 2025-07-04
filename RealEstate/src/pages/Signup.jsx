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
      if (data.success=== false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      if (res.ok) {
        // Check if the HTTP status is successful (200-299)
        alert("Signup successful!");
        console.log("Success:", data);
      } else {
        alert(`Signup failed: ${data.message || "Unknown error"}`);
        console.error("Error:", data);
      }
      navigate("/Signin");
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form
        className="flex flex-col gap-4 w-96 mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="Username"
          onChange={handleChange}
          required // Ensures the field is filled
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          required
        />
        <button disabled={loading}
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          {loading ? "Loading..." : "Sign Up"}
    
        </button>
      </form>
      <div className="flex gap-2 mt-4">
        <p className="text-center text-gray-500">Already have an account?</p>
        <Link to="/Signin" className="text-blue-500 hover:underline">
          <span>Sign In</span>
        </Link>
      </div>
      {error && (
        <div className="text-red-500 mt-4">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
}
