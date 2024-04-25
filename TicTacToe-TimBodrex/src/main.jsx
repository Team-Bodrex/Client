import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  redirect,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login";
import Game from "./pages/game";
import Home from "./pages/home";
import MainLayout from "./pages/MainLayout";
import Register from "./pages/register";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/game",
        element: <Game />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.getItem("token")) {
        return redirect("/");
      }
      return null;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
