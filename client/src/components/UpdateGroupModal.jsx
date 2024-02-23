import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatAgainFun,
  selectedChatFun,
} from "../redux/chatReducer/action";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import SelectedUsers from "./SelectedUsers";
import axios from "axios";
import UserList from "./UserList";

const BASEURL = process.env.REACT_APP_BASE_URL;

function UpdateGroupModal({ children, fetchMessages }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();

  const dispatch = useDispatch();
  const fetchAgain = useSelector((store) => store.chatReducer.fetchAgain);
  const user = useSelector((store) => store.authReducer.user);
  const selectedChat = useSelector((store) => store.chatReducer.selectedChat);
  // const allChats = useSelector((store) => store.chatReducer.allChat);

  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }

    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `${BASEURL}/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      dispatch(selectedChatFun(data));
      dispatch(fetchChatAgainFun(!fetchAgain));
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error rename group!",
        description: error?.response?.data,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }

    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResult([]);
      return;
    }

    setSearch(query);

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${BASEURL}/user/allUsers?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error searching users!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleAddUser = async (newuser) => {
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admin can add new member!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.users.find((user) => user._id === newuser._id)) {
      toast({
        title: "User already exists!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `${BASEURL}/chat/addtogrp`,
        {
          chatId: selectedChat._id,
          userId: newuser._id,
        },
        config
      );

      dispatch(selectedChatFun(data));
      dispatch(fetchChatAgainFun(!fetchAgain));
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error adding user!",
        description: error.response?.data?.msg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleDelete = async (deleteUser) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      deleteUser._id !== user._id
    ) {
      toast({
        title: "Only admin can remove member!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `${BASEURL}/chat/removefrgrp`,
        {
          chatId: selectedChat._id,
          userId: deleteUser._id,
        },
        config
      );

      deleteUser._id === user._id
        ? dispatch(selectedChatFun(null))
        : dispatch(selectedChatFun(data));

      dispatch(fetchChatAgainFun(!fetchAgain));
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error removing user!",
        description: error.response?.data?.msg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

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
          <ModalHeader display="flex" justifyContent="center" fontSize="3xl">
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" display="flex" flexWrap="wrap" gap="2">
              {selectedChat?.users.map((user) => (
                <SelectedUsers
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>
            <FormControl display="flex" gap="2" mt="4">
              <Input
                m="auto"
                placeholder="Group Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                m="auto"
                bg="teal"
                color="#FFFFFF"
                // 6468F6
                _hover={{
                  bg: "#6468F6",
                }}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                mt="4"
                placeholder="Add User"
                onChange={(e) => handleSearch(e.target.value)}
                mb="4"
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              <>
                {searchResult?.map((user) => (
                  <UserList
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              bg="rgb(239, 83, 80)"
              color="#FFFFFF"
              // 6468F6
              fontWeight="bolder"
              mt="4"
              _hover={{
                bg: "rgb(183, 28, 28)",
              }}
              onClick={() => handleDelete(user)}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateGroupModal;
