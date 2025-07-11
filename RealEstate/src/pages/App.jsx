import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";

import About from "./About";
import Profile from "./Profile";
import Header from "../Components/Header";
//import PrivateRoute from "../Components/PrivateRoute";
import Createlisting from "./Createlisting";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/About" element={<About />} />
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/Profile" element={<Profile />} />
          <Route path="/create-listing" element={<Createlisting />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}