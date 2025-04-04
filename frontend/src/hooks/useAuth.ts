import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";

export const AUTH = "auth";

export interface User {
  email: string;
  verified: boolean;
  createdAt: string;
}

const useAuth = (opts = {}) => {
  const { data: user, ...rest } = useQuery<User>({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...opts,
  });

  return { user, ...rest };
};

export default useAuth;
