import { useForm } from "react-hook-form";
import { PaymentIntentResponse, UserType } from "../../../../backend/src/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { BiCreditCard, BiUser } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { hotelId } = useParams();

  const { showToast } = useAppContext();

  const { mutate: bookRoom, isPending } = useMutation({
    mutationFn: apiClient.createRoomBooking,
    onSuccess: () => {
      showToast({ message: "Booking Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving booking", type: "ERROR" });
    },
  });

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-md border border-gray-100 h-fit"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 rounded-t-lg">
        <h2 className="text-xl font-bold text-white">Confirm Your Details</h2>
      </div>

      <div className="p-4 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BiUser className="text-indigo-600" size={18} />
            <h3 className="font-semibold text-gray-800">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700 text-sm font-medium">
                First Name
              </span>
              <input
                className="mt-1 block w-full px-3 py-1.5 bg-gray-200 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-not-allowed"
                type="text"
                readOnly
                disabled
                {...register("firstName")}
              />
            </label>

            <label className="block">
              <span className="text-gray-700 text-sm font-medium">
                Last Name
              </span>
              <input
                className="mt-1 block w-full px-3 py-1.5 bg-gray-200 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-not-allowed"
                type="text"
                readOnly
                disabled
                {...register("lastName")}
              />
            </label>

            <label className="block col-span-2">
              <span className="text-gray-700 text-sm font-medium">Email</span>
              <input
                className="mt-1 block w-full px-3 py-1.5 bg-gray-200 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-not-allowed"
                type="text"
                readOnly
                disabled
                {...register("email")}
              />
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FaDollarSign className="text-indigo-600" size={18} />
            <h3 className="font-semibold text-gray-800">Your Price Summary</h3>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-gray-800">Total Cost:</div>
                <div className="text-xs text-gray-600">
                  Includes taxes and charges
                </div>
              </div>
              <div className="text-xl font-bold text-indigo-700">
                ${paymentIntent.totalCost.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BiCreditCard className="text-indigo-600" size={18} />
            <h3 className="font-semibold text-gray-800">Payment Details</h3>
          </div>

          <div className="border border-gray-200 rounded-lg p-3">
            <CardElement
              id="payment-element"
              className="p-2 text-sm"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            disabled={isPending}
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-lg shadow transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
