import { useQuery } from "@tanstack/react-query";
import { getSessions } from "../lib/api";
export const SESSIONS = "sessions";

export interface Data {
  _id: string;
  createdAt: string;
  userAgent: string;
  isCurrent: boolean;
}

export type Sessions = Data[];

const useSession = (opt = {}) => {
  const { data: sessions = [], ...rest } = useQuery<Sessions>({
    queryKey: [SESSIONS],
    queryFn: getSessions,
    ...opt,
  });

  return { sessions, ...rest };
};

export default useSession;
