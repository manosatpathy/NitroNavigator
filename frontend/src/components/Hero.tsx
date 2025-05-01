import { useState, FormEvent, useEffect, useRef } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MdChildCare,
  MdLocationOn,
  MdOutlineCalendarMonth,
  MdPerson,
  MdSearch,
} from "react-icons/md";

const Hero = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const isFirstRender = useRef(true);

  const [destination, setDestination] = useState<string>(search.destination);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(() => {
    if (search.checkIn && search.checkOut) {
      return [search.checkIn, search.checkOut];
    }

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return [today, tomorrow];
  });

  const [startDate, endDate] = dateRange;
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      search.saveSearchValues(
        destination,
        startDate,
        endDate,
        adultCount,
        childCount
      );
      navigate("/search");
    }
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  useEffect(() => {
    if (isFirstRender.current) {
      if (startDate && (!endDate || endDate <= startDate)) {
        const nextDay = new Date(startDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setDateRange([startDate, nextDay]);
      }
      isFirstRender.current = false;
    }
  }, [startDate, endDate]);

  return (
    <div className='relative bg-[url("/hotel.jpg")] bg-no-repeat bg-cover bg-center h-screen'>
      <div className="absolute inset-0 bg-black/35"></div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[100px]"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 350.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            style={{ fill: "#f8f8f8" }}
          ></path>
        </svg>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-[Poppins] animate__animated animate__fadeInDown">
          Discover Your Perfect Stay
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-[Roboto] animate__animated animate__fadeInUp animate__delay-1s">
          Luxury stays. Affordable prices, Instant booking.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-white/15 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-6xl w-full shadow-xl border border-white/20"
        >
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="w-full relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">
                <MdLocationOn className="text-2xl text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Where would you like to stay?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 text-white placeholder-gray-300 focus:outline-none border border-white/20"
              />
            </div>

            <div className="relative w-full md:w-auto">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">
                <MdOutlineCalendarMonth className="text-xl" />
              </div>
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                minDate={minDate}
                maxDate={maxDate}
                dateFormat="MMM d, yyyy"
                placeholderText="Select your dates"
                className="w-full md:w-72 pl-11 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none"
                wrapperClassName="w-full md:w-auto"
                shouldCloseOnSelect={false}
                filterDate={(date) => {
                  if (!startDate) return true;
                  if (!endDate) {
                    return date >= startDate;
                  }
                  return true;
                }}
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
                  <MdPerson className="text-xl" />
                </div>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={adultCount}
                  onChange={(e) => setAdultCount(Number(e.target.value))}
                  className="w-20 pl-10 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none"
                  aria-label="Adults"
                />
                <span className="absolute text-white text-xs -bottom-5 left-0 font-medium">
                  Adults
                </span>
              </div>

              <div className="relative w-full md:w-auto">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
                  <MdChildCare className="text-xl" />
                </div>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={childCount}
                  onChange={(e) => setChildCount(Number(e.target.value))}
                  className="w-20 pl-10 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none"
                  aria-label="Children"
                />
                <span className="absolute text-white text-xs -bottom-5 left-0 font-medium">
                  Children
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="font-serif w-full md:w-auto px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl transition duration-300 shadow-lg flex items-center justify-center gap-2 mt-6 md:mt-0"
            >
              <MdSearch className="text-xl" />
              <span>Search</span>
            </button>
          </div>
        </form>

        <div className="mt-12 flex justify-center gap-8 text-white animate__animated animate__fadeInUp animate__delay-3s">
          <div className="text-center">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-gray-400">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">10k+</div>
            <div className="text-gray-400">Properties</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">100k+</div>
            <div className="text-gray-400">Happy Guests</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
