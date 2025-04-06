import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Label } from "../../constant/event";

interface DialogProps<T extends Label> {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => React.Dispatch<React.SetStateAction<boolean>> | void;
  buttonTitle: string;
  input: { [key: string]: string }; // Dynamic state object
  setInput: (event: React.ChangeEvent<HTMLInputElement>) => void; //
  handleSubmit: () => void;
  data: T[];
  isButton?: boolean;
  headerTitle: string;
  test?: boolean;
}

const Dialog = <T extends Label>({
  isOpen,
  onOpen,
  onClose,
  buttonTitle,
  input,
  setInput,
  handleSubmit,
  data,
  isButton = true,
  headerTitle,
  test,
}: DialogProps<T>) => {
  return (
    <>
      {isButton && <Button onClick={onOpen}>{buttonTitle}</Button>}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{headerTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {data?.map((event, index) => (
              <FormControl mt={4} key={index}>
                <FormLabel>{event.label}</FormLabel>
                <Input
                  name={event.value}
                  type={event.type} // Ensure each input has a unique name
                  value={input[event.value] || ""} // Get value from the state
                  onChange={setInput} // Use setInput from parent
                  placeholder={event.label}
                />
              </FormControl>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={test}
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Dialog;
