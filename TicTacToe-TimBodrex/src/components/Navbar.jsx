import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="bg-gradient-to-r from-gray-700 to-blue-400 p-4 flex flex-col sm:flex-row justify-between items-center">
      <Link to="/" className="text-white font-bold text-xl mb-4 sm:mb-0">
        HOME
      </Link>
      <Link to="#" className="text-white font-bold text-xl mb-4 sm:mb-0">
        TIC TAC TOE X/O
      </Link>
      <div className="flex space-x-4">
        <button onClick={handleLogout} className="text-white bg-gray-700 px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
