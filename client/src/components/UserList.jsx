import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

function UserList({ user, handleFunction }) {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      w="100%"
      display="flex"
      alignItems="center"
      px="3"
      py="2"
      mb="2"
      borderRadius="lg"
      bg="#E8E8E8"
      _hover={{
        backgroundColor: "#bbbdd9",
      }}
    >
      <Avatar mr="2" size="sm" name={user.name} src={user.pic} />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="sm">
          <b>Email:</b> {user.email}
        </Text>
      </Box>
    </Box>
  );
}

export default UserList;
