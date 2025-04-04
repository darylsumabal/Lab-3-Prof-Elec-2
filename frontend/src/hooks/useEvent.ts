import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEvent, editEvent, getEvent, getEvents } from "../lib/api";

export const EVENT = "event";

export interface EventData {
  _id: string;
  title: string;
  date: string;
  organizer: string;
}

export type Events = EventData[];

export const useEvent = (opt = {}) => {
  const { data: events = [], ...rest } = useQuery<Events>({
    queryKey: [EVENT],
    queryFn: getEvents,
    ...opt,
  });

  return { events, ...rest };
};

export const useGetEvent = (id: string) => {
  const { data: event, ...rest } = useQuery<EventData>({
    queryKey: [id],
    queryFn: () => getEvent(id),
  });

  return { event, ...rest };
};

export const useEditEvent = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: (payload: { id: string; data: EventData }) =>
      editEvent(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EVENT] });
    },
  });

  return { editEvents: mutate, ...rest };
};

export const useDeleteEvent = (id: string) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteEvent(id),
    onSuccess: () => {
      queryClient.setQueryData<Events>([EVENT], (cache) =>
        (cache ?? []).filter((session: EventData) => session._id !== id)
      );
    },
  });

  return {
    deleteEvent: mutate,
    ...rest,
  };
};
