import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery({
    queryKey: ["fetchMyHotels"],
    queryFn: apiClient.fetchMyHotels,
  });

  if (!hotelData || hotelData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-500 text-lg">
        <p>No Hotels Found</p>
        <Link
          to="/add-hotel"
          className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Add Your First Hotel
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Add Hotel
        </Link>
      </div>

      <div className="space-y-8">
        {hotelData.map((hotel, index) => (
          <div
            key={index}
            className="flex flex-col border border-gray-200 shadow-sm rounded-2xl hover:shadow-lg transition bg-white overflow-hidden"
          >
            {hotel.imageUrls?.[0] && (
              <img
                src={hotel.imageUrls[0]}
                alt={hotel.name}
                className="h-64 w-full object-cover"
              />
            )}

            <div className="p-6 flex flex-col gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  {hotel.name}
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {hotel.description}
                </p>
              </div>

              <div className="flex gap-3 text-gray-700 text-sm">
                <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md">
                  <BsMap />
                  <span>
                    {hotel.city}, {hotel.country}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md">
                  <BsBuilding />
                  <span>{hotel.type}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md">
                  <BiMoney />
                  <span>₹{hotel.pricePerNight} / night</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md">
                  <BiHotel />
                  <span>
                    {hotel.adultCount} adults, {hotel.childCount} children
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md">
                  <BiStar />
                  <span>{hotel.starRating} Star Rating</span>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg transition"
                >
                  View Details
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
