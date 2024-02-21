import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChat, selectedChatFun } from "../redux/chatReducer/action";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import CreateGroupModal from "./CreateGroupModal";

const BASEURL = process.env.REACT_APP_BASE_URL;

function MyChats() {
  const [loggedUser, setLoggedUser] = useState();

  const user = useSelector((store) => store.authReducer.user);
  const selectedChat = useSelector((store) => store.chatReducer.selectedChat);
  const allChats = useSelector((store) => store.chatReducer.allChat);

  const dispatch = useDispatch();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${BASEURL}/chat`, config);

      console.log(data, "Allchats");
      dispatch(getAllChat(data));
    } catch (error) {
      toast({
        title: "Error fetching chat!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };

  const handleSelectChat = (chat) => {};

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  console.log(selectedChat);

  return (
    <Box
      border="1px solid red"
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p="3"
      w={["100%", "30%"]}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Flex w="100%" justifyContent="space-between" alignItems="center" mb="5">
        <Text as="b">My Chats</Text>
        <CreateGroupModal>
          <Button size="sm">
            New Group Chat
            <AddIcon boxSize={3} ml="2" />
          </Button>
        </CreateGroupModal>
      </Flex>

      <Flex
        flexDir="column"
        // border="1px solid green"
        // p="3"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {allChats ? (
          <Box overflowY="scroll">
            {allChats.map((chat) => (
              <Box
                onClick={() => dispatch(selectedChatFun(chat))}
                cursor="pointer"
                bg={selectedChat === chat ? "#6468F6" : "#E1E2F6"}
                color={selectedChat === chat ? "white" : "black"}
                px="3"
                py="2"
                borderRadius="lg"
                key={chat?._id}
                mt="2"
              >
                <Text>
                  {chat.isGroupChat
                    ? chat.chatName
                    : getSender(loggedUser, chat.users)}
                </Text>
              </Box>
            ))}
          </Box>
        ) : (
          <ChatLoading />
        )}
      </Flex>
    </Box>
  );
}

export default MyChats;
