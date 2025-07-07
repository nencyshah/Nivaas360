import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // Correct import
import { useSelector } from "react-redux";
export default function Header() {
  const {currentUser} = useSelector((state) => state.user);
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
          <Link to="/Signup">
            <li className="hidden sm:inline hover:text-gray-900">Signup</li>{" "}
          </Link>
          <Link to="/profile">
            <li className="hidden sm:inline hover:text-gray-900">profile</li>{" "}
          </Link>

           <Link to='/Profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='Profile'/>
            ) : currentUser === null ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740'
                alt='Profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
      
    </header>
    
  );
}

