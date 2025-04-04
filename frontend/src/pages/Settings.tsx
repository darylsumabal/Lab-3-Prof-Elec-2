import { Container, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import useSession from "../hooks/useSession";
import SessionCard from "../components/SessionCard";

const Settings = () => {
  const { sessions, isSuccess, isPending, isError } = useSession();

  return (
    <Container mt={16}>
      <Heading mb={6}>My Sessions</Heading>
      {isPending && <Spinner />}
      {isError && <Text>Failed to get sessions.</Text>}
      {isSuccess && (
        <VStack spacing={3} align="flex-start">
          {sessions.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Settings;
