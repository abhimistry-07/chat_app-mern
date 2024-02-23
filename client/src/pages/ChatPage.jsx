import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import SearchSection from "../components/SearchSection";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

function ChatPage() {
  const user = useSelector((store) => store.authReducer.user);

  // console.log(user, "ChatPage");

  return (
    <Box w="100%">
      {user && <SearchSection />}
      <Flex justifyContent="space-between" h="92.3vh" p="10px" gap="2">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Flex>
    </Box>
  );
}

export default ChatPage;
