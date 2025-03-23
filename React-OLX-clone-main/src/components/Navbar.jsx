import React, { useState } from "react";
import olxLogo from "../assets/olx-logo.png";
import lens from "../assets/lens.png";
import arrow from "../assets/arrow.png";
import { Menu, X } from "lucide-react";
import Login from "./Login";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSellClick = () => {
        if (!user) {
            toast.error('Please login to sell a product');
        } else {
            navigate('/addproduct');
        }
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <>
            {/* Login Component - Centered Only in Mobile */}
            {openLogin && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 sm:static sm:bg-transparent">
                    <Login setOpenLogin={setOpenLogin} />
                </div>
            )}

            <nav className="flex items-center justify-between p-4 bg-[#EFF1F3] border-b border-gray-200 relative">
                {/* Logo */}
                <div className="flex items-center">
                    <img onClick={handleLogoClick} src={olxLogo} alt="OLX Logo" className="w-10 h-auto" />
                </div>

                {/* Search Bar */}
                <div className="flex-grow flex items-center border border-gray-300 rounded-md mx-3 sm:mx-5">
                    <input
                        type="text"
                        placeholder="Search 'Properties'"
                        className="w-full px-3 py-2 text-sm text-gray-700 focus:outline-none rounded-md"
                    />
                    <img src={lens} alt="Search" className="w-5 h-5 mx-2" />
                </div>

                {/* Desktop & Tablet Items */}
                <div className="hidden sm:flex items-center space-x-4">
                    {/* Location Dropdown */}
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 hidden md:flex">
                        <span className="text-gray-700 text-sm font-medium">India</span>
                        <img src={arrow} alt="Arrow" className="w-4 h-4 ml-1" />
                    </div>

                    {/* Authentication Section */}
                    {user ? (
                        <>
                            <h1 className="text-sm font-semibold text-gray-800">
                                {user?.displayName || "User"}
                            </h1>
                            <button
                                onClick={logout}
                                className="text-sm font-medium text-teal-600 hover:text-teal-800 underline hover:no-underline transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <h1
                            className="text-sm font-medium text-teal-600 hover:text-teal-800 underline hover:no-underline cursor-pointer transition-colors duration-200"
                            onClick={() => setOpenLogin(true)}
                        >
                            Login
                        </h1>

                    )}

                    {/* Sell Button */}
                    <button className="hidden lg:flex items-center bg-blue-200 text-blue-900 font-bold text-sm px-3 py-2 rounded-full border-2 border-cyan-400 hover:bg-yellow-500">
                        <span className="mr-1 text-lg">+</span>
                        <span onClick={handleSellClick}>SELL</span>
                    </button>
                </div>

                {/* Mobile: Menu Toggle Button */}
                <button
                    className="block sm:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <X className="w-6 h-6 text-gray-700" />
                    ) : (
                        <Menu className="w-6 h-6 text-gray-700" />
                    )}
                </button>

                {/* Mobile Menu Content */}
                {menuOpen && (
                    <div className="absolute top-16 right-4 bg-white shadow-lg rounded-md p-4 w-40 flex flex-col items-center space-y-3 sm:hidden z-50">
                        {user ? (
                            <>
                                <h1 className="text-sm font-semibold text-gray-800">
                                    {user?.displayName || "User"}
                                </h1>
                                <button
                                    onClick={logout}
                                    className="text-sm font-medium text-teal-600 hover:text-teal-800 underline hover:no-underline transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <h1
                                className="text-sm font-medium text-teal-600 hover:text-teal-800 underline hover:no-underline cursor-pointer transition-colors duration-200"
                                onClick={() => setOpenLogin(true)}
                            >
                                Login with Google
                            </h1>
                        )}

                        <button className="bg-blue-200 text-blue-900 font-bold text-sm px-3 py-2 rounded-full border-2 border-cyan-400 hover:bg-yellow-500">
                            <span className="mr-1 text-lg">+</span>
                            <span onClick={handleSellClick}>SELL</span>
                        </button>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
