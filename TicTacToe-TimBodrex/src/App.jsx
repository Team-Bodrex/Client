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
      element: <MainLayout />,
      loader: () => {
        if (!localStorage.access_token) {
          return redirect("/login");
        }
        return null;
      },
      children: [
            {
              path: "/",
              element: <Home />,
            },
            // {
            //   path: "/home",
            //   element: <Home />,
            // },
            {
              path: "/game",
              element: <Game />,
            },
          ]
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
        loader: () => {
          if (localStorage.access_token) {
            return redirect("/");
          }
          return null;
        }
      }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
