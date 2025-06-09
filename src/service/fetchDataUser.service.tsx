import { useMutation } from "@tanstack/react-query";
import type { getUserResponse } from "@/types/user/userTypes";
import { getUser } from "@/hooks/useFetchDataUser";


export const useUserMutation = () => {
  return useMutation<getUserResponse, Error>({
    mutationFn: getUser,
    onSuccess: (data) => {
      console.log("Data berhasil diambil:", data);
    },
    onError: (error) => {
      console.error("Fetch data error:", error.message);
    },
  });
};
