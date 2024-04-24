import { RouterProvider } from "react-router-dom";

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/login",
//       element: <Login />,
//       loader: () => {
//         if (localStorage.token) {
//           return redirect("/");
//         }
//         return null;
//       },
//     },
//     {
//       path: "/register",
//       element: <Register />,
//       loader: () => {
//         if (localStorage.token) {
//           return redirect("/");
//         }
//         return null;
//       },
//     },
//     {
//       element: <MainLayout />,
//       loader: () => {
//         if (!localStorage.token) {
//           return redirect("/login");
//         }
//         return null;
//       },
//       children: [
//         {
//           path: "/",
//           element: <Home />,
//         },
//         {
//           path: "/home",
//           element: <Home />,
//         },
//         {
//           path: "/game",
//           element: <Game />,
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

function App() {
  return (
    <>
      <RouterProvider />
    </>
  );
}
