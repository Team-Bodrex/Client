import React, { useContext } from "react";
import { FiUser, FiUserCheck } from "react-icons/fi";
import { UserContext } from "../pages/home";

const Sidebar = () => {
  const users = useContext(UserContext);
  return (
    <div className="w-1/4 bg-blue-100 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Online Users:</h2>
      {users.map((user) => (
        <p key={user.username} className="mb-1 flex items-center">
          {user.isOnline ? <FiUserCheck className="text-green-600 mr-1" /> : <span className="h-4 w-4 rounded-full bg-green-500 mr-1"></span>}
          <b>{user.username}</b>
        </p>
      ))}
    </div>
  );
};

export default Sidebar;
