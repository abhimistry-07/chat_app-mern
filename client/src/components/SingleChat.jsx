import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedChatFun,
} from "../redux/chatReducer/action";
import {
  Box,
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon,  ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import UpdateGroupModal from "./UpdateGroupModal";
import { useState } from "react";
import { DotLoader } from "react-spinners";
import axios from "axios";
import styled from "styled-components";
import DisplayChat from "./DisplayChat";

const BASEURL = process.env.REACT_APP_BASE_URL;

function SingleChat() {
  const user = useSelector((store) => store.authReducer.user);
  const selectedChat = useSelector((store) => store.chatReducer.selectedChat);
  const allChats = useSelector((store) => store.chatReducer.allChat);
  const fetchAgain = useSelector((store) => store.chatReducer.fetchAgain);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  // console.log(selectedChat, "selectedChat in singlechat page");
  // fetchChatAgainFun

  const dispatch = useDispatch();
  const toast = useToast();

  const getSenderName = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };

  const getSenderDetails = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1] : users[0];
  };

  const sendMessage = async (e) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setNewMessage("");

      const { data } = await axios.post(
        `${BASEURL}/message`,
        { content: newMessage, chatId: selectedChat._id },
        config
      );

      console.log(data, ">>>>>>..");
      setMessages([...messages, data]);
    } catch (error) {
      toast({
        title: "Error sending message!",
        description: error.response?.data,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMessage) {
      sendMessage();
    }
  };

  const handleMsgInput = (e) => {
    setNewMessage(e.target.value);
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${BASEURL}/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching message!",
        description: error?.response?.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  // console.log(messages, "messages in singlechat");

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

            <>
              {selectedChat.isGroupChat ? (
                <UpdateGroupModal fetchMessages={fetchMessages}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                </UpdateGroupModal>
              ) : (
                <ProfileModal user={getSenderDetails(user, selectedChat.users)}>
                  <IconButton>
                    <ViewIcon />
                  </IconButton>
                </ProfileModal>
              )}
            </>
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
            overflowY="hidden"
            bg="#E2E2F6"
            justifyContent="flex-end"
          >
            {loading ? (
              <Box
                w="100%"
                h="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <DotLoader size="180px" color="#6468f6" />
              </Box>
            ) : (
              <Box
                display="flex"
                flexDir="column"
                overflowY="scroll"
                style={{ scrollbarWidth: "none" }}
              >
                <DisplayChat messages={messages} />
              </Box>
            )}
            <FormControl
              onKeyDown={handleKeyPress}
              display="flex"
              gap="2"
              mt="2"
            >
              <Input
                w="100%"
                bg="white"
                border="1ps solid gray"
                onChange={handleMsgInput}
                value={newMessage}
              />
              <Button onClick={sendMessage}>Send</Button>
            </FormControl>
          </Box>
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

const MESSAGES = styled.div``;
