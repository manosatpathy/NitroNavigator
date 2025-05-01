import { BiMapPin, BiMoon, BiUser } from "react-icons/bi";
import { HotelType } from "../../../backend/src/types";
import { FaCalendarDays } from "react-icons/fa6";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-md p-6 h-fit">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-3">
        Your Booking Details
      </h2>

      <div className="space-y-4">
        <div className="flex items-start space-x-3 py-3">
          <BiMapPin className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm text-slate-500">Location</p>
            <p className="font-semibold text-slate-800">{hotel.name}</p>
            <p className="text-slate-600">{`${hotel.city}, ${hotel.country}`}</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <FaCalendarDays className="text-indigo-600" size={18} />
            <p className="font-medium text-slate-700">Stay Dates</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">Check-in</p>
              <p className="font-semibold text-slate-800">
                {checkIn.toDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Check-out</p>
              <p className="font-semibold text-slate-800">
                {checkOut.toDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 py-3 border-b border-slate-100">
          <BiMoon className="text-indigo-600 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm text-slate-500">Duration</p>
            <p className="font-semibold text-slate-800">
              {numberOfNights} nights
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 py-3">
          <BiUser className="text-indigo-600 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm text-slate-500">Guests</p>
            <p className="font-semibold text-slate-800">
              {adultCount} adult{adultCount !== 1 ? "s" : ""}
              {childCount > 0 &&
                ` & ${childCount} ${childCount === 1 ? "child" : "children"}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
