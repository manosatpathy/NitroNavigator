import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type SigninFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      showToast({ message: "Sign in Successful", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <div className="flex items-center justify-center container my-auto bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">
      <form
        action=""
        className="w-full max-w-lg p-8 rounded-lg bg-white/20 shadow-lg backdrop-blur-sm"
        onSubmit={onSubmit}
      >
        <h1 className="font-bold text-2xl text-white mb-3">Sign In</h1>

        <label className="text-white text-sm font-bold mt-4">
          Email
          <input
            type="email"
            className="border rounded w-full mt-1 p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("email", { required: "This field is required." })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </label>
        <label className="text-white text-sm font-bold mt-4">
          Password
          <input
            type="password"
            className="border rounded w-full mt-1 p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <span className="flex items-end justify-between">
          <span className="flex text-sm text-white flex-col">
            Not Registered?{" "}
            <Link to="/register" className="underline">
              Create an account here
            </Link>
          </span>
          <button className="bg-blue-600 text-white py-2 px-4 mt-6 font-bold rounded-lg hover:bg-blue-500 text-lg transition">
            Sign In
          </button>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
