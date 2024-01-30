import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = () => {
    let payload = {
      email,
      password,
    };
    console.log(payload);
  };
  return (
    <Flex flexDirection={"column"} alignItems={"center"}>
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
      <Box>
        <Button w={100} colorScheme="facebook" onClick={submitHandler}>
          Login
        </Button>
      </Box>
    </Flex>
  );
}

export default Login;
