import { useEffect, useState } from "react";
import socket from "../socket/socket";
import { FiUser, FiUserCheck } from "react-icons/fi";



export default function Home() {
  const [users, setUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  function handleSendMessage(event) {
    event.preventDefault();

    socket.emit("messages:new", {
      from: localStorage.username,
      message: newMessage,
    });

    setNewMessage("");
  }

  useEffect(() => {
    socket.auth = {
      username: localStorage.username,
    };
    socket.disconnect().connect();
  }, []);

  useEffect(() => {
    socket.on("users:online", (onlineUsers) => {
      setUsers(onlineUsers);
    });

    socket.on("messages:info", (message) => {
      setMessages((prevMessages) => {
        return [...prevMessages, message];
      });
    });

    return () => {
      socket.off("users:online");
      socket.off("messages:info");
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-blue-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Online Users:</h2>
        {users.map((user) => (
          <p key={user.username} className="mb-1 flex items-center">
            {user.isOnline ? (
              <FiUserCheck className="text-green-600 mr-1" />
            ) : (
              <span className="h-4 w-4 rounded-full bg-green-500 mr-1"></span>
            )}
            <b>{user.username}</b>
          </p>
        ))}
      </div>
      <div className="w-3/4 p-4 bg-gray-100">
        <h1 className="text-2xl mb-4">Temporary Chat Home</h1>
        <a href="/game" className="inline-flex items-center bg-gradient-to-r from-gray-700 to-blue-400 text-white px-4 py-2 rounded-md shadow-md hover:from-gray-800 hover:to-blue-500 transition-colors duration-300">
          <img src="https://cdn-icons-png.flaticon.com/512/566/566294.png" alt="Tic Tac Toe" className="h-6 w-6 mr-2" />
          <span>Play Game</span>
        </a>
        <h2 className="text-lg font-semibold">Chat Box:</h2>
        {messages.map((msg, index) => (
          <div key={index} className="flex items-center mb-2">
            {msg.from === localStorage.username ? (
              <FiUserCheck className="text-green-600 mr-2" />
            ) : (
              <FiUser className="text-red-600 mr-2" />
            )}
            <p className={msg.from === localStorage.username ? 'text-blue-700' : 'text-gray-700'}>
              {msg.from === localStorage.username ? 'You: ' : `${msg.from}: `}
              {msg.message}
            </p>
          </div>
        ))}
        <form onSubmit={handleSendMessage} className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Input message..."
            onChange={handleNewMessage}
            value={newMessage}
            className="border border-gray-300 px-3 py-2 rounded mr-2 flex-grow"
          />
          <button type="submit" className="bg-gradient-to-r from-gray-700 to-blue-400 hover:from-gray-800 hover:to-blue-500 text-white px-4 py-2 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z"></path>
              <path d="M8 6l2 2 4-4"></path>
            </svg>
            Send Chat
          </button>
        </form>
      </div>
    </div>
  );
}
