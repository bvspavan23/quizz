import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Logo from "../../assets/Logo.png";
import "../Nav/Navbar.css";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slice/authSlice";

const PrivateNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Get admin data from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const adminId = userInfo?.id;

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
    navigate("/quizzes/login");
    closeNav();
  };
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between z-50">
      <div className="flex justify-between items-center">
        <span className="anonymous-pro-bold text-2xl cursor-pointer pavan-papi">
          <span className="bg-clip-text text-transparent bg-black cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
              Q
            </span>
                    <span className="bg-clip-text text-transparent bg-black cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
              U
            </span>
                    <span className="bg-clip-text text-transparent bg-black cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
              I
            </span>
                    <span className="bg-clip-text text-transparent bg-black cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
              Z
            </span>
                    <span className="bg-clip-text text-transparent bg-black cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
              Z
            </span>
            <span className="bg-clip-text text-transparent bg-black cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
              -
            </span>
                    <span className="bg-clip-text text-transparent bg-black cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
                P
            </span>
                    <span className="bg-clip-text text-transparent bg-black cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
              R
            </span>
                    <span className="bg-clip-text text-transparent bg-black cursor-pointer inline-block scale-100 transition-transform duration-300 ease-in-out hover:scale-150">
              O            
        </span>
        </span>
        <span
          className="text-3xl cursor-pointer mx-2 md:hidden block"
          onClick={toggleNav}
        >
          <ion-icon name="menu"></ion-icon>
        </span>
      </div>
      <ul
        className={`md:flex md:items-center z-[1] md:z-[1] md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 transition-all ease-in duration-500 ${
          isNavOpen ? "opacity-100 top-[80px]" : "opacity-0 top-[-400px]"
        }`}
      >
        <li className="mx-4 my-6 md:my-0 bot cursor-pointer" onClick={closeNav}>
          <Link to="/create-quizz" onClick={closeNav}>
            Create Quiz
          </Link>
        </li>
        <li className="mx-4 my-6 md:my-0 bot cursor-pointer" onClick={closeNav}>
          <Link to={`/admin/${adminId}/quizzes`} onClick={closeNav}>
            Manage Quizzes
          </Link>
        </li>
        <li className="mx-4 my-6 md:my-0 bot cursor-pointer">
          <button
            onClick={handleLogout}
            className="bg-transparent border-none cursor-pointer"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PrivateNav;
