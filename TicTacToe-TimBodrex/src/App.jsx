import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Login from "./pages/login";
import Game from "./pages/game";
import Home from "./pages/home";
import MainLayout from "./pages/MainLayout";
import Register from "./pages/register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      // loader: () => {
      //   if (localStorage.access_token) {
      //     return redirect("/");
      //   }
      //   return null;
      // },
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      element: <MainLayout />,
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
