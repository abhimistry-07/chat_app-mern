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
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASEURL = process.env.REACT_APP_BASE_URL;

// console.log(BASEURL, ">>..");

function SignUp() {
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // POST https://api.cloudinary.com/v1_1/dk2sqquxl/image/upload

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dk2sqquxl");

      axios
        .post("https://api.cloudinary.com/v1_1/dk2sqquxl/image/upload", data)
        .then((response) => {
          // console.log(response);
          setPic(response.data.url.toString());
          setLoading(false);
        })
        .catch((error) => {
          console.error(error, "In postDetails Signup");
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleFormSubmit = async () => {
    setLoading(true);

    if (!name || !email || !password) {
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
      await axios.post(`${BASEURL}/user/register`, {
        name,
        email,
        password,
        pic,
      });

      // console.log(data,'>>>>>>>>.');

      toast({
        title: "Registeration Successfull!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify({ name, email, password, pic })
      );
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        // title: "Error Occured!",
        title: error?.response?.data?.msg,
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(error, "Error signup in handleSubmit");
      setLoading(false);
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        // bg={formBackground}
        p={10}
        w={["100%", "60%", "50%", "30%"]}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Sign Up</Heading>
        <VStack>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              variant="filled"
              mb={3}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              variant="filled"
              mb={3}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              variant="filled"
              mb={3}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Select profile picture</FormLabel>
            <Input
              type="file"
              placeholder="Select profile picture"
              variant="filled"
              mb={4}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
              // p="1.5"
            />
          </FormControl>
          <Button
            colorScheme="teal"
            mb={0}
            w={"100%"}
            onClick={handleFormSubmit}
            isLoading={loading}
          >
            Sign Up
          </Button>
        </VStack>
        {/* <FormControl isRequired> */}
        {/* </FormControl> */}

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
          onClick={() => navigate("/")}
        >
          Login
        </Text>
      </Flex>
    </Flex>
  );
}

export default SignUp;
