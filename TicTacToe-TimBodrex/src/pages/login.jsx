import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  // Untuk Login GITHUB
  function getGithub() {
    if (codeParam && localStorage.getItem("token") == null) {
      async function getAccessToken() {
        try {
          const { data } = await axios({
            method: "get",
            url:
              import.meta.env.VITE_API_BASE_URL +
              "/github-login?code=" +
              codeParam,
          });
          // console.log(data, "<<<<<client");
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.email = data.email;
            localStorage.username = data.username;
          }
          navigate("/");
        } catch (error) {
          console.log(error);
          const errMsg = error.response.data.message;
          Swal.fire({
            title: "Error!",
            text: errMsg,
            icon: "error",
          });
        }
      }
      getAccessToken();
    }
  }

  useEffect(() => {
    getGithub();
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire("Error", "Email and password are required", "error");
      return;
    }
    try {
      let { data } = await axios({
        url: import.meta.env.VITE_API_BASE_URL + "/login",
        method: "POST",
        data: {
          email: email,
          password: password,
        },
      });
      localStorage.setItem("token", data.token);
      localStorage.email = data.email;
      localStorage.username = data.username;

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire("Error", "Invalid email or password", "error");
      } else if (error.response && error.response.status === 403) {
        Swal.fire(
          "Error",
          "Account not found. You need to create an account first!",
          "error"
        );
      } else {
        Swal.fire("Error", "An error occurred while logging in", "error");
      }
      console.log(error.response);
    }
  };
  async function handleGithubLogin() {
    try {
      window.location.assign(
        `https://github.com/login/oauth/authorize?client_id=${
          import.meta.env.VITE_CLIENT_ID_GITHUB
        }`
      );
      // console.log(data.access_token);
    } catch (error) {
      console.log(error);
      const errMsg = error.response.data.message;
      Swal.fire({
        title: "Error!",
        text: errMsg,
        icon: "error",
      });
    }
  }
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
              Login
            </h2>
            <form className="space-y-4" onSubmit={submitLogin}>
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
                style={{ margin: "5% 0", marginTop: "6%" }}
              >
                Login
              </button>
              <div className="text-center text-sm mt-4">
                <p style={{ color: "white" }}>
                  No account yet?{" "}
                  <Link to="/register" className="text-blue-300">
                    Sign Up Here!
                  </Link>
                </p>
              </div>
            </form>
            <div className="mt-4">
              <p className="text-center text-sm text-white dark:text-zinc-400">
                Or login with
              </p>
              <div className="flex justify-center space-x-4 mt-2">
                <button
                  onClick={handleGithubLogin}
                  className="bg-black text-white p-2 rounded-lg"
                >
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
