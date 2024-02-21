import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

function SelectedUsers({ user, handleFunction }) {
  return (
    <Box
      key={user._id}
      onClick={handleFunction}
      cursor="pointer"
      w="100%"
      display="flex"
      alignItems="center"
      px="3"
      py="2"
      mb="2"
      borderRadius="lg"
      color="white"
      bg="#6468F6"
      maxW="fit-content"
    >
      {user.name} <CloseIcon pl="2" />
    </Box>
  );
}

export default SelectedUsers;
