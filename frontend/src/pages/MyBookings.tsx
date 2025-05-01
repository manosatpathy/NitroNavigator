import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import {
  BsCalendarRange,
  BsPeople,
  BsGeoAlt,
  BsClockHistory,
} from "react-icons/bs";
import { FaRegSadTear } from "react-icons/fa";
import { BiSolidHotel } from "react-icons/bi";

const MyBookings = () => {
  const { data: hotels, isLoading } = useQuery({
    queryKey: ["fetchMyBookings"],
    queryFn: apiClient.fetchMyBookings,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 ">
        <FaRegSadTear className="text-gray-400 text-4xl" />
        <h3 className="text-xl font-semibold text-gray-700">
          No Bookings Found
        </h3>
        <p className="text-gray-500 max-w-md text-center">
          You haven't made any hotel bookings yet. When you do, they'll appear
          here!
        </p>
      </div>
    );
  }

  const totalBookings = hotels.reduce(
    (count, hotel) => count + hotel.bookings.length,
    0
  );

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BiSolidHotel className="text-indigo-600 text-2xl" />
          <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        </div>
        <p className="text-gray-500 ml-9">
          You have {totalBookings}{" "}
          {totalBookings === 1 ? "booking" : "bookings"} across {hotels.length}{" "}
          {hotels.length === 1 ? "hotel" : "hotels"}
        </p>
      </div>

      <div className="space-y-8">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-indigo-200"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 h-64 relative">
                <img
                  src={hotel.imageUrls[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h2 className="text-2xl font-bold drop-shadow-md">
                    {hotel.name}
                  </h2>
                  <div className="flex items-center mt-1">
                    <BsGeoAlt className="text-indigo-300 mr-1" />
                    <p className="text-sm text-indigo-100">
                      {hotel.city}, {hotel.country}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-6 lg:w-2/3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <BsClockHistory className="text-indigo-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-700">
                      Your {hotel.bookings.length}{" "}
                      {hotel.bookings.length === 1 ? "Booking" : "Bookings"}
                    </h3>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {hotel.bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 transition-all hover:bg-indigo-50 hover:border-indigo-200"
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-2 h-10 bg-indigo-500 rounded-full mr-3"></div>
                        <div>
                          <div className="flex items-center text-gray-700 mb-1">
                            <BsCalendarRange className="text-indigo-500 mr-2" />
                            <span className="font-medium">
                              Reservation Details
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Booking ID: {booking._id.substring(0, 8)}...
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 ml-5">
                        <div className="flex items-start">
                          <div className="bg-indigo-100 p-1 rounded-md mr-2 mt-1">
                            <BsCalendarRange className="text-indigo-600 text-sm" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Check-in</p>
                            <p className="text-sm font-medium">
                              {new Date(booking.checkIn).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                          <div className="mx-2 border-r border-gray-300 h-10 mt-1"></div>
                          <div>
                            <p className="text-xs text-gray-500">Check-out</p>
                            <p className="text-sm font-medium">
                              {new Date(booking.checkOut).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="bg-indigo-100 p-1 rounded-md mr-2">
                            <BsPeople className="text-indigo-600 text-sm" />
                          </div>
                          <div>
                            <p className="text-sm">
                              {booking.adultCount}{" "}
                              {booking.adultCount === 1 ? "adult" : "adults"}
                              {booking.childCount > 0 &&
                                `, ${booking.childCount} ${
                                  booking.childCount === 1
                                    ? "child"
                                    : "children"
                                }`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
