import { Avatar, Box, Tooltip, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";

function DisplayChat({ messages }) {
  const user = useSelector((store) => store.authReducer.user);

  console.log(messages, "messages in DisplayChat");

  const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  const isSameSenderMargin = (messages, message, index, userId) => {
    if (
      index < messages.length - 1 &&
      messages[index + 1].sender._id === message.sender._id &&
      messages[index].sender._id !== userId
    )
      return 33;
    else if (
      (index < messages.length - 1 &&
        messages[index + 1].sender._id !== message.sender._id &&
        messages[index].sender._id !== userId) ||
      (index === messages.length - 1 && messages[index].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages?.map((message, index) => (
          <Box
            display="flex"
            key={message._id}
            alignItems="center"
            mt="2"
            fontSize="sm"
          >
            {(isSameSender(messages, message, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
              <Avatar
                name={message.sender.name}
                src={message.sender.pic}
                cursor="pointer"
                mr={1}
                size="sm"
              />
            )}
            <Text
              bg={`${message.sender._id === user._id ? "#6468f6" : "#ffffff"}`}
              color={`${message.sender._id === user._id ? "#ffffff" : "black"}`}
              // borderRadius="lg"
              borderRadius="5px 20px "
              px="4"
              py="2"
              maxW="75%"
              ml={`${isSameSenderMargin(messages, message, index, user._id)}`}
            >
              {message.content}
            </Text>
          </Box>
        ))}
    </ScrollableFeed>
  );
}

export default DisplayChat;
