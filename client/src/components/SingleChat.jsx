import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatAgainFun,
  selectedChatFun,
} from "../redux/chatReducer/action";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon, HamburgerIcon, ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import UpdateGroupModal from "./UpdateGroupModal";

function SingleChat() {
  const user = useSelector((store) => store.authReducer.user);
  const selectedChat = useSelector((store) => store.chatReducer.selectedChat);
  const allChats = useSelector((store) => store.chatReducer.allChat);
  const fetchAgain = useSelector((store) => store.chatReducer.fetchAgain);

  console.log(selectedChat, "selectedChat in singlechat page");
  // fetchChatAgainFun

  const dispatch = useDispatch();

  const getSenderName = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };

  const getSenderDetails = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1] : users[0];
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            w="100%"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={() => dispatch(selectedChatFun(""))}
            >
              <ArrowBackIcon />
            </IconButton>

            <Text
              fontSize={{ base: "28px", md: "30px" }}
              //   pb={3}
              //   px={2}
              //   justifyContent={{ base: "space-between" }}
              //   alignItems="center"
            >
              {selectedChat && selectedChat.isGroupChat ? (
                <>{selectedChat.chatName}</>
              ) : (
                <>{getSenderName(user, selectedChat.users)}</>
              )}
            </Text>

            <ProfileModal user={getSenderDetails(user, selectedChat.users)}>
              <IconButton display={selectedChat.isGroupChat ? "none" : "flex"}>
                <ViewIcon />
              </IconButton>
            </ProfileModal>

            <UpdateGroupModal>
              <IconButton display={selectedChat.isGroupChat ? "flex" : "none"}>
                <ViewIcon />
              </IconButton>
            </UpdateGroupModal>
          </Box>
          <Box
            // border="1px solid blue"
            w="100%"
            h="100%"
            borderRadius="lg"
            mt="1"
            display="flex"
            flexDir="column"
            p="3"
            overflow="hidden"
            bg="#E2E2F6"
          ></Box>
        </>
      ) : (
        <Box
          display="flex"
          m="auto"
          alignItems="center"
          justifyContent="center"
          h="100%"
          w="100%"
        >
          <Text as="b" fontSize="6xl" fontFamily="cursive">
            Tolki
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
