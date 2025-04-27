import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type SigninFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const location = useLocation();

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
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 relative overflow-hidden rounded-lg hidden md:block">
          <img
            src="/bg2.jpg"
            alt="Background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-purple-200/70 z-10"></div>
        </div>
        <form
          className="w-full md:w-1/2 p-8 rounded-lg bg-white/30 shadow-lg backdrop-blur-sm"
          onSubmit={onSubmit}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 font-[roboto]">
            Sign In
          </h2>

          <div className="min-h-[100px]">
            <label className="text-gray-700 text-sm font-bold font-sans">
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

          <div className="min-h-[100px]">
            <label className="text-gray-700 text-sm font-bold font-sans">
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

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-2 px-4 mt-6 font-bold font-[roboto] rounded-lg hover:bg-blue-500 text-lg transition disabled:bg-gray-500"
          >
            {mutation.isPending ? "Signing In..." : "Sign In"}
          </button>

          <div className="mt-6 text-sm text-center text-black flex justify-center gap-2">
            Don't have an account?
            <Link
              to="/register"
              className="text-blue-400 hover:underline transition duration-200 tracking-tighter"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
