import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // Correct import
import { useSelector } from "react-redux";
export default function Header() {
  const { user } = useSelector((state) => state.user);
  return (
    <header className="bg-gray-100 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-gray-700">Nivaas</span>
            <span className="text-gray-500">360</span>
          </h1>
        </Link>
        <form className="bg-gray-50 p-3 rounded-md shadow-md flex items-center">
          <input type="search" id="searchBox" placeholder="Search..." />
          <FaSearch className="text-gray-500" />
        </form>
        <ul className="gap-4 flex items-center text-gray-700 font-semibold text-xs sm:text-sm">
          <Link to="/">
            {" "}
            <li className="hidden sm:inline hover:text-gray-900">Home</li>{" "}
          </Link>
          <Link to="/About">
            <li className="hidden sm:inline hover:text-gray-900">About</li>{" "}
          </Link>

          <Link to="/profile">
            {user ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={user .avatar ? user.avatar : "/src/assets/profile.png"}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/src/assets/profile.png";
                }}
              />
            ) : (
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
      
    </header>
  );
}
