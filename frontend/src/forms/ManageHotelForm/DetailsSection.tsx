import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-white text-sm font-bold mt-4">
        Name
        <input
          type="text"
          className="border rounded w-full mt-1 p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("name", { required: "This field is required." })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </label>
      <div className="flex gap-4 ">
        <label className="text-white text-sm font-bold mt-4">
          City
          <input
            type="text"
            className="border rounded w-full mt-1 p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("city", { required: "This field is required." })}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </label>

        <label className="text-white text-sm font-bold mt-4">
          Country
          <input
            type="text"
            className="border rounded w-full mt-1 p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("country", { required: "This field is required." })}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </label>
      </div>
      <label className="text-white text-sm font-bold mt-4">
        Description
        <textarea
          rows={8}
          className="border rounded w-full mt-1 p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("description", { required: "This field is required." })}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </label>
      <label className="text-white text-sm font-bold mt-4 max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full mt-1 p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("pricePerNight", {
            required: "This field is required.",
          })}
        />
        {errors.pricePerNight && (
          <p className="text-red-500 text-sm mt-1">
            {errors.pricePerNight.message}
          </p>
        )}
      </label>
      <label className="text-white text-sm font-bold mt-4 max-w-[50%]">
        Star rating
        <select
          {...register("starRating", { required: "This field is required" })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <p className="text-red-500 text-sm mt-1">
            {errors.starRating.message}
          </p>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
