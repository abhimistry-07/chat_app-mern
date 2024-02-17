import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASEURL = process.env.REACT_APP_BASE_URL;

function Login() {
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Please fill all the fields!",
        // description: "We've created your account for you.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${BASEURL}/user/login`, {
        email,
        password,
      });

      // console.log(data,'>>>>>>>>.');

      toast({
        title: "Login Successfull!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify({ email, password }));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: error?.response?.data?.msg,
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(error, "Error login in handleLogin fun");
      setLoading(false);
    }
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        // bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder="Enter Email"
          type="email"
          variant="filled"
          mb={3}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Enter Password"
          type="password"
          variant="filled"
          mb={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          colorScheme="teal"
          mb={4}
          onClick={handleLogin}
          isLoading={loading}
        >
          Log In
        </Button>
        {/* <Button
          colorScheme="teal"
          mb={4}
          onClick={() => {
            setEmail("guest@gmail.com");
            setPassword("guest");
          }}
        >
          Guest User
        </Button> */}
        {/* <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Enable Dark Mode?
          </FormLabel>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl> */}
        <Text
          textAlign={"right"}
          mt={5}
          _hover={{
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/signup")}
        >
          Sign-up
        </Text>
      </Flex>
    </Flex>
  );
}

export default Login;
