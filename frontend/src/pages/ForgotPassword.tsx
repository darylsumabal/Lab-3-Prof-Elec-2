import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../lib/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const {
    mutate: sendPasswordReset,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
        <Heading fontSize="4xl" mb={8}>
          Reset your password
        </Heading>
        <Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
          {isError && (
            <Box mb={3} color="red.400">
              {error?.message}
            </Box>
          )}
          <Stack spacing={4}>
            {isSuccess ? (
              <Alert status="success" borderRadius={12}>
                <AlertIcon />
                Email sent! Check your inbox for further instruction
              </Alert>
            ) : (
              <>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Button
                  my={2}
                  isLoading={isPending}
                  isDisabled={!email}
                  onClick={() => sendPasswordReset({ email })}
                >
                  Reset password
                </Button>
              </>
            )}

            <Text align="center" fontSize="sm" color="text.muted">
              Already have an account? {""}
              <ChakraLink as={Link} to="/login" replace>
                Sign In
              </ChakraLink>
              &nbsp;or&nbsp;
              <ChakraLink as={Link} to="/register" replace>
                Sign up
              </ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default ForgotPassword;
