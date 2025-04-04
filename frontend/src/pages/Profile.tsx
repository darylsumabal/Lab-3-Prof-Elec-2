import { Alert, AlertIcon, Center, Heading, Text } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <Center my={16} flexDir="column">
      <Heading mb={4}>My Account</Heading>
      {!user?.verified && (
        <Alert status="warning" w="fit-content" borderRadius={12} mb={3}>
          <AlertIcon />
          Please verify your email
        </Alert>
      )}
      <Text color="white" mb={2}>
        Email:{" "}
        <Text as="span" color="gray.300">
          {user?.email}
        </Text>
      </Text>
      <Text color="white">
        Created On:{" "}
        <Text as="span" color="gray.300">
          {new Date(user?.createdAt || "").toLocaleDateString("en-US")}
        </Text>
      </Text>
    </Center>
  );
};

export default Profile;
