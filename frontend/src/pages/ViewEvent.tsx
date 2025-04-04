import {
  Container,
  Flex,
  Heading,
  ListItem,
  Spinner,
  UnorderedList,
} from "@chakra-ui/react";
import { useGetEvent } from "../hooks/useEvent";
import { useParams } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

const ViewEvent = () => {
  const { eventId } = useParams();

  const { event, isPending, isSuccess } = useGetEvent(String(eventId));

  const { registration } = useRegister(String(eventId));

  return (
    <Container mt={16}>
      <Heading as="h1">{event?.title}</Heading>
      {isPending && <Spinner />}
      <br />
      {isSuccess && (
        <Flex flexDirection="column" gap={10}>
          <Container>
            <p>
              Date: {new Date(event?.date || "").toLocaleDateString("en-PH")}
            </p>
            <p>Organizer: {event?.organizer}</p>
          </Container>
          <Container>
            <Heading as="h2">List of Attendees</Heading>
            <br />
            {registration.length > 0 ? (
              registration.map((i) => (
                <UnorderedList key={i._id}>
                  <ListItem>
                    <Container>
                      <p>Name: {i.name}</p>
                      <p>Email: {i.email}</p>
                    </Container>
                  </ListItem>
                  <br />
                </UnorderedList>
              ))
            ) : (
              <p>No attendees</p>
            )}
          </Container>
        </Flex>
      )}
    </Container>
  );
};

export default ViewEvent;
