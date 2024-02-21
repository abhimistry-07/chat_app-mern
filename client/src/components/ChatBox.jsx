import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import SingleChat from "./SingleChat";

function ChatBox() {
  const selectedChat = useSelector((store) => store.chatReducer.selectedChat);

  console.log(selectedChat, "selectedChat in ChatBox");

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      h="100%"
      w={{ base: "100%", md: "80%" }}
      // alignItems="center"
      // justifyContent="center"
      flexDir="column"
      borderRadius="lg"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      p="2"
      // bg="white"
    >
      <SingleChat />
    </Box>
  );
}

export default ChatBox;
