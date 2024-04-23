import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");
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
          console.log(data, "<<<<<client");
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.email = data.email;
            localStorage.username = data.username;
          }
          navigate("/");
        } catch (error) {
          console.log(error);
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
      localStorage.setItem("token", data.access_token);
      navigate("/");
      console.log(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire("Error", "Invalid email or password", "error");
      } else {
        Swal.fire("Error", "An error occurred while logging in", "error");
      }
      console.log(error.response);
    }
  };
  return (
    <>
      <div class="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md max-w-md mx-auto mt-8">
        <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
        <form class="space-y-4" onSubmit={submitLogin}>
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full px-3 py-2 border dark:border-zinc-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              class="w-full px-3 py-2 border dark:border-zinc-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded-lg"
          >
            Login
          </button>
        </form>
        <div class="mt-4">
          <p class="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Or login with
          </p>
          <div class="flex justify-center space-x-4 mt-2">
            <button
              onClick={handleGithubLogin}
              class="bg-black text-white p-2 rounded-lg"
            >
              GitHub
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
