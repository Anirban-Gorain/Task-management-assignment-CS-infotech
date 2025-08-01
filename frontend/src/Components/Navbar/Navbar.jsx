import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../state/features/auth.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ role = "admin", isLoggedIn }) => {
  const dispatcher = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    dispatcher(logoutUser());
    navigate("/");
  };

  return (
    <nav className="bg-blue-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo or App Name */}
      <Link to={`${user?.role === "admin" ? "/admin" : "/agent/tasks"}`}>
        <div className="text-xl font-bold">Task Manager</div>
      </Link>

      {/* Links */}
      <div className="flex space-x-6">
        {role === "admin" && isLoggedIn && (
          <>
            <Link to="admin/create-agent" className="hover:text-gray-300">
              Create Agent
            </Link>
            <Link to="admin/upload-tasks" className="hover:text-gray-300">
              Upload Tasks
            </Link>
          </>
        )}

        {/* Profile & Logout */}
        {isLoggedIn && (
          <div className="relative group">
            <FaUserCircle className="text-2xl cursor-pointer" />

            <div className="absolute right-0 mt w-32 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 z-50">
              <button
                onClick={onLogout}
                className="block px-4 py-2 text-sm  w-full text-left"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
