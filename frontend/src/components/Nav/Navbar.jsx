import React, { useState } from "react";
import { Link } from 'react-router-dom';
// import Logo from '../../assets/Logo.png';
import '../Nav/Navbar.css';

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
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
                    {/* <img className="h-10 inline logo-wrapper" src={Logo} alt="LOGO"></img> */}
                    QUIZZ PRO
                </span>
                <span className="text-3xl cursor-pointer mx-2 md:hidden block" onClick={toggleNav}>
                    <ion-icon name="menu"></ion-icon>
                </span>
            </div>
            <ul
                className={`md:flex md:items-center z-[1] md:z-[1] md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 transition-all ease-in duration-500 ${
                    isNavOpen ? "opacity-100 top-[80px]" : "opacity-0 top-[-400px]"
                }`}
            >
                <li className="mx-4 my-6 md:my-0 bot cursor-pointer" onClick={closeNav}>
                    <Link to="/" className="block w-full h-full">Home</Link>
                </li>
                <li className="mx-4 my-6 md:my-0 bot cursor-pointer" onClick={closeNav}>
                    <Link to="/about" className="block w-full h-full">About Us</Link>
                </li>
                <li className="mx-4 my-6 md:my-0 bot cursor-pointer" onClick={closeNav}>
                    <Link to="/quizzes/join-quizz" className="block w-full h-full">Join-Quizz</Link>
                </li>
                <li className="mx-4 my-6 md:my-0 bot cursor-pointer" onClick={closeNav}>
                    <Link to="/quizzes/login" className="block w-full h-full">Create Quiz</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;