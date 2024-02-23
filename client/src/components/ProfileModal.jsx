import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Avatar,
  Text,
  // Flex,
  Box,
} from "@chakra-ui/react";

function ProfileModal({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <span>{children}</span>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m="auto" fontSize="3xl">
            Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex">
            <Avatar
              src={user?.pic}
              size={["md", "lg"]}
              name={user?.name}
              boxShadow="lg"
            />
            <Box ml="5">
              <Text fontSize={["sm", "md", "lg", "xl"]}>Name: {user.name}</Text>
              <Text fontSize={["sm", "md", "lg", "xl"]}>
                Email: {user.email}
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
