import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async () => {
      showToast({ message: "Register Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <div className="flex items-stretch justify-center container mx-auto my-4 h-auto px-56">
      <div className="w-1/2 relative overflow-hidden rounded-lg">
        <img
          src="/bg.jpg"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-green-500/70 z-10"></div>
      </div>
      <form
        className="w-1/2 p-8 rounded-lg bg-white/30 shadow-lg backdrop-blur-sm"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Create Account
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 text-sm font-bold">
              First Name
              <input
                type="text"
                className="border rounded-lg w-full mt-1 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("firstName", {
                  required: "This field is required.",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}{" "}
            </label>
          </div>
          <div>
            <label className="text-gray-700 text-sm font-bold">
              Last Name
              <input
                type="text"
                className="border rounded-lg w-full mt-1 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("lastName", {
                  required: "This field is required.",
                })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </label>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-gray-700 text-sm font-bold">
            Email
            <input
              type="email"
              className="border rounded-lg w-full mt-1 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("email", { required: "This field is required." })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </label>
        </div>

        <div className="mt-4">
          <label className="text-gray-700 text-sm font-bold">
            Password
            <input
              type="password"
              className="border rounded-lg w-full mt-1 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("password", {
                required: "This field is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </label>
        </div>

        <div className="mt-4">
          <label className="text-gray-700 text-sm font-bold">
            Confirm Password
            <input
              type="password"
              className="border rounded-lg w-full mt-1 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) return "This field is required.";
                  if (watch("password") !== val)
                    return "Password does not match.";
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>
        </div>

        <button
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 mt-6 font-bold rounded-lg hover:bg-blue-500 text-lg transition disabled:bg-gray-500"
        >
          {isPending ? "Creating Account" : "Create Account"}
        </button>
        <div className="mt-6 text-sm text-center text-black flex justify-center gap-2">
          Alreadty have an account?
          <Link
            to="/sign-in"
            className="text-blue-400 hover:underline transition duration-200 tracking-tighter"
          >
            Sign in here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
