import {
  Container,
  Heading,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Dialog from "../components/ui/dialog";
import queryClient from "../config/queryClient";
import { events as eventData } from "../constant/event";
import { EVENT, useEvent } from "../hooks/useEvent";
import { createEvent } from "../lib/api";
const Event = () => {
  const { events, isSuccess, isPending, isError } = useEvent();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [input, setInput] = useState({
    title: "",
    date: "",
    organizer: "",
  });

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (input.date === "" || input.date === "" || input.organizer === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [input]);

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
      toast({
        title: "Event created successfully",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create event",
        description: error.message,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = () => {
    mutate(input);
    setInput({ date: "", title: "", organizer: "" });
    onClose();
  };

  return (
    <>
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
            headerTitle="Create an event"
            test={disabled}
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
    </>
  );
};

export default Event;
