import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../libs/apis";

function useSignUp() {
  const queryClient = useQueryClient();
  const {
    mutate: signUpMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { signUpMutation, isLoading, error };
}

export default useSignUp;
