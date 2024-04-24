import React, { useRef, useEffect } from "react";
import { FiUser, FiUserCheck } from "react-icons/fi";

const ChatBox = ({
  messages,
  newMessage,
  handleNewMessage,
  handleSendMessage,
}) => {
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-3/4 p-4 bg-gray-100">
      <h1 className="text-2xl mb-4">Welcome to Global Chat</h1>
      <p style={{ marginBottom: "1%" }}>Choose a game to start playing</p>
      <a
        href="/game"
        className="inline-flex items-center bg-gradient-to-r from-gray-700 to-blue-400 text-white px-4 py-2 rounded-md shadow-md hover:from-gray-800 hover:to-blue-500 transition-colors duration-300"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/566/566294.png"
          alt="Tic Tac Toe"
          className="h-6 w-6 mr-2"
        />
        <span>Play TicTacToe</span>
      </a>
      <div
        className="chat-container"
        ref={chatContainerRef}
        style={{ maxHeight: "400px", overflowY: "scroll" }}
      >
        <h2
          className="text-lg font-semibold"
          style={{ margin: "5% 0", marginBottom: "2%" }}
        >
          Chat Box:
        </h2>
        {messages.map((msg, index) => (
          <div key={index} className="flex items-center mb-2">
            {msg.from === localStorage.username ? (
              <FiUserCheck className="text-green-600 mr-2" />
            ) : (
              <FiUser className="text-red-600 mr-2" />
            )}
            <p
              className={
                msg.from === localStorage.username
                  ? "text-blue-700"
                  : "text-gray-700"
              }
            >
              {msg.from === localStorage.username ? "You: " : `${msg.from}: `}
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Input message..."
          onChange={handleNewMessage}
          value={newMessage}
          className="border border-gray-300 px-3 py-2 rounded mr-2 flex-grow"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-gray-700 to-blue-400 hover:from-gray-800 hover:to-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z"></path>
            <path d="M8 6l2 2 4-4"></path>
          </svg>
          Send Chat
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
