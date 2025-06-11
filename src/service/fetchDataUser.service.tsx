import { useQuery, useMutation  } from "@tanstack/react-query";
import type { getUserResponse, PostUserPayload, postUserResponse } from "@/types/user/user.types";
import { getUser, postUser } from "@/hooks/useFetchDataUser";

export const useUserQuery = () => {
  return useQuery<getUserResponse, Error>({
    queryKey: ['users'],
    queryFn: getUser,
  });
};

export const usePostUser = () => {
  return useMutation<postUserResponse, Error, PostUserPayload>({
    mutationFn: postUser,
  });
};

