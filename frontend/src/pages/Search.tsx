import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import SearchBar from "../components/SearchBar";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData, isPending } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
  });

  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prev) =>
      event.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;
    setSelectedHotelTypes((prev) =>
      event.target.checked
        ? [...prev, hotelType]
        : prev.filter((type) => type !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;
    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, facility]
        : prev.filter((prevFacility) => prevFacility !== facility)
    );
  };

  return (
    <div>
      <SearchBar />
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 px-4 md:px-8 py-6 bg-white min-h-screen container mx-auto">
        <div className="bg-white shadow-md rounded-2xl border border-gray-200 p-6 h-fit sticky top-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-4">
              Filter by
            </h3>
            <StarRatingFilter
              selectedStars={selectedStars}
              onChange={handleStarChange}
            />
            <HotelTypeFilter
              selectedHotelTypes={selectedHotelTypes}
              onChange={handleHotelTypeChange}
            />
            <FacilitiesFilter
              selectedFacilities={selectedFacilities}
              onChange={handleFacilityChange}
            />
            <PriceFilter
              selectedPrice={selectedPrice}
              onChange={(value?: number) => setSelectedPrice(value)}
            />
          </div>
        </div>

        <main className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {hotelData?.pagination.total} Hotels found
              {search.destination ? ` in ${search.destination}` : ""}
            </h2>
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="p-2 rounded-lg border border-gray-300 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Sort By</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">Price (low to high)</option>
              <option value="pricePerNightDesc">Price (high to low)</option>
            </select>
          </div>

          {isPending ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {hotelData?.data.map((hotel) => (
                <SearchResultsCard hotel={hotel} key={hotel._id} />
              ))}
            </div>
          )}
          <div className="pt-4">
            <Pagination
              page={hotelData?.pagination.page || 1}
              pages={hotelData?.pagination.totalPages || 1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Search;
