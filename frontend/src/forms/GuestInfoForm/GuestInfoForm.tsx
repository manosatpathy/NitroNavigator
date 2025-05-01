import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import {
  FaRegCalendar,
  FaUserFriends,
  FaChild,
  FaArrowRight,
} from "react-icons/fa";
import { MdOutlineNightShelter } from "react-icons/md";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [nights, setNights] = useState(1);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn || new Date(),
      checkOut:
        search.checkOut ||
        new Date(new Date().setDate(new Date().getDate() + 1)),
      adultCount: search.adultCount || 2,
      childCount: search.childCount || 0,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const adultCount = watch("adultCount");
  const childCount = watch("childCount");

  useEffect(() => {
    if (checkIn && checkOut) {
      const diffTime = checkOut.getTime() - checkIn.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 1);
    }
  }, [checkIn, checkOut]);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  const totalPrice = pricePerNight * nights;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-indigo-600 text-white p-4">
        <div className="flex items-baseline">
          <h3 className="text-2xl font-bold">
            ${pricePerNight.toLocaleString()}
          </h3>
          <span className="text-sm ml-2 opacity-90">/ night</span>
        </div>
      </div>

      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
        className="p-6 space-y-4"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Check-in - Check-out</span>
            <div className="flex items-center">
              <MdOutlineNightShelter className="text-indigo-500 mr-1" />
              <span>
                {nights} {nights === 1 ? "night" : "nights"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <DatePicker
                required
                selectsStart
                selected={checkIn}
                startDate={checkIn}
                endDate={checkOut}
                minDate={new Date()}
                onChange={(date) => setValue("checkIn", date as Date)}
                className="w-full bg-indigo-50 border border-indigo-100 rounded-lg py-3 px-4 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300"
                dateFormat="MMM d, yyyy"
                placeholderText="Check-in date"
              />
              <FaRegCalendar className="absolute top-1/2 right-3 transform -translate-y-1/2 text-indigo-400" />
            </div>
            <div className="relative">
              <DatePicker
                required
                selectsEnd
                selected={checkOut}
                startDate={checkIn}
                endDate={checkOut}
                minDate={checkIn}
                onChange={(date) => setValue("checkOut", date as Date)}
                className="w-full bg-indigo-50 border border-indigo-100 rounded-lg py-3 px-4 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300"
                dateFormat="MMM d, yyyy"
                placeholderText="Check-out date"
              />
              <FaRegCalendar className="absolute top-1/2 right-3 transform -translate-y-1/2 text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Guests</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <FaUserFriends className="text-indigo-500 mr-2" />
                <span>Adults</span>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-indigo-200 text-indigo-500 hover:bg-indigo-100"
                  onClick={() =>
                    setValue("adultCount", Math.max(1, adultCount - 1))
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-12 text-center bg-transparent font-medium text-indigo-800"
                  min={1}
                  max={20}
                  readOnly
                  {...register("adultCount", {
                    required: "Required",
                    min: {
                      value: 1,
                      message: "Min 1 adult",
                    },
                    valueAsNumber: true,
                  })}
                />
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-indigo-200 text-indigo-500 hover:bg-indigo-100"
                  onClick={() =>
                    setValue("adultCount", Math.min(20, adultCount + 1))
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-700">
                <FaChild className="text-indigo-500 mr-2" />
                <span>Children</span>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-indigo-200 text-indigo-500 hover:bg-indigo-100"
                  onClick={() =>
                    setValue("childCount", Math.max(0, childCount - 1))
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-12 text-center bg-transparent font-medium text-indigo-800"
                  min={0}
                  max={20}
                  readOnly
                  {...register("childCount", {
                    valueAsNumber: true,
                  })}
                />
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-indigo-200 text-indigo-500 hover:bg-indigo-100"
                  onClick={() =>
                    setValue("childCount", Math.min(20, childCount + 1))
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {errors.adultCount && (
            <p className="text-red-500 text-xs mt-1">
              {errors.adultCount.message}
            </p>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">
              ${pricePerNight.toLocaleString()} × {nights}{" "}
              {nights === 1 ? "night" : "nights"}
            </span>
            <span className="font-medium">
              ${(pricePerNight * nights).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
            <span>Total</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {isLoggedIn ? (
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <span>Book Now</span>
            <FaArrowRight className="ml-2" />
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center"
          >
            Sign in to Book
          </button>
        )}
      </form>
    </div>
  );
};

export default GuestInfoForm;
