import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: async () => {
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-black bg-[#e7e7e7] hover:bg-gray-200 transition-colors duration-200 px-4 py-2 rounded-3xl shadow-sm font-[sans-serif]"
    >
      {mutation.isPending ? "Signing Out..." : "Logout"}
    </button>
  );
};

export default SignOutButton;
