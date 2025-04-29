import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import { BiMap, BiCoffee, BiDumbbell } from "react-icons/bi";
import {
  FaBed,
  FaParking,
  FaShuttleVan,
  FaSmokingBan,
  FaSpa,
  FaSwimmingPool,
} from "react-icons/fa";
import { BsPeople, BsImages, BsGeoAlt } from "react-icons/bs";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import { useState } from "react";
import { MdFamilyRestroom } from "react-icons/md";
import { FaWifi } from "react-icons/fa6";

const facilityIcons: Record<string, JSX.Element> = {
  "Free WiFi": <FaWifi className="text-indigo-500" />,
  Parking: <FaParking className="text-indigo-500" />,
  "Airport Shuttle": <FaShuttleVan className="text-indigo-500" />,
  "Family Rooms": <MdFamilyRestroom className="text-indigo-500" />,
  "Non-Smoking Rooms": <FaSmokingBan className="text-indigo-500" />,
  "Outdoor Pool": <FaSwimmingPool className="text-indigo-500" />,
  Spa: <FaSpa className="text-indigo-500" />,
  "Fitness Center": <BiDumbbell className="text-indigo-500" />,
};

const Details = () => {
  const { hotelId } = useParams();
  const { data: hotel, isLoading } = useQuery({
    queryKey: ["fetchHotelById", hotelId],
    queryFn: () => apiClient.fetchHotelById(hotelId || ""),
    enabled: !!hotelId,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-700">Hotel not found</h2>
        <p className="text-gray-500">
          The hotel you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const displayImage = selectedImage || hotel.imageUrls[0];

  return (
    <div className="bg-gray-50">
      <div className="relative h-80 sm:h-96 md:h-[500px] w-full bg-gray-200 overflow-hidden container mx-auto">
        <img
          src={displayImage}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 text-white">
          <div className="flex items-center space-x-1 mb-2">
            {Array.from({ length: hotel.starRating }).map((_, idx) => (
              <AiFillStar key={idx} className="text-yellow-400 text-xl" />
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            {hotel.name}
          </h1>
          <div className="flex items-center text-gray-200 mb-4">
            <BsGeoAlt className="mr-2" />
            <span>
              {hotel.city}, {hotel.country}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
              <div className="flex items-center mb-4">
                <BsImages className="text-indigo-600 mr-2" size={20} />
                <h2 className="text-xl font-bold text-gray-800">
                  Photo Gallery
                </h2>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {hotel.imageUrls.map((image, idx) => (
                  <div
                    key={idx}
                    className={`h-16 md:h-20 overflow-hidden rounded-lg cursor-pointer transition-all ${
                      image === displayImage
                        ? "ring-2 ring-indigo-500 ring-offset-2 scale-105"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${hotel.name} - Image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaBed className="text-indigo-600 mr-2" size={20} />
                <h2 className="text-xl font-bold text-gray-800">
                  About this place
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center bg-indigo-50 p-3 rounded-lg">
                  <BsPeople className="text-indigo-600 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Guests</p>
                    <p className="font-medium">
                      {hotel.adultCount} adults, {hotel.childCount} children
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-indigo-50 p-3 rounded-lg">
                  <BiMap className="text-indigo-600 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="font-medium">{hotel.type}</p>
                  </div>
                </div>
              </div>
              <div className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {hotel.description}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <BiCoffee className="text-indigo-600 mr-2" size={20} />
                <h2 className="text-xl font-bold text-gray-800">
                  Amenities & Facilities
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {hotel.facilities.map((facility, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-50 hover:bg-indigo-50 p-3 rounded-lg transition-colors"
                  >
                    {facilityIcons[facility] || (
                      <BiCoffee className="text-indigo-500" />
                    )}
                    <span className="ml-2 text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <GuestInfoForm
                hotelId={hotel._id}
                pricePerNight={hotel.pricePerNight}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
