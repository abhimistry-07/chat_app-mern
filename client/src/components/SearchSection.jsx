import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authReducer/action";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserList from "./UserList";
import {
  getAllChat,
  selectedChatFun,
  setNotification,
} from "../redux/chatReducer/action";
import NotificationBadge, { Effect } from "react-notification-badge";

const BASEURL = process.env.REACT_APP_BASE_URL;

function SearchSection() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  // const [selectedChat, setSelectedChat] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.authReducer.user);
  const selectedChat = useSelector((store) => store.chatReducer.selectedChat);
  const allChats = useSelector((store) => store.chatReducer.allChat);
  const notification = useSelector((store) => store.chatReducer.notification);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // console.log(selectedChat, "In search section selectedChat");

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");

    dispatch(logout());

    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
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

      const { data } = await axios.get(
        `${BASEURL}/user/allUsers?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error searching users!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`${BASEURL}/chat`, { userId }, config);

      if (!allChats.find((chat) => chat._id === data._id)) {
        dispatch(getAllChat([data, ...allChats]));
      }

      setLoadingChat(false);
      dispatch(selectedChatFun(data));
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error fetching chat!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };

  // console.log(searchResult, ">>>.");

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="5px 10px"
        // border="1px solid black"
        bg="#E1E2F6"
      >
        {/* <Tooltip hasArrow label="Search places" bg="gray.300" color="black"> */}
        <Button onClick={onOpen}>
          <SearchIcon />
          <Text display={["none", "flex"]} px="4">
            Search User
          </Text>
        </Button>
        {/* Hover Me */}
        {/* </Tooltip> */}
        <Text fontSize="2xl" as="b" fontFamily="cursive">
          Tolki
        </Text>
        <Box>
          <Menu>
            <MenuButton bg="transparent">
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon boxSize={5} />
            </MenuButton>
            <MenuList p="2">
              {!notification.length && "No new Messages"}

              {notification &&
                notification.map((not) => (
                  <MenuItem
                    key={not._id}
                    onClick={() => {
                      dispatch(selectedChatFun(not.chat));
                      dispatch(
                        setNotification(notification.filter((n) => n !== not))
                      );
                    }}
                  >
                    {not.chat.isGroupChat
                      ? `New message from ${not.chat.chatName}`
                      : `New message from ${getSender(user, not.chat.users)}`}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              bg="transparent"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                name={user.name}
                src={user.pic}
                size="sm"
                cursor="pointer"
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      {/* Drawer sectio */}
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Flex gap="2" mb="4">
              <Input
                variant="flushed"
                placeholder="Search here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Flex>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserList
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" />}
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SearchSection;
