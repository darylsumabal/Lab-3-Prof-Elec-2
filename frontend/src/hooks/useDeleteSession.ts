import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSession } from "../lib/api";
import { Data, SESSIONS } from "./useSession";

const useDeleteSession = (sessionId: string) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: [SESSIONS] });

      queryClient.setQueryData<Data[]>([SESSIONS], (cache) =>
        (cache ?? []).filter((session: Data) => session._id !== sessionId)
      );
    },
  });

  return { deleteSession: mutate, ...rest };
};

export default useDeleteSession;
