import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-6 mt-10">
      <h1 className="text-4xl font-bold  text-center mb-4">Profile</h1>
      <form className="w-full flex flex-col items-center space-y-5">
        <img
          src={user.avatar }
          className="rounded-full h-28 w-28 object-cover border-4 border-indigo-300 shadow-md hover:scale-105 transition-transform duration-300 mb-2"
          alt="profile"
        />
        <div className="w-full flex flex-col space-y-4">
          <input
            type="text"
           placeholder="Username"
            className="border-2 border-indigo-200 focus:border-indigo-500 p-3 rounded-lg transition-colors duration-200 shadow-sm w-full"
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-indigo-200 focus:border-indigo-500 p-3 rounded-lg transition-colors duration-200 shadow-sm w-full"
          />
          <input
            type="text"
            placeholder="Phone"
            className="border-2 border-indigo-200 focus:border-indigo-500 p-3 rounded-lg transition-colors duration-200 shadow-sm w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 px-5 py-3  bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200"
        >
          UPDATE
        </button>
        
      </form>
      <div className="flex justify-between w-full ">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
