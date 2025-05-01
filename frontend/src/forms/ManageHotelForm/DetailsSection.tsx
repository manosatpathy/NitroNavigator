import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
        Add Hotel
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Hotel Name
          </label>
          <input
            type="text"
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border ${
              errors.name ? "border-red-500" : ""
            }`}
            {...register("name", { required: "This field is required." })}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border ${
              errors.city ? "border-red-500" : ""
            }`}
            {...register("city", { required: "This field is required." })}
          />
          {errors.city && (
            <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border ${
              errors.country ? "border-red-500" : ""
            }`}
            {...register("country", { required: "This field is required." })}
          />
          {errors.country && (
            <p className="text-sm text-red-600 mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Price Per Night ($)
          </label>
          <input
            type="number"
            min={1}
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border ${
              errors.pricePerNight ? "border-red-500" : ""
            }`}
            {...register("pricePerNight", {
              required: "This field is required.",
            })}
          />
          {errors.pricePerNight && (
            <p className="text-sm text-red-600 mt-1">
              {errors.pricePerNight.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Star Rating
          </label>
          <select
            {...register("starRating", { required: "This field is required" })}
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border ${
              errors.starRating ? "border-red-500" : ""
            }`}
          >
            <option value="" className="text-gray-500">
              Select Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <p className="text-sm text-red-600 mt-1">
              {errors.starRating.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          rows={6}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border ${
            errors.description ? "border-red-500" : ""
          }`}
          {...register("description", { required: "This field is required." })}
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailsSection;
