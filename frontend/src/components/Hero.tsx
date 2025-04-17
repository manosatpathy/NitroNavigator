import { useState, FormEvent } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Hero = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    search.checkIn,
    search.checkOut,
  ]);
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

  return (
    <div className="container mx-auto relative h-[90vh]">
      <div className="relative h-full w-full">
        <img
          src="/hotel.jpg"
          alt="hero picture"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35"></div>

        {/* Bottom Wave */}
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
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-[Poppins] animate__animated animate__fadeInDown">
          Discover Your Perfect Stay
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-[Roboto] animate__animated animate__fadeInUp animate__delay-1s">
          Luxury stays. Affordable prices, Instant booking.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 max-w-6xl w-full"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Destination Input */}
            <input
              type="text"
              placeholder="Where would you like to stay?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="flex-1 max-w-md px-4 py-3 rounded-lg bg-white/10 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition duration-200 w-full"
            />

            {/* Date Picker */}
            <DatePicker
              locale="en-GB"
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select your dates"
              className="w-full md:w-auto px-4 py-3 rounded-lg bg-white/10 border border-gray-500 text-white focus:outline-none focus:border-green-500 transition duration-200"
              wrapperClassName="w-full md:w-auto"
            />

            {/* Adult and Children Counts */}

            <label className="text-white flex items-center gap-2">
              Adults:
              <input
                type="number"
                min={1}
                max={20}
                value={adultCount}
                onChange={(e) => setAdultCount(Number(e.target.value))}
                className="w-full px-2 py-1 rounded bg-white/10 border border-gray-500 text-white focus:outline-none"
              />
            </label>

            <label className="text-white flex items-center gap-2">
              Children:
              <input
                type="number"
                min={0}
                max={20}
                value={childCount}
                onChange={(e) => setChildCount(Number(e.target.value))}
                className="w-full px-2 py-1 rounded bg-white/10 border border-gray-500 text-white focus:outline-none"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200 mt-4 md:mt-0"
            >
              Search Hotels
            </button>
          </div>
        </form>

        {/* Stats */}
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
