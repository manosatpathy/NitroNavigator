import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { FaRegCalendar } from "react-icons/fa";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

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

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

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

  return (
    <div className="flex flex-col p-6 bg-blue-50 rounded-xl gap-4 shadow-lg">
      <h3 className="text-2xl font-bold text-blue-800">
        ₹{pricePerNight}{" "}
        <span className="text-sm font-normal text-gray-600">/ night</span>
      </h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <DatePicker
                required
                selectsStart
                selected={checkIn}
                startDate={checkIn}
                endDate={checkOut}
                minDate={new Date()}
                onChange={(date) => setValue("checkIn", date as Date)}
                className="border border-blue-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300"
                dateFormat="dd/MM/yyyy"
                placeholderText="Check-in date"
              />
              <FaRegCalendar className="absolute top-4 right-6 text-blue-400" />
            </div>
            <div className="relative flex-1">
              <DatePicker
                required
                selectsEnd
                selected={checkOut}
                startDate={checkIn}
                endDate={checkOut}
                minDate={checkIn}
                onChange={(date) => setValue("checkOut", date as Date)}
                className="border border-blue-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300"
                dateFormat="dd/MM/yyyy"
                placeholderText="Check-out date"
              />
              <FaRegCalendar className="absolute top-4 right-6 text-blue-400" />
            </div>
          </div>

          <div className="flex bg-white px-4 py-3 gap-4 rounded-lg border border-blue-200">
            <label className="flex items-center gap-2 flex-1">
              <span className="text-gray-700">Adults:</span>
              <input
                type="number"
                className="w-full p-1 focus:outline-none font-semibold text-blue-800 border-b-2 border-blue-100 focus:border-blue-500"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="flex items-center gap-2 flex-1">
              <span className="text-gray-700">Children:</span>
              <input
                type="number"
                className="w-full p-1 focus:outline-none font-semibold text-blue-800 border-b-2 border-blue-100 focus:border-blue-500"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
