import {
  Container,
  Heading,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import EventCard from "../components/EventCard";
import Dialog from "../components/ui/dialog";
import queryClient from "../config/queryClient";
import { events as eventData } from "../constant/event";
import { EVENT, useEvent } from "../hooks/useEvent";
import { createEvent } from "../lib/api";
const Event = () => {
  const { events, isSuccess, isPending, isError } = useEvent();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [input, setInput] = useState({
    title: "",
    date: "",
    organizer: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EVENT] });
    },
  });

  const handleSubmit = () => {
    mutate(input);
    setInput({ date: "", title: "", organizer: "" });
    onClose();
  };

  return (
    <Container mt={16}>
      <Heading as="h1" mb={6}>
        Event
      </Heading>
      <Container mb={6}>
        <Dialog
          data={eventData}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          buttonTitle="Create Event"
          input={input}
          setInput={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </Container>

      {isPending && <Spinner />}
      {isError && <Text>Failed to get events.</Text>}
      {isSuccess && (
        <VStack spacing={3} align="flex-start">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Event;
