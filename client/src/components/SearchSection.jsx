import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authReducer/action";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

function SearchSection() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.authReducer.user);

  // console.log(user, "In search section");

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");

    dispatch(logout());

    navigate("/");
  };

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
        <Button>
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
    </>
  );
}

export default SearchSection;
