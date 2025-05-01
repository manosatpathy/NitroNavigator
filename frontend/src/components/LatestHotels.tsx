import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import * as apiClient from "../api-client";
import { SlLocationPin } from "react-icons/sl";

const LatestHotels = () => {
  const { data: hotels } = useQuery({
    queryKey: ["fetchRecentHotels"],
    queryFn: apiClient.fetchRecentHotels,
  });

  return (
    <div className="px-4 py-6">
      <h2 className="text-4xl font-bold text-neutral-900 font-[poppins] mb-16 text-center">
        Recently Added Hotels
      </h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {hotels?.slice(0, 3).map((hotel) => (
          <div
            key={hotel._id}
            className="w-80 pb-2 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div>
              <img
                src={hotel.imageUrls[0]}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-700 font-[Poppins]">
                  {hotel.name}
                </h3>

                <div className="flex items-center text-yellow-500 text-sm">
                  {Array(hotel.starRating)
                    .fill(null)
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <SlLocationPin />
                <div className="text-sm text-gray-500 font-medium font-serif">
                  {hotel.city}, {hotel.country}
                </div>
              </div>
              <div className="flex justify-between items-center pt-1 px-1">
                <div>
                  <span className="text-xl font-bold text-black font-[poppins]">
                    ${hotel.pricePerNight}
                  </span>
                  <span className="text-sm text-gray-500 font-semibold">
                    / night
                  </span>
                </div>
                <button className="border rounded-md px-4 py-2 font-[roboto]">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestHotels;
