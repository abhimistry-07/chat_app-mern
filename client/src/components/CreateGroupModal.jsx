import {
  Modal,
  ModalCloseButton,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  Box,
  Text,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useToast,
  FormControl,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChat } from "../redux/chatReducer/action";
import axios from "axios";
import UserList from "./UserList";
import { CloseIcon } from "@chakra-ui/icons";
import SelectedUsers from "./SelectedUsers";

const BASEURL = process.env.REACT_APP_BASE_URL;

function CreateGroupModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const user = useSelector((store) => store.authReducer.user);
  //   const selectedChat = useSelector((store) => store.chatReducer.selectedChat);
  const allChats = useSelector((store) => store.chatReducer.allChat);
  const dispatch = useDispatch();

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

  const handleDelete = (deleteUser) => {
    setSelectedUsers(
      selectedUsers?.filter((user) => user._id !== deleteUser._id)
    );
  };

  const handleGroup = (newuser) => {
    if (selectedUsers.some((user) => user._id === newuser._id)) {
      toast({
        title: "User already exists!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, newuser]);
  };

  const handleSubmit = async () => {
    if (!groupChatName) {
      toast({
        title: "Please enter group name!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedUsers.length < 2) {
      toast({
        title: `Please add ${2 - selectedUsers.length} group members!`,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASEURL}/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },
        config
      );

      dispatch(getAllChat([data, ...allChats]));
      onClose();
      toast({
        title: "New group created!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error creating group!",
        description: error?.response?.data,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };

  console.log(selectedUsers, groupChatName, ">>>>>>..");

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m="auto" fontSize="3xl">
            Create Group
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" gap="5">
            <FormControl>
              <Input
                placeholder="Group Name"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap" gap="2">
              {selectedUsers?.map((user) => (
                <SelectedUsers
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>

            {loading ? (
              <Text>Loading</Text>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserList
                    user={user}
                    key={user._id}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="white"
              backgroundColor="#6468F6"
              mr={3}
              onClick={handleSubmit}
              _hover={{
                background: "white",
                color: "#6468F6",
              }}
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateGroupModal;
