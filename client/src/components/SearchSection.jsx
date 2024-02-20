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

const BASEURL = process.env.REACT_APP_BASE_URL;

function SearchSection() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.authReducer.user);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // console.log(user, "In search section");

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
        title: "Error",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const accessChat = () => {};

  console.log(searchResult, ">>>.");

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
              <BellIcon boxSize={5} />
            </MenuButton>
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
            <Flex gap="2" mb='4'>
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
