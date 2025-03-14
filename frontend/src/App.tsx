import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAppContext } from "./contexts/AppContext.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Homepage from "./pages/Homepage.tsx";
import Register from "./pages/Register.tsx";
import SignIn from "./pages/SignIn.tsx";
import AddHotel from "./pages/AddHotel.tsx";
import MyHotels from "./pages/MyHotels.tsx";
import EditHotel from "./pages/EditHotel.tsx";
import Search from "./pages/Search.tsx";

function App() {
  const { isLoggedIn } = useAppContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/edit-hotel/:hotelId",
          element: <EditHotel />,
        },
        {
          path: "/add-hotel",
          element: isLoggedIn ? <AddHotel /> : <Navigate to="/sign-in" />,
        },
        {
          path: "/my-hotels",
          element: isLoggedIn ? <MyHotels /> : <Navigate to="/sign-in" />,
        },
        {
          path: "/search",
          element: <Search />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
