import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BiDollar, BiHotel } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { BsBuildingAdd, BsMap, BsPerson } from "react-icons/bs";

const MyHotels = () => {
  const { data: hotelData, isLoading } = useQuery({
    queryKey: ["fetchMyHotels"],
    queryFn: apiClient.fetchMyHotels,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!hotelData || hotelData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6 text-center px-4 min-h-screen">
        <div className="text-indigo-600">
          <BiHotel size={48} className="mx-auto mb-2" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800">
          No Hotels Found
        </h3>
        <p className="text-gray-500 max-w-md">
          You haven't added any hotels yet. Get started by adding your first
          property.
        </p>
        <Link
          to="/add-hotel"
          className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-lg transition shadow-md hover:shadow-lg"
        >
          Add Your First Hotel
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            My Hotels
          </h1>
          <p className="text-gray-500">
            Manage your {hotelData.length} properties
          </p>
        </div>
        <Link
          to="/add-hotel"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <span>Add Hotel</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel, index) => (
          <div
            key={index}
            className="bg-white h-96 md:h-80 border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col md:flex-row"
          >
            {hotel.imageUrls?.[0] && (
              <div className="md:w-1/3 h-48 md:h-80 relative">
                <img
                  src={hotel.imageUrls[0]}
                  alt={hotel.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4 flex items-center">
                  {[...Array(hotel.starRating)].map((_, i) => (
                    <FaStar key={i} size={16} className="text-yellow-400" />
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 md:w-2/3 flex flex-col justify-between h-full overflow-y-auto">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {hotel.name}
                </h2>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  {hotel.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <BsMap size={18} className="text-indigo-600" />
                    <span>
                      {hotel.city}, {hotel.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <BsBuildingAdd size={18} className="text-indigo-600" />
                    <span>{hotel.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <BiDollar size={18} className="text-indigo-600" />
                    <span>${hotel.pricePerNight} / night</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <BsPerson size={18} className="text-indigo-600" />
                    <span>
                      {hotel.adultCount} adults, {hotel.childCount} children
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-auto">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
