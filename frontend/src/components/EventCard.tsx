import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { events, registerUser } from "../constant/event";
import { EventData, useDeleteEvent, useEditEvent } from "../hooks/useEvent";
import { useCreateRegister } from "../hooks/useRegister";
import Dialog from "./ui/dialog";

interface EventCardProp {
  event: EventData;
}

const EventCard = ({ event }: EventCardProp) => {
  const { title, date, organizer, _id } = event;

  const { editEvents } = useEditEvent();

  const { deleteEvent } = useDeleteEvent(_id);

  const { mutateRegister } = useCreateRegister();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();

  const [input, setInput] = useState({
    title,
    date,
    organizer,
  });

  const [register, setRegister] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputChangeRegister = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegister((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitRegister = () => {
    mutateRegister({ id: _id, data: { ...register, _id } });
    onCloseRegister();
  };

  const handleSubmit = () => {
    editEvents({ id: _id, data: { ...input, _id } });
    onClose();
  };

  return (
    <>
      <Flex p={3} borderWidth="1px" borderRadius="md" width="full">
        <Box flex={1}>
          <Text fontWeight="bold" fontSize="sm" mb={1}>
            {title}
          </Text>
          <Text fontWeight="bold" fontSize="sm" mb={1}>
            {organizer}
          </Text>
          <Text fontWeight="bold" fontSize="sm" mb={1}>
            {new Date(date).toLocaleDateString("en-PH")}
          </Text>
        </Box>
        <Box>
          <Button
            size="sm"
            variant="outline"
            ml={4}
            alignSelf="center"
            fontSize="sm"
            color="green.400"
            title="Register user"
            onClick={onOpenRegister}
          >
            Register
          </Button>

          <Link to={`/event/${_id}`}>
            <Button
              size="sm"
              variant="outline"
              ml={4}
              alignSelf="center"
              fontSize="sm"
              color="green.400"
              title="Register user"
            >
              View
            </Button>
          </Link>

          <Button
            size="sm"
            variant="outline"
            ml={4}
            alignSelf="center"
            fontSize="sm"
            color="red.400"
            title="Delete event"
            onClick={onOpen}
            // isLoading={isPending}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            ml={4}
            alignSelf="center"
            fontSize="xl"
            color="red.400"
            title="Delete event"
            onClick={() => deleteEvent()}
          >
            &times;
          </Button>
        </Box>
      </Flex>

      <Dialog
        data={events}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        buttonTitle=""
        isButton={false}
        input={input} // Pass state down
        setInput={handleInputChange} //
        handleSubmit={handleSubmit}
      />

      <Dialog
        data={registerUser}
        isOpen={isOpenRegister}
        onOpen={onOpenRegister}
        onClose={onCloseRegister}
        buttonTitle=""
        isButton={false}
        input={register} // Pass state down
        setInput={handleInputChangeRegister} //
        handleSubmit={handleSubmitRegister}
      />
    </>
  );
};

export default EventCard;
