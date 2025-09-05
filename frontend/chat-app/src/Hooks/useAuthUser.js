import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../libs/apis";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
  return {
    authUser: authUser.data?.user,
    error: authUser.error,
    isLoading: authUser.isLoading,
  };
};

export default useAuthUser;
