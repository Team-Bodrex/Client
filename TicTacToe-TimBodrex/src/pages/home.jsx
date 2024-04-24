import React, { createContext, useEffect, useState } from "react";
import socket from "../socket/socket";
import Sidebar from "../components/SideBar";
import ChatBox from "../components/ChatBox";

export const UserContext = createContext({
  name: localStorage.getItem("username"),
});

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
      <Sidebar />
      <ChatBox messages={messages} newMessage={newMessage} handleNewMessage={handleNewMessage} handleSendMessage={handleSendMessage} />
    </div>
  );
}
