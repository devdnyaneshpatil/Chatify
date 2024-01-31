import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

function Signup() {
  const navigate=useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password) {
      toast({
        title: "Please Fill All the fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    const payload = {
      name,
      email,
      password,
      pic,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setPicLoading(false);
      toast({
        title:response.data.msg,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      if(response.data.msg=='User Has Been Added Successfully!'){
           localStorage.setItem("userInfo",JSON.stringify(response.data.user))
           navigate('/chat')
      }
    } catch (error) {
        console.log(error.message)
      toast({
        title: "Error during signup",
        description:
          "An error occurred while processing your request. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
          toast({
            title: "profile pic updated",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };
  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
      <Box w={300} mb={5}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter Your Name "
            required
            bg={"white"}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Box w={300} mb={5}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email "
            required
            bg={"white"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Box w={300} mb={5}>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="passord"
            placeholder="Enter Your Password "
            required
            bg={"white"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
      </Box>
      <Box w={300} mb={5}>
        <FormControl>
          <FormLabel>Profile Picture</FormLabel>
          <Input
            type="file"
            placeholder="Enter Your Email "
            bg={"white"}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>
      </Box>
      <Box>
        <Button
          w={100}
          colorScheme="facebook"
          onClick={submitHandler}
          isLoading={picLoading}
        >
          Signup
        </Button>
      </Box>
    </Flex>
  );
}

export default Signup;
