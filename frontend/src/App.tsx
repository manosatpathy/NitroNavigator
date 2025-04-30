import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import Homepage from "./pages/Homepage.tsx";
import Register from "./pages/Register.tsx";
import SignIn from "./pages/SignIn.tsx";
import AddHotel from "./pages/AddHotel.tsx";
import MyHotels from "./pages/MyHotels.tsx";
import EditHotel from "./pages/EditHotel.tsx";
import Search from "./pages/Search.tsx";
import MyBookings from "./pages/MyBookings.tsx";
import Details from "./pages/Details.tsx";
import Booking from "./pages/Booking.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <MainLayout />
          <ScrollRestoration />
        </>
      ),
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
          path: "/search",
          element: <Search />,
        },
        {
          path: "/detail/:hotelId",
          element: <Details />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            { path: "/add-hotel", element: <AddHotel /> },
            {
              path: "/my-hotels",
              element: <MyHotels />,
            },
            {
              path: "/edit-hotel/:hotelId",
              element: <EditHotel />,
            },
            {
              path: "/my-bookings",
              element: <MyBookings />,
            },
            {
              path: "/hotel/:hotelId/booking",
              element: <Booking />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
