import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  
      return;
    }
    try {
      
    } catch (error) {
      
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
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-gradient-to-r from-gray-700 to-blue-400 dark:from-zinc-800 dark:to-zinc-600 p-4 rounded-lg shadow-md p-8 rounded-lg w-full max-w-md bg-opacity-50">
            <h2 className="text-2xl font-bold text-center text-white dark:text-zinc-300 mb-4">
              Register
            </h2>
            <form className="space-y-4" onSubmit={submitRegister}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white dark:text-zinc-300"
                >
                  Username
                </label>
                <input
                  type=""
                  id=""
                  name=""
                  className="w-full px-3 py-2 border dark:border-zinc-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your username"
                  value=""
                  onChange=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white dark:text-zinc-300"
                >
                  Email
                </label>
                <input
                  type=""
                  id=""
                  name=""
                  className="w-full px-3 py-2 border dark:border-zinc-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Enter your email"
                  value=""
                  onChange=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white dark:text-zinc-300"
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
              >
                Register
              </button>
              <div className="text-center text-sm mt-4">
                <Link to="/login" className="text-blue-400">
                  Sign In?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
