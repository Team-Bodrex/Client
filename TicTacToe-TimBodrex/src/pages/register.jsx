import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const submitRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      Swal.fire("Error", "Username, email, and password are required", "error");
      return;
    }
    try {
      let { data } = await axios({
        url: import.meta.env.VITE_API_BASE_URL + "/register",
        method: "POST",
        data: {
          username: username,
          email: email,
          password: password,
        },
      });
      Swal.fire("Success", "User registered successfully", "success");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.message) {
        Swal.fire("Error", error.response.data.message[0], "error");
      } else {
        Swal.fire("Error", "An error occurred while registering", "error");
      }
      console.log(error.response);
    }
  };
  return (
    <>
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://w0.peakpx.com/wallpaper/128/237/HD-wallpaper-tic-tac-toe-game-blue-background-ultra-games-other-games-color-game-design-blue-tictactoe-chalkboard-chalk-diagonal-row-winner-solved-grid-xsandos-noughtsandcrosses-blackboard.jpg')",
        }}
      >
        <div className="flex justify-center items-center min-h-screen ">
          <div className="bg-gradient-to-r from-gray-700 to-blue-400 dark:from-zinc-800 dark:to-zinc-600 p-4 rounded-lg shadow-md p-8 rounded-lg w-full max-w-md bg-opacity-50">
            <h2 className="text-2xl font-bold text-center text-white dark:text-zinc-300 mb-4">
              Register
            </h2>
            <form className="space-y-4" onSubmit={submitRegister}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white dark:text-zinc-300 mx-2 my-1"
                >
                  Username
                </label>
                <input
                  type="username"
                  id="username"
                  name="username"
                  className="w-full px-3 py-2 border dark:border-zinc-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white dark:text-zinc-300 mx-2 my-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border dark:border-zinc-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white dark:text-zinc-300 mx-2 my-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border dark:border-zinc-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-lg"
                style={{ margin: "5% 0", marginTop: "7%" }}
              >
                Register
              </button>
              <div className="text-center text-sm mt-4">
                <p style={{ color: "white" }}>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-300">
                    Sign In Instead?
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
