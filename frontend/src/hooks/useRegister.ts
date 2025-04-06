import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "../config/queryClient";
import { createRegisterUser, getRegister } from "../lib/api";
import { useToast } from "@chakra-ui/react";

export interface RegisterData {
  _id: string;
  name: string;
  email: string;
}

export type Registers = RegisterData[];

const REGISTER = "register";

export const useRegister = (id: string) => {
  const { data: registration = [], ...rest } = useQuery<Registers>({
    queryKey: [REGISTER],
    queryFn: () => getRegister(id),
  });

  return {
    registration,
    ...rest,
  };
};

export const useCreateRegister = () => {
  const toast = useToast();

  const { mutate, ...rest } = useMutation({
    mutationFn: (payload: { id: string; data: RegisterData }) =>
      createRegisterUser(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REGISTER] });
      toast({
        title: "User registered successfully",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "User registered unsuccessfully",
        description: "User already registered",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return {
    mutateRegister: mutate,
    ...rest,
  };
};
