import React, { useEffect, useState } from "react";
import { UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function DNav() {
  const { user, logout } = useAuth();
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserName(parsedUser.fullname || 'User');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-dark px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand */}
        <div className="text-white">
          <h1 className="text-2xl font-bold">NextTask</h1>
          <p className="text-sm text-gray-300">
            Professional Task Management
          </p>
        </div>

        {/* Right: User Profile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-white">
            <UserCircle className="w-10 h-10 text-gray-300" />
            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome back</p>
              <p className="font-normal">{userName}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default DNav;