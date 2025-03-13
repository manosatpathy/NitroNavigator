import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/models/hotel";
import { AiFillStar } from "react-icons/ai";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-200 rounded-xl p-6 gap-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="w-full h-[280px] overflow-hidden rounded-xl">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="grid grid-rows-[auto_1fr_auto] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-500 w-5 h-5" />
              ))}
            </span>
            <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {hotel.type}
            </span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold text-slate-800 hover:text-blue-600 transition-colors duration-200"
          >
            {hotel.name}
          </Link>
        </div>

        <div className="text-slate-600 leading-relaxed line-clamp-4">
          {hotel.description}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
          <div className="flex flex-wrap gap-2">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full"
              >
                {facility}
              </span>
            ))}
            {hotel.facilities.length > 3 && (
              <span className="text-sm text-slate-500 font-medium self-center">
                +{hotel.facilities.length - 3} more
              </span>
            )}
          </div>
          <div className="flex flex-col items-stretch lg:items-end gap-2">
            <span className="text-xl font-bold text-slate-800">
              ₹{hotel.pricePerNight}{" "}
              <span className="text-sm font-normal text-slate-500">
                / night
              </span>
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
