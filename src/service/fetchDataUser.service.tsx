import { useQuery } from "@tanstack/react-query";
import type { getUserResponse } from "@/types/user/user.types";
import { getUser } from "@/hooks/useFetchDataUser";

export const useUserQuery = () => {
  return useQuery<getUserResponse, Error>({
    queryKey: ['users'],
    queryFn: getUser,
  });
};
