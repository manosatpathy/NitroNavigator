import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineCalendarMonth,
  MdSearch,
  MdLocationOn,
  MdPerson,
  MdChildCare,
} from "react-icons/md";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    search.checkIn,
    search.checkOut,
  ]);
  const [checkIn, checkOut] = dateRange;
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (checkIn && checkOut) {
      search.saveSearchValues(
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount
      );
      navigate("/search");
    }
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="w-full shadow-lg rounded-t-xl container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="p-5 w-full flex flex-col md:flex-row gap-4 items-center bg-white px-11"
      >
        <div className="relative flex-1 w-full">
          <MdLocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Where would you like to stay?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
          />
        </div>

        <div className="relative w-full md:w-auto">
          <MdOutlineCalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl z-10 pointer-events-none" />
          <DatePicker
            selectsRange
            startDate={checkIn}
            endDate={checkOut}
            onChange={(update) => setDateRange(update)}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="MMM d, yyyy"
            placeholderText="Select your dates"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
            wrapperClassName="w-full md:w-auto"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <MdPerson className="text-xl" />
            </div>
            <input
              type="number"
              min={1}
              max={20}
              value={adultCount}
              onChange={(e) => setAdultCount(Number(e.target.value))}
              className="w-20 pl-10 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Adults"
            />
            <span className="absolute text-gray-500 text-xs -bottom-5 left-0 font-medium">
              Adults
            </span>
          </div>

          <div className="relative w-full md:w-auto">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <MdChildCare className="text-xl" />
            </div>
            <input
              type="number"
              min={0}
              max={20}
              value={childCount}
              onChange={(e) => setChildCount(Number(e.target.value))}
              className="w-20 pl-10 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Children"
            />
            <span className="absolute text-gray-500 text-xs -bottom-5 left-0 font-medium">
              Children
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-lg shadow-md transition duration-200 flex items-center justify-center gap-2"
        >
          <MdSearch className="text-xl" />
          <span>Search Hotels</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
